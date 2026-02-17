# Guías y documentos de referencia

Esta carpeta contiene la documentación unificada de estrategia, IA, herramientas y ejemplos para la gestión de redes de BilliCactus y Olumi. La app los expone en la sección **Guías** bajo "Documentos de referencia".

## Estructura

- **`index.json`** — Índice para la UI. Define los documentos (`docs`) y ejemplos (`ejemplos`) que se listan en la página. No editar a mano sin actualizar la app si cambias el formato.
- **`docs/`** — Documentos unificados por tema:
  - `estrategia-billicactus.md`, `estrategia-olumi.md`
  - `gema-gemini.md`, `herramientas-y-automatizacion.md`, `workflow-semanal.md`
  - `mejores-practicas-ia.md`, `recursos-y-referencias.md`, `metricas-y-sheets.md`
- **`ejemplos/`** — Ejemplos listos para usar:
  - Calendarios: `calendario-billicactus-mes1.md`, `calendario-olumi-mes1.md`
  - Captions: `captions-billicactus.md`, `captions-olumi.md`
  - Flujos: `flujo-lifestyle.md`, `flujo-personalizado.md`

## Cómo se usa el índice

La app hace `fetch('guias/index.json')` y genera tarjetas por cada ítem en `docs` y `ejemplos`. Cada ítem debe tener:

- **docs:** `id`, `title`, `type` (estrategia, ia, herramientas, workflow, practicas, recursos, metricas), `file` (ruta relativa a `guias/`).
- **ejemplos:** `id`, `title`, `file`.

Al hacer clic en una tarjeta, se carga el `.md` indicado en `file`, se convierte a HTML con [marked](https://marked.js.org/) y se muestra en el mismo visor de detalle que las guías inline.

## Convenciones

- Los archivos son Markdown (`.md`). Se muestran con estilos de `.guide-content` en la app.
- Para añadir un documento nuevo: crear el `.md` en `docs/` o `ejemplos/` y añadir la entrada correspondiente en `index.json` (array `docs` o `ejemplos`).
