export const config = { runtime: 'edge' };

/* ── In-memory rate limit store (per IP, 5 req/60s) ── */
const rateLimitMap = new Map();
const RATE_LIMIT   = 5;
const WINDOW_MS    = 60_000;

function isRateLimited(ip) {
  const now    = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) return true;

  record.count++;
  return false;
}

/* ── Sanitize: strip control chars, limit length ── */
function sanitize(value, maxLen = 500) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // strip control chars
    .replace(/[<>]/g, c => (c === '<' ? '&lt;' : '&gt;')) // escape HTML brackets
    .slice(0, maxLen)
    .trim();
}

/* ── Allowed origin ── */
const ALLOWED_ORIGIN = 'https://zvision-landing.vercel.app';

function corsHeaders(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';

  /* ── CORS preflight ── */
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  /* ── Rate limiting ── */
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60',
        ...corsHeaders(origin),
      },
    });
  }

  /* ── Parse body ── */
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  /* ── Honeypot check (bot trap) ── */
  if (body.website) {
    // Silently accept — do NOT forward to Telegram
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  /* ── Sanitize all fields ── */
  const nome     = sanitize(body.nome, 100);
  const email    = sanitize(body.email, 254);
  const empresa  = sanitize(body.empresa, 200);
  const mensagem = sanitize(body.mensagem, 1000);

  /* ── Basic validation ── */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!nome || !email || !emailRe.test(email)) {
    return new Response(JSON.stringify({ error: 'Campos obrigatorios faltando' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  /* ── Env vars — never expose names or values in errors ── */
  const TOKEN   = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  /* ── Build message ── */
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const text = [
    'NOVO LEAD - ZVISION LANDING',
    '',
    `Nome: ${nome}`,
    `Email: ${email}`,
    `Empresa: ${empresa || 'Nao informado'}`,
    `Mensagem: ${mensagem || 'Nao informado'}`,
    '',
    `Data: ${now}`,
    `Origem: zvision-landing.vercel.app`,
  ].join('\n');

  /* ── Send to Telegram ── */
  let telegramRes;
  try {
    telegramRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  if (!telegramRes.ok) {
    // Do NOT forward Telegram error detail to client
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}
