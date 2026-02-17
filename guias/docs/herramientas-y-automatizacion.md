# Herramientas de IA y Automatización para Redes Sociales

Guía unificada de herramientas, stack de bajo costo y automatización mínima para la creación de contenido, gestión y medición de redes (BilliCactus y Olumi).

> Última actualización: Febrero 2026

---

## Objetivo del stack

1) Planear rápido, 2) producir piezas bonitas, 3) programar sin estrés, 4) medir y aprender.

---

## 1. Gestión y Programación de Contenido

### Hookle - Recomendada para empezar
**Ideal para**: Emprendedores individuales que necesitan simplicidad y bajo costo.

| Característica | Detalle |
|----------------|---------|
| **Precio** | Gratis (básico) / $2.99/mes plan anual / $5.99/mes mensual |
| **Cuentas conectadas** | 3 (gratis) / 20 (premium) |
| **Posts con IA** | 5/mes (gratis) / 400/mes (premium) |
| **Plataformas** | Instagram, Facebook, TikTok, LinkedIn, Google Business |

**Por qué la recomendamos**: Opción muy económica con IA incluida. Perfecta para Olumi (empezando) y BilliCactus (optimizar tiempo).

---

### Buffer
**Ideal para**: Quienes necesitan flexibilidad. Precio: Gratis (3 canales) / $6–12 por canal. Extension de navegador muy útil.

---

### Later
**Ideal para**: Marcas visuales que priorizan Instagram. Preview del grid de Instagram. Desde $18.75/mes.

---

### Predis.ai - La más completa con IA
**Ideal para**: Automatización máxima. Genera posts completos (imagen + caption + hashtags). Desde $19/mes.

---

## 2. Creación de Contenido Visual

### Canva con Magic Studio - Indispensable
- **Magic Design**: diseños completos desde un prompt
- **Magic Write**: textos para posts y captions
- **Magic Edit / Magic Switch / Background Remover** (Pro)
- Para BilliCactus: mockups de productos, antes/después. Para Olumi: coherencia visual y mood boards.

### Adobe Firefly
Generación de imágenes libres de derechos. Uso: fondos, texturas, elementos complementarios.

---

## 3. Generación de Videos y Reels

### CapCut - Gratis y poderoso
Subtítulos automáticos, eliminación de fondo, plantillas trending. Primera opción para Reels.

### Revid.ai / InVideo AI / OpusClip
Para texto-a-video, tutoriales o reutilizar contenido largo en clips. Opcionales según presupuesto.

---

## 4. Copywriting y Captions

### Gemini (Gema Personalizada) - Primera opción
Gratis. Con una Gema especializada (ver `gema-gemini.md`) no hay que explicar contexto cada vez.

### ChatGPT / Copy.ai
Brainstorming y variaciones; copies para anuncios pagos.

---

## 5. Automatización de Mensajes

### ManyChat - Esencial para BilliCactus
Gratis hasta 1,000 contactos. Instagram DM, WhatsApp. Respuestas automáticas a palabras clave, envío de catálogo, captura de datos. Para BilliCactus: automatizar proceso de pedidos (precio, info, catálogo).

---

## 6. Análisis y Optimización

- **Instagram Insights (nativo)**: Alcance, engagement, demografía, horarios.
- **Metricool**: Alternativa económica con prueba gratuita.
- **Sprout Social**: Solo para etapas más avanzadas.

---

## Recomendación base (costo 0)

- **Organización**: Google Drive + Google Sheets (ver `metricas-y-sheets.md`).
- **Diseño**: Canva Free.
- **Video**: CapCut Free.
- **Programación**: Meta Business Suite (IG/FB).

## Si cabe en presupuesto (0–40 USD/mes)

- **Canva Pro**: Brand Kit, redimensionar, más recursos. Coherencia visual y velocidad.
- **Metricool**: Analítica + planificación; mejora el aprendizaje y el calendario.

> Con 0–40 USD, normalmente conviene **Canva Pro** primero. Metricool después si el cuello de botella es medición.

---

## Automatizaciones mínimas (sin Make/Zapier)

### Sistema de archivos en Drive
- `[Marca]/02_assets_canva/` (links a diseños)
- `[Marca]/03_assets_export/` (exports listos)
- `[Marca]/04_videos_capcut/`
- `[Marca]/Sheets/` (Catálogo / Calendario / Métricas)

### Naming estándar para assets
- `olumi_YYYYMMDD_reel_tema_v1` / `olumi_YYYYMMDD_carousel_tema_v1` / `olumi_YYYYMMDD_story_tema_v1`
- Para BilliCactus: `billicactus_YYYYMMDD_formato_tema_v1`

### Plantillas reutilizables
- 1 plantilla carrusel (márgenes, tipografía, paleta)
- 1 plantilla portada reel
- 3 plantillas story (interacción, educación, venta suave)

---

## Automatización opcional (cuando ya haya consistencia)

Solo cuando el sistema manual esté estable 3–4 semanas.

- **Make / Zapier**: Trigger = nueva fila en Calendario con estado "listo". Acción: crear tarea, copiar link de asset, enviar recordatorio (WhatsApp/Email).

---

## Comparativa de costos

| Paquete | Herramientas | Costo/mes |
|--------|---------------|-----------|
| Mínimo | Hookle free, Canva free, CapCut, Gemini, ManyChat free, Insights | $0 |
| Intermedio | Hookle Premium, Canva Pro, ManyChat Pro | ~$28 |
| Avanzado | Predis.ai, Canva Pro, Revid.ai, ManyChat Pro | ~$83 |

---

## Riesgos y mitigaciones

- **Look genérico**: Priorizar fotos reales del producto + overlays de texto cortos.
- **Sobrecarga**: Mantener output semanal base; no perseguir volumen.
- **Datos inventados**: Usar placeholders en copies hasta tener catálogo completo.

---

## Flujo de trabajo semanal recomendado

- **Domingo**: Planificación con Gema, calendario en Hookle/Buffer.
- **Lunes–Martes**: Canva + CapCut + captions con Gema.
- **Miércoles**: Programar semana, historias interactivas.
- **Jueves–Sábado**: Engagement, comentarios, DMs, historias espontáneas.
- **Domingo**: Revisar Insights, anotar aprendizajes, ajustar estrategia.
