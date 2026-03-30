# PROMPT — CLAUDE CODE // IMPLEMENTAR SVG REAL DO LOGO

---

## OBJETIVO

Substituir o SVG placeholder do logo nos dois locais do `salidas/index.html`
pelo SVG real da Zvision — usando os paths do arquivo `zvision-logo.svg`.

---

## ARQUIVO DE REFERÊNCIA

Usar o arquivo: `zvision-logo.svg`

Este SVG contém:
- 2 paths com `fill="#A2E635"` — são os paths reais do símbolo Z
- ViewBox `0 0 2085 2085` — grande mas reescalável
- Fundo transparente — sem rect de fundo, sem segundo path de background
- É o SVG correto para uso inline no HTML dark

**NÃO usar** `zvision-logo-new.svg` nem `Nova_identidade_visual...svg` —
ambos têm um segundo path com `fill="rgb(254,254,252)"` que cria
uma caixa branca sobre o fundo escuro da interface.

---

## O QUE FAZER

### Passo 1 — Ler o zvision-logo.svg

Extrair os dois `<path>` com seus atributos `d` completos.

### Passo 2 — Montar o SVG inline otimizado

Criar um SVG inline limpo para inserir no HTML:

```html
<svg width="28" height="28" viewBox="0 0 2085 2085" fill="none"
     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="#A2E635">
    <path d="[PATH_1_DO_ARQUIVO]"/>
    <path d="[PATH_2_DO_ARQUIVO]"/>
  </g>
</svg>
```

Para o footer, usar `width="24" height="24"` — viewBox permanece igual.

### Passo 3 — Localizar os dois SVGs placeholder no HTML

**Local 1 — Topbar** (buscar por `topbar-logo-mark`):
Substituir o SVG placeholder atual pelo SVG real com `width="28" height="28"`.

**Local 2 — Footer** (buscar por SVG no bloco do footer):
Substituir o SVG placeholder atual pelo SVG real com `width="24" height="24"`.

### Passo 4 — Verificar

Após substituição:
- [ ] Nenhum SVG com fundo branco inserido
- [ ] Cor `#A2E635` mantida nos paths
- [ ] `width`/`height` corretos em cada local (28px topbar, 24px footer)
- [ ] `aria-hidden="true"` presente
- [ ] Animação `logoGlow` ainda aplicada ao container `.topbar-logo-mark`

---

## REPORTE FINAL

```
Locais substituídos:
  [ ] Topbar — SVG placeholder → SVG real (28x28)
  [ ] Footer — SVG placeholder → SVG real (24x24)

Tamanho do arquivo:
  Antes: 82.5 KB
  Depois: ? KB

Validação:
  [ ] Logo visível e correto na topbar
  [ ] Logo visível e correto no footer  
  [ ] Sem caixa branca ao redor do logo
  [ ] Glow animado funcionando na topbar
```

---

## MODELO / EFFORT / PLUGINS

- **Modelo:** `claude-sonnet-4-5`
- **Effort:** `low` — sem `--think`
- **Plugins/MCPs:** nenhum

---

## COMANDO

```bash
claude --model claude-sonnet-4-5 \
"Leia o arquivo prompt_logo_real.md e execute as instruções. Use os paths do zvision-logo.svg para substituir os SVGs placeholder no salidas/index.html. Edições cirúrgicas apenas."
```
