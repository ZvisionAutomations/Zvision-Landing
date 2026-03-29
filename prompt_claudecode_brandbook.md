# PROMPT — CLAUDE CODE // ZVISION BRANDBOOK

---

## CONTEXTO OPERACIONAL

Você vai construir o **Brandbook oficial da Zvision Automation** como um único arquivo HTML interativo, de alto impacto visual. Este é um documento de referência para toda a equipe — designers, devs, copywriters e parceiros — então precisa ser impecável.

---

## SQUADS ATIVOS

Antes de escrever qualquer linha de código, ative os dois squads abaixo e siga suas diretrizes durante toda a execução:

```
squads/brand-squad/
squads/design-squad/
```

**Leia os seguintes arquivos de cada squad antes de começar:**
- `squad.yaml` — manifesto do squad, agentes disponíveis e suas especialidades
- `workflows/` — use o workflow mais adequado para criação de brandbook / design system
- `checklists/` — aplique os checklists de qualidade ao final antes de entregar

**Instrução de operação:** Trabalhe como se o Brand Squad e o Design Squad estivessem colaborando em tempo real. O Brand Squad garante que posicionamento, tom de voz e identidade estão corretos. O Design Squad garante que a execução visual, tipografia, hierarquia e componentes estão impecáveis.

---

## FONTES DE VERDADE — LEIA TODOS ANTES DE COMEÇAR

Leia os arquivos abaixo na ordem indicada. Eles são a base de tudo — não invente nada que não esteja documentado aqui:

```
1. brand.md          → identidade visual completa (cores, tipografia, logo, tom de voz)
2. negocio.md        → o que é a Zvision, para quem, qual problema resolve
3. oferta.md         → serviços, entregáveis, diferenciais, objeções
4. zvision_crm_identity.md → identidade do produto CRM (componentes, tokens, telas, animações)
```

---

## ENTREGÁVEL

**Um único arquivo:** `zvision_brandbook.html`

Brandbook interativo, navegável por seções, dark mode absoluto, fiel à identidade Zvision. Funciona como site de uma página com navegação lateral ou por âncoras.

---

## ESTRUTURA DO BRANDBOOK

O HTML deve ter as seguintes seções, nesta ordem:

### 1. CAPA — Boot Screen
- Animação de inicialização: logo Zvision central com glow pulsante em `#A2E635`
- Barra de progresso carregando (CSS animation, 2–3s)
- Texto: `ZVISION AUTOMATION` em JetBrains Mono + `BRANDBOOK // v1.0.0` abaixo
- Log de diagnóstico no canto inferior esquerdo com entradas `[OK]`
- Após completar, transição suave para o conteúdo principal
- Grade tática de fundo (`rgba(162,230,53,0.03)`, grid 40px)

### 2. SOBRE A MARCA
- Nome oficial: **Zvision Automation**
- O que fazemos (extraído do `negocio.md`)
- Para quem (perfil do cliente ideal)
- Problema que resolvemos
- A alma da marca em 1 linha: *"Cada processo é uma missão. Cada automação é uma vantagem."*

### 3. LOGO
- Exibir as 3 versões do logo lado a lado:
  - **Dark** (fundo `#050506`, símbolo accent verde)
  - **Light invertido** (fundo `#A2E635`, símbolo preto)
  - **Horizontal** (fundo `#050506`, símbolo + wordmark)
- Como os logos são imagens (JPG dos uploads), referencie-as ou recrie o símbolo em SVG inline baseado na geometria descrita: Z em dupla faixa diagonal com corte angular
- Regras de uso: área de respiro, fundos permitidos, o que nunca fazer
- Versão mínima: símbolo isolado

### 4. PALETA DE CORES
- Exibir cada token como um card: swatch colorido + nome do token + valor hex/rgba + descrição de uso
- Organizar em grupos: **Fundos**, **Texto**, **Accent**, **Status**, **Bordas**
- Demonstrar contraste: mostrar texto branco e accent sobre cada fundo
- Regra de ouro em destaque: "UMA cor accent. A interface inteira é surface-page + #A2E635 + neutros."

### 5. TIPOGRAFIA
- Exibir `Space Grotesk` com amostras nos pesos 500 e 700
- Exibir `JetBrains Mono` com amostras nos pesos 400 e 700
- Tabela de regras tipográficas: elemento → fonte → peso → tamanho → letter-spacing
- Exemplos visuais de cada uso: título de tela, label de card, valor métrico, badge de status, texto de briefing IA
- Regra: "Nunca Inter. Nunca Roboto."

### 6. GEOMETRIA & ESPAÇAMENTO
- Tokens de border-radius: card (4px), botão/input (3px)
- Demonstrar visualmente: card com 4px vs card com 8px vs card com 0px — mostrar qual é o correto
- Gap padrão entre elementos: 12px
- Padding interno de cards: 16px
- Backdrop blur: 12px apenas em modais e topbar flutuante

### 7. TOM DE VOZ
- Dois pilares: **Direto** + **Confiante (premium)**
- Palavras que usamos vs palavras que nunca usamos
- Exemplos de linguagem tática da UI: `// ANÁLISE TÁTICA`, `LIVE FEED ACTIVE`, `MISSÃO PENDENTE`, `ALVO CONFIRMADO`, `INGESTÃO DE DADOS // UPLINK`, `SECURE_LINK_ESTABLISHED`
- Exemplo de copy certo vs copy errado (side-by-side)
  - ❌ "Nossa solução é fácil e rápida de implementar"
  - ✅ "Implementação executada. Operação ativa. Resultado mensurável."

### 8. COMPONENTES DE UI
Exibir cada componente como demonstração interativa (HTML real, não screenshot):

- **Button primário** — fundo accent, mono 11px bold, hover com glow neon
- **Button outline** — borda border-default, hover: borda bright + texto accent
- **Badge de status** — variantes: SINAL ALTO (verde), AGUARDANDO (amber), CANCELADO (vermelho)
- **Input** — fundo surface-page, borda border-default, focus com ring accent
- **Card de métrica (ROI-Meter)** — label muted + valor mono grande + barra de intensidade 2px
- **Lead Card** — nome da empresa + dot de sinal colorido + valor estimado + badge de status + rodapé com agente
- **Toggle** — track inativo surface-elevated / ativo accent, thumb branco
- **Avatar** — circular com borda border-default, fallback com iniciais accent

### 9. ELEMENTOS AMBIENTE
- Grade tática de fundo: demonstração ao vivo do padrão de grid + código CSS
- Scanlines CRT: demonstração sobre um gráfico fake
- Marcas de canto: demonstração do ornamento de 4 cantos com código
- Dot de status live: demonstração do pulse animation

### 10. SOMBRAS & EFEITOS
- `shadow-neon`: `0 0 12px rgba(162,230,53,0.25)` — demonstrar em botão e logo
- `shadow-neon-sm`: `0 0 6px rgba(162,230,53,0.3)` — demonstrar em dot de status
- `shadow-panel`: `-8px 0 32px rgba(0,0,0,0.6)` — demonstrar em painel slide-over

### 11. ANIMAÇÕES
- Demonstrar cada animação como exemplo ao vivo:
  - `logoGlow`: pulsação do box-shadow do logo (2s loop)
  - `pulse`: dot de status oscilando opacity 1.0 → 0.4 (2s loop)
  - Hover em card: `border-color` + `translateY(-1px)` (0.2s ease)
  - Progresso de boot: barra 0%→100% com pequenos saltos (3s)

### 12. REGRAS DE OURO — DO'S AND DON'TS
Checklist visual final para qualquer pessoa que for criar algo para a Zvision:

**✅ SEMPRE:**
- Dark mode absoluto (`#050506`)
- Space Grotesk para UI, JetBrains Mono para dados
- Grade tática como único elemento decorativo de fundo
- Tom tático nos labels (`//`, `_`, `[ ]`, `>>`)
- UMA cor accent (#A2E635) para tudo

**❌ NUNCA:**
- Inter ou Roboto
- Blobs, dot grids decorativos, partículas flutuantes
- Glassmorphism excessivo
- Outras cores vibrantes além das de status
- Border-radius acima de 4px em cards
- Linguagem genérica ("fácil", "rápido", "barato")

---

## ESPECIFICAÇÕES TÉCNICAS DO HTML

```
- Arquivo único: tudo inline (CSS no <style>, JS no <script>)
- Google Fonts: importar Space Grotesk e JetBrains Mono
- Dark mode: background #050506 em todo o documento
- Navegação: sidebar fixa de 200px com links âncora para cada seção
- Scroll suave: scroll-behavior: smooth
- Responsivo: mínimo funcional em 1280px+
- Sem dependências externas além do Google Fonts
- Sem frameworks CSS (Tailwind, Bootstrap) — CSS puro nos tokens semânticos
- Usar CSS custom properties (variáveis) para todos os tokens de design
- Animações: CSS puro (keyframes), sem bibliotecas JS de animação
```

---

## CSS VARIABLES OBRIGATÓRIAS

Declarar no `:root` antes de qualquer outro estilo:

```css
:root {
  --surface-page: #050506;
  --surface-card: #0d0d10;
  --surface-elevated: #141418;
  --surface-hover: #1c1c22;

  --text-primary: #e8e8e8;
  --text-secondary: #9ca3af;
  --text-muted: #4b5563;

  --accent-primary: #A2E635;
  --accent-hover: #b8f040;
  --accent-subtle: rgba(162, 230, 53, 0.08);
  --accent-subtle2: rgba(162, 230, 53, 0.15);

  --status-success: #22c55e;
  --status-error: #ef4444;
  --status-warning: #f59e0b;

  --border-default: rgba(162, 230, 53, 0.15);
  --border-bright: rgba(162, 230, 53, 0.5);

  --radius-card: 4px;
  --radius-button: 3px;
  --radius-input: 3px;

  --shadow-neon: 0 0 12px rgba(162,230,53,0.25);
  --shadow-neon-sm: 0 0 6px rgba(162,230,53,0.3);
  --shadow-panel: -8px 0 32px rgba(0,0,0,0.6);
}
```

---

## CHECKLIST FINAL (aplicar antes de entregar)

Antes de salvar o arquivo final, verificar item por item:

- [ ] Boot screen carrega com animação e transiciona para o conteúdo
- [ ] Grade tática visível no fundo de todas as seções
- [ ] APENAS Space Grotesk e JetBrains Mono em toda a interface
- [ ] APENAS #A2E635 como cor vibrante (fora das cores de status)
- [ ] Todos os tokens de CSS como variáveis — zero valores hardcoded de cor
- [ ] Todos os 8 componentes de UI funcionando e clicáveis/horáveis
- [ ] Animações de pulse, glow e hover funcionando
- [ ] Tom de voz tático em TODOS os labels e títulos de seção
- [ ] Navegação sidebar funcional com scroll suave entre seções
- [ ] Nenhuma biblioteca externa além do Google Fonts

---

*Cada seção do brandbook deve parecer uma tela do próprio sistema Zvision. O brandbook É a marca.*
