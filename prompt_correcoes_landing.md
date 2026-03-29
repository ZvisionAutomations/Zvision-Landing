# PROMPT — CLAUDE CODE // ZVISION LANDING PAGE — CORREÇÕES CIRÚRGICAS

---

## CONTEXTO

Este prompt aplica correções pontuais no arquivo `salidas/index.html` já gerado.
Leia o arquivo completo antes de qualquer edição. Faça apenas o que está descrito aqui — não reescreva o que está funcionando.

---

## REGRA DE TRABALHO

Usar **edições cirúrgicas** (str_replace / Edit) — nunca reescrever o arquivo inteiro.
Após cada correção, verificar se o restante da página não foi afetado.

---

## CORREÇÃO 1 — LOGO REAL (PRIORIDADE MÁXIMA)

O logo atual é um SVG polígono placeholder em 3 locais. Substituir pelos logos reais em base64.

**Logos disponíveis (converter para base64 antes de inserir):**
```
Logo dark (Z verde em fundo preto):
  rascunho_tipografia_Zvision_Prancheta_1_cópia_3.jpg

Logo light (Z preto em fundo verde):
  rascunho_tipografia_Zvision_Prancheta_1_cópia_4.jpg

Logo horizontal (Z + wordmark "zvision"):
  Nova_identidade_visual_Z_vision_Prancheta_1_cópia_2.jpg
```

**Como converter:**
```bash
base64 -w 0 "rascunho_tipografia_Zvision_Prancheta_1_cópia_3.jpg" > logo_dark.b64
base64 -w 0 "Nova_identidade_visual_Z_vision_Prancheta_1_cópia_2.jpg" > logo_horiz.b64
```

**Local 1 — TOPBAR** (linha ~1410):
Substituir:
```html
<div class="topbar-logo-mark">
  <svg width="16" height="16" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <polygon points="4,4 36,4 36,12 14,28 36,28 36,36 4,36 4,28 26,12 4,12" fill="#050506"/>
  </svg>
</div>
```
Por:
```html
<div class="topbar-logo-mark" style="background:transparent;padding:0;border:none;animation:logoGlow 3s ease-in-out infinite;">
  <img src="data:image/jpeg;base64,[BASE64_LOGO_DARK]" width="28" height="28" style="object-fit:contain;border-radius:4px;" alt="Zvision"/>
</div>
```

**Local 2 — FOOTER** (procurar por `footer-logo` ou SVG no footer):
Mesmo tratamento do topbar — substituir SVG pelo `<img>` base64 do logo dark, width="24" height="24".

**Local 3 — Se houver SVG no hero panel ou terminal card:**
Remover qualquer SVG de logo decorativo restante. Não adicionar logo onde não havia.

---

## CORREÇÃO 2 — PREÇO FORA DO HERO

**Problema:** `R$500 // Entrada a partir de` como stat de destaque ancora o visitante no menor preço antes de entender o valor. Destrói percepção premium.

**Localizar** a div `.hero-stats` e substituir o stat de preço:

Remover:
```html
<div class="hero-stat">
  <span class="hero-stat-val">R$500</span>
  <span class="hero-stat-lbl">// Entrada a partir de</span>
</div>
```

Substituir por:
```html
<div class="hero-stat">
  <span class="hero-stat-val">100%</span>
  <span class="hero-stat-lbl">// Operação gerenciada</span>
</div>
```

Os outros dois stats (`48h` e `100% Gerenciado`) — verificar se há duplicidade após a troca e ajustar se necessário. O resultado final deve ter 3 stats distintos:
- `48h` // Diagnóstico respondido
- `100%` // Operação gerenciada por nós
- `0` // Equipe técnica interna necessária

---

## CORREÇÃO 3 — STATUS WARNING NO HERO PANEL

**Problema:** O item "INTEGRAÇÃO API PENDENTE" com badge amarelo/warning é a primeira coisa visível no painel. Comunica sistema incompleto.

**Localizar** no `#hero` a `.panel-row` com `live-dot-warn` e badge `badge-warning`:

Substituir:
```html
<div class="panel-row">
  <div class="panel-row-name">
    <div class="live-dot live-dot-warn"></div>
    INTEGRAÇÃO API PENDENTE
  </div>
  <span class="badge badge-warning"><span class="live-dot live-dot-warn"></span>CONFIG</span>
</div>
```

Por:
```html
<div class="panel-row">
  <div class="panel-row-name">
    <div class="live-dot live-dot-success"></div>
    INTEGRAÇÃO API ATIVA
  </div>
  <span class="badge badge-success"><span class="live-dot live-dot-success"></span>SYNC</span>
</div>
```

**Fazer o mesmo** na seção `#solucao` no `.terminal-card` — localizar a row de APIs com `live-dot-warn` e badge `badge-warning` e aplicar a mesma correção.

---

## CORREÇÃO 4 — MÉTRICAS INVENTADAS

**Problema:** `847h`, `-68%`, `94%`, `99.9%` aparecem como fatos comprovados. Produto em pré-lançamento não pode afirmar isso.

**Localizar e substituir** em TODOS os locais onde aparecem (hero panel + terminal card da solução):

| Valor atual | Substituir por |
|---|---|
| `847h` | `800h+` |
| `-68%` | `até -65%` |
| `94%` | `+90%` |
| `99.9%` (uptime) | `99.9%` ← manter, é padrão de SLA aceitável |
| `87%` (pipeline CRM) | `+85%` |
| `42%` (integração APIs) | remover este item ou trocar por `CONFIGURÁVEL` |

**Para as barras de progresso dos diferenciais** (`dif-primary-bar`, `dif-bar`):
Remover as barras completamente — elas não representam nada mensurável e enfraquecem a credibilidade.

Localizar e remover:
```html
<div class="dif-primary-bar">
  <div class="dif-primary-fill" style="--w:90%;"></div>
</div>
```
e
```html
<div class="dif-bar"><div class="dif-bar-fill" style="--w:82%;"></div></div>
```
(e similares nos outros dif-cards)

Remover também os estilos CSS associados: `.dif-primary-bar`, `.dif-primary-fill`, `.dif-bar`, `.dif-bar-fill` — se esses seletores não forem usados em mais nenhum lugar.

---

## CORREÇÃO 5 — AJUSTE FINO DE COPY (OPCIONAL MAS RECOMENDADO)

Estas são melhorias de copy que não exigem mudança estrutural:

**5a — Headline da seção PROCESSO:**
Atual: `"Processo de Implementação"` — genérico demais.
Substituir por: `"Três etapas. Resultado mensurável."` ou `"Do diagnóstico à operação ativa."`

**5b — Headline da seção ENTREGÁVEIS:**
Atual: `"Cada entregável com resultado mensurável."` — boa, manter.

**5c — Footer tagline:**
Localizar `.footer-tagline` e verificar se o texto está em português e no tom tático.
Se estiver genérico, substituir por: `Automação que opera. Resultado que aparece.`

**5d — Botão submit do formulário:**
Verificar se o texto do botão de submit está como `INICIAR MISSÃO` e não como `Enviar` ou `Submit`.
Se não estiver, corrigir para `INICIAR MISSÃO`.

---

## CHECKLIST FINAL

Após todas as correções, verificar item por item antes de salvar:

- [ ] Logo real (base64) presente na topbar e no footer — SVG placeholder removido
- [ ] Nenhum stat de preço no hero
- [ ] Hero panel e terminal card sem badges warning/amarelos
- [ ] Métricas com linguagem de "potencial" (800h+, até -65%) em vez de fato comprovado
- [ ] Barras decorativas dos diferenciais removidas
- [ ] Botão submit do formulário diz "INICIAR MISSÃO"
- [ ] Nenhuma outra parte da página foi afetada pelas edições
- [ ] Arquivo ainda é HTML válido e abre no browser sem erros