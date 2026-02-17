# Guías generadas por IA

Esta carpeta almacena guías de contenido generadas con la Gema de Gemini u otras herramientas de IA.

## Estructura

- `index.json` — Índice de guías disponibles. La app lo consulta para listar las guías.
- `generadas/` — Archivos individuales de cada guía (`.md` o `.html`).

## Convención de nombres

```
[tipo]-[marca]-[YYYYMM].[ext]
```

Ejemplos:
- `caption-olumi-202602.md`
- `calendario-billicactus-202603.md`
- `reel-olumi-202602.md`

## Tipos de guía

- `caption` — Captions generados para posts
- `calendario` — Calendario de contenido semanal o mensual
- `reel` — Guiones de Reels
- `historias` — Secuencias de Stories
- `ideas` — Ideas de contenido
- `metricas` — Análisis de métricas

## Cómo agregar una guía

1. Genera el contenido con la Gema de Gemini.
2. Guarda el resultado en `generadas/` con el nombre según la convención.
3. Agrega la entrada en `index.json`.
4. Haz commit y push para que esté disponible en la app.
