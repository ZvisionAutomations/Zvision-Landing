# PROMPT — CLAUDE CODE // ZVISION LOGO SVG INLINE

---

## OBJETIVO

Substituir as duas imagens base64 do logo no `salidas/index.html` por um SVG inline
que recrie fielmente o símbolo Z da Zvision Automation.
O arquivo deve enxugar de ~145KB para ~65KB sem nenhuma alteração visual perceptível.

---

## REGRA DE TRABALHO

Edições cirúrgicas apenas — não reescrever o arquivo inteiro.
Testar visualmente (abrir no browser) antes de confirmar como concluído.

---

## ANÁLISE DO SÍMBOLO Z

O logo da Zvision é um símbolo geométrico com 3 elementos em cor `#A2E635`:

```
ELEMENTO 1 — BARRA SUPERIOR
- Faixa horizontal no topo
- Lado esquerdo: curva arredondada (como início de seta)
- Lado direito: corte diagonal apontando para a direita (como ponta de seta)
- Posição: topo-centro, levemente deslocada para a direita

ELEMENTO 2 — DIAGONAL DUPLA (o "Z")
- Duas faixas paralelas descendo da direita para a esquerda
- Espessura uniforme
- Espaço negativo (preto/transparente) entre as duas faixas — é o que cria o
  efeito de dupla linha do Z
- Ocupa a maior parte da altura do símbolo

ELEMENTO 3 — BARRA INFERIOR
- Faixa horizontal na base
- Lado esquerdo: corte diagonal (continuação da diagonal)
- Lado direito: curva arredondada (espelho do elemento 1)
- Posição: base-centro, levemente deslocada para a esquerda
```

**Geometria geral:**
- O símbolo cabe em um viewBox quadrado (ex: 100x100 ou 200x200)
- Não tem fundo — é apenas o símbolo em `#A2E635` sobre transparente
- Os cantos arredondados são apenas nas pontas externas das barras horizontais
- A diagonal tem corte angular limpo (sem arredondamento)

---

## CONSTRUÇÃO DO SVG

### Passo 1 — Criar o SVG do símbolo

Construir o SVG usando `<polygon>` ou `<path>` com as coordenadas corretas.

Referência de proporções para um viewBox de `0 0 100 100`:

```
BARRA SUPERIOR (aproximado):
  Começa em x≈30, y≈15
  Vai até x≈85, y≈15 (topo direito, corte angular)
  Desce até x≈85, y≈30 (base direita, corte angular)
  Volta até x≈35, y≈30
  Curva à esquerda com arredondamento (rx≈8)

DIAGONAL SUPERIOR (faixa 1 do Z):
  Do canto direito da barra superior desce em diagonal até o centro-esquerdo

DIAGONAL INFERIOR (faixa 2 do Z — o espaço negativo define as duas):
  Continua do ponto anterior até a barra inferior

BARRA INFERIOR (espelho da superior):
  Começa em x≈15, y≈70
  Vai até x≈65, y≈70 (com corte angular à esquerda)
  Desce até x≈70, y≈85 (base)
  Volta com curva arredondada à direita até x≈15, y≈85

ESPAÇO NEGATIVO (o corte diagonal entre as duas faixas):
  Um polígono na cor do fundo (ou usando clip-path) que cria
  a separação entre as duas diagonais do Z
```

### Passo 2 — Validar fidelidade

Após criar o SVG, comparar mentalmente com a descrição:
- ✓ Topo tem ponta de seta à direita e curva à esquerda
- ✓ Base tem ponta de seta à esquerda e curva à direita
- ✓ Diagonal dupla com espaço negativo visível entre as faixas
- ✓ Proporções similares ao original (mais alto que largo, levemente)
- ✓ Cor `#A2E635` em todo o símbolo
- ✓ Fundo transparente (sem `<rect>` de fundo)

Se o SVG não estiver fiel, ajustar os pontos das coordenadas antes de inserir no HTML.

### Passo 3 — Criar variante para topbar (pequena)

Para uso na topbar (28x28px) e footer, o SVG precisa:
```html
<svg width="28" height="28" viewBox="0 0 100 100" fill="none"
     xmlns="http://www.w3.org/2000/svg" aria-label="Zvision">
  <!-- paths do símbolo em #A2E635 -->
</svg>
```

O mesmo SVG pode ser reescalado via width/height — o viewBox se mantém.

---

## SUBSTITUIÇÃO NO HTML

### Local 1 — TOPBAR (~linha 1410)

Localizar:
```html
<div class="topbar-logo-mark" style="background:transparent;padding:0;border:none;animation:logoGlow 3s ease-in-out infinite;">
  <img src="data:image/jpeg;base64,[...enorme string base64...]" width="28" height="28" .../>
</div>
```

Substituir por:
```html
<div class="topbar-logo-mark" style="background:transparent;padding:0;border:none;animation:logoGlow 3s ease-in-out infinite;">
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none" aria-label="Zvision" aria-hidden="true">
    <!-- SVG do símbolo Z aqui -->
  </svg>
</div>
```

### Local 2 — FOOTER

Localizar o `<img>` com base64 no footer e aplicar a mesma substituição com `width="24" height="24"`.

---

## APÓS AS SUBSTITUIÇÕES

Verificar e reportar:

```
Tamanho antes:  ~145 KB
Tamanho depois: ? KB
Redução:        ? KB (?%)

Locais substituídos:
  [ ] Topbar — img base64 → SVG inline
  [ ] Footer — img base64 → SVG inline

Validação visual:
  [ ] Logo visível na topbar com glow animado
  [ ] Logo visível no footer
  [ ] Proporções e geometria fiéis ao original
  [ ] Cor #A2E635 correta
  [ ] Fundo transparente (sem caixa branca/preta ao redor)
  [ ] Arquivo abre no browser sem erros
```

---

## PLUGINS / MODELO / EFFORT

- **Plugins:** nenhum necessário
- **Modelo:** `claude-sonnet-4-5`
- **Effort:** `low` — tarefa técnica pontual, sem necessidade de raciocínio estendido

---

## COMANDO

```bash
claude --model claude-sonnet-4-5 \
"Leia o arquivo salidas/index.html. Leia o arquivo prompt_svg_logo.md e execute as instruções. Crie o SVG inline do símbolo Z da Zvision e substitua as duas imagens base64 do logo. Reporte tamanho antes e depois."
```
