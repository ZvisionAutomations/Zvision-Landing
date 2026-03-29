# PROMPT — CLAUDE CODE // ZVISION LANDING PAGE

---

## SQUADS ATIVOS

Antes de escrever qualquer linha de código, ative os três squads abaixo e siga suas diretrizes durante toda a execução:

```
squads/brand-squad/
squads/design-squad/
squads/copy-squad/
```

**Leia de cada squad:**
- `squad.yaml` — agentes disponíveis e especialidades
- `workflows/` — use o workflow de landing page / high-conversion page
- `checklists/` — aplique os checklists de copy, design e brand antes de entregar

**Modo de operação:** Os três squads colaboram em paralelo.
- **Brand Squad** → garante que identidade, tom de voz e posicionamento estão corretos em cada seção
- **Design Squad** → garante hierarquia visual, tipografia, espaçamento e componentes impecáveis
- **Copy Squad** → garante que cada headline, subheadline e CTA está otimizado para conversão

---

## FONTES DE VERDADE — LEIA TODOS ANTES DE COMEÇAR

Leia na ordem abaixo. Não invente nada que não esteja documentado aqui:

```
1. CLAUDE.md                   → regras do workspace, estrutura de output, convenções do HTML
2. brand.md                    → identidade visual completa (cores, tipografia, tom de voz, logo)
3. negocio.md                  → posicionamento, cliente ideal, problema resolvido
4. oferta.md                   → serviços, entregáveis, preço, diferenciais, objeções
5. zvision_crm_identity.md     → design system completo do produto (tokens, componentes, animações)
6. zvision_brandbook.html      → brandbook gerado — referência visual final de como a marca se parece
```

> ⚠️ O brandbook HTML é a referência visual máxima. Se houver qualquer dúvida sobre cor, tipografia ou componente, o brandbook é a verdade.

---

## PLUGINS ATIVOS

Ative e utilize durante toda a execução:

- **frontend-design** → qualidade visual e UI de alto nível
- **context7** → manter contexto de todos os 6 arquivos simultaneamente
- **code-simplifier** → HTML limpo, sem inchaço, sem código morto
- **ralph-loop** → ao final, rodar loop de revisão checando brand + copy + design antes de salvar

---

## MCPs ATIVOS

Use os seguintes MCPs para geração de componentes:

- **magic** → componentes UI customizados de alta qualidade
- **magicui** → componentes animados — usar no hero, CTAs e seções de destaque
- **shadcn** → base de componentes consistente (buttons, cards, inputs, badges)
- **v0** → geração de seções complexas quando necessário

---

## ENTREGÁVEL

**Arquivo:** `salidas/index.html`

Landing page de alta conversão, arquivo único com CSS e JS inline, dark mode absoluto, fiel à identidade Zvision Automation. Pronta para produção — sem dependências externas além do Google Fonts.

---

## IDENTIDADE VISUAL — REGRAS ABSOLUTAS

Estas regras vêm do brandbook e do `zvision_crm_identity.md` e são inegociáveis:

```css
/* Obrigatório no :root */
--surface-page:     #050506;
--surface-card:     #0d0d10;
--surface-elevated: #141418;
--surface-hover:    #1c1c22;
--text-primary:     #e8e8e8;
--text-secondary:   #9ca3af;
--text-muted:       #4b5563;
--accent-primary:   #A2E635;
--accent-hover:     #b8f040;
--accent-subtle:    rgba(162,230,53,0.08);
--accent-subtle2:   rgba(162,230,53,0.15);
--status-success:   #22c55e;
--status-error:     #ef4444;
--status-warning:   #f59e0b;
--border-default:   rgba(162,230,53,0.15);
--border-bright:    rgba(162,230,53,0.5);
--radius-card:      4px;
--radius-button:    3px;
--shadow-neon:      0 0 12px rgba(162,230,53,0.25);
--shadow-neon-sm:   0 0 6px rgba(162,230,53,0.3);
```

**Tipografia:**
- `Space Grotesk` — headlines, títulos, botões (700 bold, 500 medium)
- `JetBrains Mono` — labels, badges, valores, detalhes técnicos, timestamps
- **Nunca:** Inter, Roboto ou qualquer outra fonte

**Fundo de tela:** Grade tática obrigatória em todas as seções:
```css
background-image:
  linear-gradient(rgba(162,230,53,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(162,230,53,0.03) 1px, transparent 1px);
background-size: 40px 40px;
```

**UMA cor accent** (`#A2E635`) para tudo — botões, links, destaques, ícones ativos. Nenhuma outra cor vibrante além das de status.

---

## ESTRUTURA DA LANDING PAGE

### [SEÇÃO 1] HERO
**Objetivo:** Capturar atenção em 3 segundos e comunicar o que a Zvision faz.

- **Topbar fixa (52px):** Logo Zvision à esquerda (símbolo + "Zvision Automation" em mono) + CTA "SOLICITAR DIAGNÓSTICO" à direita em botão primário accent
- **Headline principal:** `Space Grotesk 700`, grande (56–72px desktop, 36px mobile), cor `text-primary`. Extrair do posicionamento do `negocio.md`. Exemplo de direção: algo que comunique transformação de processos, não tecnologia genérica.
- **Subheadline:** `Space Grotesk 500`, 18–22px, cor `text-secondary`. 1–2 linhas máximo.
- **CTA primário:** Botão accent `#A2E635`, texto `JetBrains Mono 700` uppercase, hover com `shadow-neon`. href="#contato"
- **CTA secundário:** Outline button, "VER COMO FUNCIONA", ancora para seção de processo
- **Background:** Grade tática + gradiente radial muito sutil de accent no topo (`rgba(162,230,53,0.04)`) — apenas atmosfera, não elemento visual
- **Badge de credibilidade:** Pill pequeno acima da headline: `// AUTOMAÇÃO DE PROCESSOS COM IA` em JetBrains Mono + dot accent pulsante

### [SEÇÃO 2] PROBLEMA
**Objetivo:** Fazer o cliente se reconhecer na dor antes de apresentar a solução.

- Headline: "Se você ainda faz isso manualmente, você está perdendo dinheiro" (adaptar com dados do `negocio.md`)
- 3–4 cards de problema em grid — cada um com ícone, título e descrição curta
- Conteúdo dos cards: extrair as dores do `negocio.md` (processos manuais, retrabalho, escala travada, custo alto de operação)
- Visual: cards `surface-card` com borda `border-default`, texto muted, ícones monocromáticos em `text-muted`
- Subtexto de transição para próxima seção: algo que posicione a Zvision como a virada

### [SEÇÃO 3] SOLUÇÃO — O QUE É A ZVISION
**Objetivo:** Apresentar a Zvision como o sistema, não como uma agência genérica.

- Headline de posicionamento (extrair do `negocio.md`)
- 2 colunas: esquerda texto, direita visual de destaque
- Visual direito: card estilo "terminal" ou "painel de missão" mostrando um processo automatizado — use a estética do `zvision_crm_identity.md` (JetBrains Mono, labels táticos, badges de status)
- Listar os 4 tipos de automação que a Zvision entrega (do `oferta.md`): atendimento, vendas/CRM, integração de APIs, dashboards
- Cada item: ícone + label mono uppercase + descrição curta

### [SEÇÃO 4] COMO FUNCIONA
**Objetivo:** Mostrar o processo de trabalho e reduzir fricção de "como é na prática".

- Headline: `// PROCESSO DE IMPLEMENTAÇÃO`
- 3 passos em linha horizontal (desktop) / vertical (mobile):
  1. `DIAGNÓSTICO` — mapeamos seus processos e identificamos o que automatizar
  2. `IMPLEMENTAÇÃO` — construímos e integramos as automações no seu fluxo
  3. `OPERAÇÃO CONTÍNUA` — gerenciamos, monitoramos e evoluímos o sistema
- Visual: números grandes em accent mono + linha conectando os passos + badges de status
- Abaixo: nota de rodapé em mono muted — "Combo: implementação + suporte mensal contínuo. Você não precisa de equipe técnica interna."

### [SEÇÃO 5] ENTREGÁVEIS / O QUE INCLUI
**Objetivo:** Tangibilizar o que o cliente recebe — destruir a objeção "mas o que exatamente eu vou ter?"

- Headline: `// O QUE VOCÊ RECEBE`
- Grid de 6 cards (dos entregáveis do `oferta.md`):
  1. Diagnóstico e mapeamento de processos
  2. Automação de atendimento (chatbots e IA conversacional)
  3. Automação de funil de vendas e CRM
  4. Integração entre sistemas e APIs
  5. Dashboards e relatórios automatizados
  6. Suporte mensal contínuo e gestão ativa
- Cada card: ícone + título `Space Grotesk 600` + descrição curta em mono muted
- Cards com hover: `border-color` sobe para `rgba(162,230,53,0.35)`, `translateY(-1px)`
- Marcas de canto decorativas em accent 30% nos cards de destaque

### [SEÇÃO 6] DIFERENCIAIS
**Objetivo:** Separar a Zvision de qualquer outra agência de automação.

- Headline: `// POR QUE A ZVISION`
- 4 diferenciais do `oferta.md` em layout 2x2
- Cada diferencial: label mono uppercase accent + texto descritivo
- Diferencial principal em destaque maior: "Entendemos de negócio, não só de tecnologia"
- Visual: barra de intensidade de 2px accent abaixo de cada item (estilo ROI-Meter do brandbook)

### [SEÇÃO 7] OBJEÇÕES (TRATAMENTO IMPLÍCITO)
**Objetivo:** Destruir as 3 objeções antes que o cliente as verbalize.

- Seção discreta, sem parecer "FAQ genérico"
- Headline: `// DÚVIDAS FREQUENTES` em mono muted
- 3 blocos accordion ou expandíveis — extrair as objeções do `oferta.md`:
  1. "Meu processo é muito específico para ser automatizado"
  2. "Já tentei ferramentas de automação e não funcionou"
  3. "Minha equipe não vai conseguir usar"
- Resposta de cada objeção: direta, confiante, sem rodeios — tom do `brand.md`

### [SEÇÃO 8] PREÇO / INVESTIMENTO
**Objetivo:** Apresentar o preço sem pedir desculpa por ele.

- Headline: `// INVESTIMENTO`
- Card de pricing centralizado, fundo `surface-card`, borda `border-bright`
- Range de valor: R$500 – R$2.000/mês em destaque (`JetBrains Mono 700`, 36px, accent)
- Label acima: `RETAINER MENSAL` em mono muted uppercase
- Abaixo do preço: "+ Setup inicial sob consulta"
- Listar o que está incluso (bullets em mono, prefixo `» `)
- Badge: `// COMBO: IMPLEMENTAÇÃO + GESTÃO CONTÍNUA`
- CTA: "SOLICITAR DIAGNÓSTICO GRATUITO" — botão accent full-width, shadow-neon

### [SEÇÃO 9] CTA FINAL / CONTATO
**Objetivo:** Última chance de conversão — tornar o próximo passo óbvio e sem fricção.

- id="contato" (âncora dos CTAs anteriores)
- Headline: algo que comunique urgência sem ser genérico — extrair do posicionamento `negocio.md`
- Subheadline: "Diagnóstico gratuito. Sem compromisso. Resultado em 48h."
- Formulário simples: Nome + Email + Empresa + Mensagem (opcional)
- Inputs: estilo do `zvision_crm_identity.md` — fundo `surface-page`, borda `border-default`, focus ring accent
- Botão submit: `INICIAR MISSÃO` — accent, mono bold, shadow-neon no hover
- Ao lado do formulário (desktop): card com bullet points de "O que acontece depois"
  - `[01]` Você preenche o formulário
  - `[02]` Nossa equipe analisa sua operação em até 48h
  - `[03]` Você recebe um diagnóstico personalizado

### [FOOTER]
- Logo Zvision + "Zvision Automation" + tagline curta
- Links: Início · Como Funciona · Entregáveis · Contato
- Linha de rodapé: `© 2025 Zvision Automation · CYBER-CORE PRD · v1.0` em mono 9px muted
- Dot de status live: `● SISTEMA ATIVO` em verde pulsante

---

## COPY — DIRETRIZES DO COPY SQUAD

O Copy Squad deve aplicar estas regras em CADA linha de texto:

**Tom:** Direto + Confiante (premium). Nunca pede desculpa, nunca exagera.

**Headlines:** Orientadas a resultado ou a dor — nunca a feature. Formato preferido: afirmação forte > pergunta retórica > dado concreto.

**CTAs:** Sempre em JetBrains Mono uppercase. Usar linguagem tática:
- ✅ `SOLICITAR DIAGNÓSTICO` / `INICIAR MISSÃO` / `VER COMO FUNCIONA`
- ❌ `Saiba Mais` / `Clique Aqui` / `Entre em Contato`

**Palavras proibidas:** barato, fácil, rápido, simples, revolucionário, mágico, automático (no sentido de bot genérico)

**Palavras que usamos:** automação, inteligência, operação, processo, escala, precisão, resultado, implementação, missão, sistema, performance, dado, análise, eficiência

**Linguagem tática da UI:** `//`, `_`, `[ ]`, `>>`, `●`, nomenclatura de sistema

---

## ESPECIFICAÇÕES TÉCNICAS

```
- Arquivo único: salidas/index.html — CSS e JS inline
- Google Fonts: Space Grotesk + JetBrains Mono (via <link>)
- Sem frameworks CSS externos (sem Tailwind, Bootstrap, etc.)
- CSS com custom properties (variáveis) para todos os tokens
- Responsivo: mobile-first, breakpoints em 768px e 1280px
- Topbar fixa com scroll: adicionar backdrop-filter: blur(12px) + fundo semi-transparente ao fazer scroll
- Scroll suave: scroll-behavior: smooth
- Animações: CSS puro (keyframes), sem bibliotecas JS de animação
- Formulário: HTML nativo com validação básica — href e action="#" como placeholder
- Performance: imagens inline como base64 se necessário (logos)
- Acessibilidade básica: alt texts, labels nos inputs, contraste adequado
```

---

## ANIMAÇÕES OBRIGATÓRIAS

```css
/* Dot de status live */
@keyframes pulse {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

/* Glow do logo e botão primário */
@keyframes logoGlow {
  0%,100% { box-shadow: 0 0 40px rgba(162,230,53,0.4); }
  50%      { box-shadow: 0 0 60px rgba(162,230,53,0.6); }
}

/* Hover em cards */
transition: border-color 0.2s ease, transform 0.2s ease;
/* hover: border-color → rgba(162,230,53,0.35), transform → translateY(-1px) */

/* Fade-in das seções ao entrar no viewport */
/* IntersectionObserver com fadeUp animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## CHECKLIST FINAL (ralph-loop executa isso antes de salvar)

- [ ] Todos os tokens como CSS variables — zero valores hardcoded de cor
- [ ] APENAS Space Grotesk e JetBrains Mono em toda a página
- [ ] APENAS #A2E635 como cor vibrante (fora das cores de status)
- [ ] Grade tática visível no fundo de todas as seções
- [ ] Topbar fixa funcionando com blur no scroll
- [ ] Todos os CTAs em JetBrains Mono uppercase com linguagem tática
- [ ] Zero palavras proibidas (barato, fácil, rápido, simples, revolucionário)
- [ ] Formulário de contato funcional com validação básica
- [ ] Scroll suave entre âncoras funcionando
- [ ] Animações de pulse, fadeUp e hover funcionando
- [ ] Responsivo testado nos breakpoints 768px e 1280px
- [ ] Logo Zvision presente na topbar e no footer
- [ ] Todos os hrefs de CTA apontando para "#contato" ou âncoras corretas

---

*A landing page é o primeiro posto de comando que o cliente vê. Ela precisa fazer o visitante sentir que já está dentro do sistema Zvision antes mesmo de contratar.*
