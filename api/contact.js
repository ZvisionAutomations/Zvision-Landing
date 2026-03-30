export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { nome, email, empresa, mensagem } = body;

  if (!nome || !email) {
    return new Response(JSON.stringify({ error: 'Campos obrigatórios faltando' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const TOKEN   = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const text =
    `🎯 NOVO LEAD — ZVISION LANDING\n\n` +
    `👤 Nome: ${nome}\n` +
    `📧 Email: ${email}\n` +
    `🏢 Empresa: ${empresa || 'Não informado'}\n` +
    `💬 Mensagem: ${mensagem || 'Não informado'}\n\n` +
    `⏰ ${now}\n` +
    `🔗 Origem: zvision-landing.vercel.app`;

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    }
  );

  if (!telegramRes.ok) {
    return new Response(JSON.stringify({ error: 'Falha ao enviar para Telegram' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
