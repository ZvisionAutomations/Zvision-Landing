# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Propósito del workspace

Este workspace genera landing pages HTML de alta conversión a partir de tres archivos de contexto que el usuario completa. No hay build system, dependencias, ni servidor de desarrollo — el output es un `index.html` standalone con CSS y JS inline.

---

## Estructura y archivos clave

```
contexto/
  negocio.md   # Cliente ideal, problema que se resuelve, prueba social
  oferta.md    # Producto, precio, qué incluye, garantía, diferenciales, objeciones
  brand.md     # Colores (hex), tipografía, tono de voz, referencias visuales
.claude/
  commands/
    crear-web.md  # Definición del comando /crear-web
salidas/          # Output generado — una subcarpeta por web
```

---

## Comando principal: `/crear-web`

Cuando el usuario ejecuta `/crear-web`, el flujo es:

1. Leer los tres archivos de `contexto/` (`negocio.md`, `oferta.md`, `brand.md`)
2. Generar `salidas/index.html` — un archivo HTML completo con CSS y JS embebidos, responsive, listo para producción sin dependencias externas (fuentes de Google Fonts sí se pueden usar vía `<link>`)
3. Si algún campo de contexto está vacío o tiene solo el texto placeholder de ejemplo, omitir esa sección o usar defaults razonables — no generar contenido inventado

---

## Convenciones para el HTML generado

- **Un solo archivo** `index.html` con todo inline (no archivos CSS/JS separados)
- CSS con variables (`--color-primary`, `--color-bg`, etc.) derivadas de `brand.md`
- Estructura de secciones típica de landing de conversión: hero → problema → solución → qué incluye → garantía → testimonios → precio → CTA final
- Omitir secciones si el contexto correspondiente está vacío (ej: no hay testimonios → no generar sección de testimonios con texto falso)
- El CTA principal debe tener un `href="#"` como placeholder — el usuario lo reemplaza con su link de pago/contacto

---

## Ajustes post-generación

El usuario puede pedir cambios en lenguaje natural. Para modificar el HTML generado:
- Leer el archivo existente en `salidas/` antes de editar
- Hacer cambios quirúrgicos con Edit, no reescribir todo el archivo salvo que sea necesario
- Si el cambio es de copy (texto), aplicarlo directamente sin preguntar
- Si el cambio afecta la estructura de secciones, confirmar brevemente antes de proceder

---

## Lo que este workspace NO hace

- No tiene tests, linter, ni pipeline de build
- No genera múltiples páginas — solo landing pages de una página
- No conecta con APIs de pago ni CRMs — el usuario configura eso por su cuenta después del deploy

---

## Zvision OS

Squads e skills disponíveis em `.zvision-os/squads/`
CLAUDE.md de referência em `.zvision-os/CLAUDE.md`
Vault em `.zvision-os/obsidian-vault/`
