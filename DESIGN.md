# Design — "Cauce"

<!-- impeccable:design-schema 1 -->

Sistema visual de Inversiones Generales M&M, derivado del espiral de marca leído
como **curvas de nivel / contornos topográficos**. Documentado desde la
implementación construida (index.html, propiedades.html, propiedad.html,
assets/css/styles.css). Nota de proceso: la revisión de cierre y esta
documentación se hicieron dentro del hilo de build (sin subagente separado).

## Thesis

Inmobiliaria de Córdoba cuya identidad ES su marca: contornos que fluyen desde un
foco. Rechaza el default del rubro (foto de stock + muro de cards SaaS).

## Color

Estrategia: **Committed** — el azul marino ocupa regiones enteras (hero, proceso,
contacto, footer) y el celeste de marca es la energía luminosa.

| Rol | Token | Valor |
|---|---|---|
| Celeste de marca | `--celeste` | `#2F9BE0` |
| Celeste oscuro (hover/links) | `--celeste-600/700` | `#1D82C6` / `#16699F` |
| Azul marino (autoridad) | `--navy` | `#0B2237` |
| Marino medio | `--navy-700/800` | `#17466C` / `#123353` |
| Tinta (texto claro) | `--ink` | `#0C2338` |
| Tinta secundaria | `--ink-soft` | `#4A657D` (≥4.5:1 sobre blanco) |
| Fondo | `--ground` | `#F4F7FA` (frío, NO crema) |
| Sobre oscuro | `--on-dark` / `--on-dark-soft` | `#F3F8FC` / `#A9C6DD` |
| Acento cálido (solo "Oportunidad") | `--gold` | `#E0A93F` |

Texto secundario sobre superficies oscuras se tinta del celeste, nunca gris.

## Tipografía

- **Display:** Archivo (700–800), tracking negativo (`-0.028em` a `-0.035em`).
  Cara con carácter arquitectónico; encaja con tierra/planos/propiedad.
- **Texto/UI:** Hanken Grotesk (400–700). Legible, humanista, no sobreusada.
- Escala fluida con `clamp()` (`--step--1` … `--step-5`), display máx ~5.6rem.
- Fuentes vía Google Fonts con fallback a `Segoe UI`/`system-ui`.

## Motion — firma

**Contornos generativos** en canvas (`assets/js/contours.js`): iso-líneas
concéntricas deformadas que emanan de un foco, animadas con deriva lenta de fase.
Es la única "pieza mayor" de motion; el resto son micro-transiciones
(`cubic-bezier(.22,1,.36,1)`), reveal-on-scroll y hover sutiles. Respeta
`prefers-reduced-motion` (dibujo estático) y pausa en pestaña oculta.

## Componentes

- **Header** sticky con blur; marca = espiral SVG (`#mm-mark`, currentColor).
- **Hero** navy full-bleed con canvas de contornos + viñeta que protege contraste;
  panel de búsqueda blanco como acción primaria.
- **Cards de propiedad**: media 4:3, tags (venta/alquiler/oportunidad), specs con
  íconos, hover elevate + zoom de imagen. Sombras con offset+blur reales.
- **Servicios**: lista numerada con contorno (no icon-cards); hover desplaza el
  número con `transform` (sin animar layout).
- **Zonas**: mapa de contornos + chips por barrio.
- **Formularios**: focus con anillo celeste; estados de foco/hover/disabled.

## Assets

- `assets/img/logo.svg` — espiral recreada vectorialmente (reemplazar por el
  archivo oficial de M&M si se dispone de vector).
- `assets/img/props/*.svg` — placeholders ilustrados marcados "FOTO DEMO";
  reemplazar por fotos reales.

## Datos & no-fabricación

Propiedades, precios y contactos son **demo** y están marcados como tales
(ver `assets/js/data.js`, banners `.demo-note`, número de WhatsApp `WHATSAPP`
en `assets/js/app.js`). Nada ficticio se presenta como real.
