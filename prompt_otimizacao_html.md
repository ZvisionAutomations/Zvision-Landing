# PROMPT — CLAUDE CODE // ZVISION LANDING PAGE — OTIMIZAÇÃO DE CÓDIGO

---

## CONTEXTO

Otimizar o arquivo `salidas/index.html` sem alterar nada visualmente.
A página deve ser **idêntica** antes e depois — apenas o código interno muda.

**Regra absoluta:** Se houver qualquer dúvida se uma remoção vai quebrar algo, NÃO remover. Preservar funcionalidade é prioridade sobre tamanho de arquivo.

---

## PLUGINS ATIVOS

- **code-simplifier** → guiar as decisões de limpeza e consolidação
- **ralph-loop** → rodar validação ao final: página abre, animações funcionam, formulário funciona, responsivo ok

---

## ANTES DE COMEÇAR

1. Ler o arquivo `salidas/index.html` completo
2. Mapear mentalmente: quais seletores CSS existem, quais são usados no HTML, quais são órfãos
3. Identificar blocos JS duplicados ou mortos
4. Só então começar as otimizações, na ordem abaixo

---

## OTIMIZAÇÕES — EXECUTAR NESTA ORDEM

### [1] REMOVER CSS ÓRFÃO

Varrer todos os seletores CSS do `<style>` e verificar se cada um tem ao menos um elemento correspondente no HTML.

Remover seletores que:
- Não existem no HTML (classes definidas mas nunca usadas)
- Foram removidos em edições anteriores mas o CSS ficou (ex: `.dif-primary-bar`, `.dif-bar`, `.dif-primary-fill`, `.dif-bar-fill` se ainda estiverem)
- São overrides que nunca se aplicam (ex: seletor muito específico sem match)

**NÃO remover:**
- Seletores de pseudo-elementos (`:hover`, `:focus`, `::before`, `::after`)
- Seletores de estado (`.scrolled`, `.visible`, `.active`, `.expanded`)
- Seletores de keyframes (`@keyframes`)
- Media queries
- Variáveis CSS no `:root`

---

### [2] CONSOLIDAR CSS DUPLICADO

Verificar se há propriedades repetidas que podem ser consolidadas:

- Múltiplos seletores com as mesmas propriedades → agrupar com vírgula
  ```css
  /* antes */
  .card-a { border-radius: 4px; }
  .card-b { border-radius: 4px; }
  
  /* depois */
  .card-a, .card-b { border-radius: 4px; }
  ```
- Propriedades que repetem o valor de uma CSS variable quando poderiam usar a variável
  ```css
  /* antes */
  color: #A2E635;
  
  /* depois */
  color: var(--accent-primary);
  ```
- Blocos de font-family repetidos que poderiam herdar do `body` ou de uma classe base

**Atenção:** Consolidar apenas quando os seletores têm escopo similar. Não consolidar se um é mobile-only e outro é desktop-only.

---

### [3] LIMPAR JS MORTO

Verificar o bloco `<script>` ao final do arquivo:

Remover:
- Event listeners para elementos que não existem mais no HTML
- Variáveis declaradas e nunca usadas
- Funções definidas e nunca chamadas
- `console.log` ou `console.error` de debug
- Comentários de debug ou TODO antigos

Manter:
- IntersectionObserver do scroll reveal (`.reveal`)
- Lógica do topbar scrolled
- Accordion das objeções
- Animação das barras do hero panel (`panel-bar-fill`)
- Validação e submit do formulário
- Qualquer listener de interação visível na página

---

### [4] MINIFICAR COMENTÁRIOS

Remover comentários CSS e HTML excessivamente verbosos, mantendo apenas os que delimitam seções principais:

**Manter** (são âncoras de navegação no código):
```css
/* ═══ TOKENS ═══ */
/* ═══ HERO ═══ */
/* ═══ RESPONSIVE ═══ */
```

**Remover:**
- Comentários explicativos óbvios (`/* sets color to red */`)
- Comentários TODO e FIXME
- Blocos de código comentado (código morto comentado)
- Comentários HTML de seção duplicados (se o ID da seção já é auto-explicativo)

---

### [5] OTIMIZAR INLINE STYLES

Varrer o HTML em busca de `style=""` inline:

- Se um `style=""` inline se repete em 3+ elementos → criar uma classe CSS para ele
- Se um `style=""` inline é um valor hardcoded de cor que tem token equivalente → substituir pela variável
  ```html
  <!-- antes -->
  <div style="color:#A2E635;">
  
  <!-- depois — mover para CSS ou usar variável -->
  <div style="color:var(--accent-primary);">
  ```
- Manter inline styles que são valores dinâmicos únicos (ex: `style="--w:94%;"` nas barras de progresso)

---

### [6] OTIMIZAR SVGS DE ÍCONES

Para cada SVG de ícone inline no HTML:

- Remover atributos desnecessários: `xmlns` quando inline no HTML, `version`, `xml:space`
- Remover `id` nos paths se não referenciados por JS
- Verificar se `viewBox` está correto e `width`/`height` são necessários
- **NÃO alterar** o conteúdo geométrico dos SVGs (paths, polygons, pontos)

---

### [7] VERIFICAR HTML SEMÂNTICO

Revisão rápida sem alterar estrutura visual:

- Verificar se todos os `<img>` têm `alt` adequado
- Verificar se botões `<button>` têm `type` definido (`type="button"` nos accordions)
- Verificar se o formulário tem `<label>` corretamente associado via `for`/`id`
- Verificar se há `aria-label` nos CTAs que são apenas ícone

---

## MÉTRICAS DE SUCESSO

Ao final, reportar:

| Métrica | Antes | Depois |
|---|---|---|
| Tamanho do arquivo (KB) | ? | ? |
| Linhas de CSS | ? | ? |
| Linhas de JS | ? | ? |
| Seletores CSS órfãos removidos | — | ? |
| Inline styles convertidos para classes | — | ? |

---

## CHECKLIST FINAL (ralph-loop executa)

- [ ] Página abre no browser sem erros de console
- [ ] Boot/reveal animations funcionando (scroll reveal das seções)
- [ ] Topbar blur ao fazer scroll funcionando
- [ ] Accordions das objeções abrindo e fechando
- [ ] Formulário com validação funcionando (campos vazios mostram erro)
- [ ] Hover nos cards com translateY funcionando
- [ ] Barras de progresso do hero panel animando ao entrar no viewport
- [ ] Responsivo: layout correto em 768px e 1280px
- [ ] Nenhuma alteração visual detectável

---

## COMANDO

```bash
claude --model claude-sonnet-4-5 \
"Leia o arquivo salidas/index.html completo. Execute as otimizações descritas em prompt_otimizacao_html.md na ordem indicada. Não altere nada visualmente — apenas o código interno. Reporte as métricas antes e depois."
```
