# Guía Semanal Redes — BilliCactus & Olumi

Guía práctica de seguimiento semanal para la gestión de redes sociales de BilliCactus y Olumi. Aplicación web (PWA) con tareas checkeables, guías de referencia, tips de IA y gamificación.

## Acceso

**URL:** `https://[usuario].github.io/guia-semanal-redes/`

### Instalar en iPad / iPhone

1. Abre la URL en Safari.
2. Toca el botón de compartir.
3. Elige "Añadir a pantalla de inicio".
4. La app aparece como ícono en el escritorio.

### Instalar en Android

1. Abre la URL en Chrome.
2. Menú > "Instalar app" o "Añadir a pantalla de inicio".

## Secciones

- **Tareas semanales** — Checklist por día (Domingo a Sábado).
- **Guías** — Referencia detallada: Captions, Reels, Calendario, Historias, Carruseles, Prompts, Métricas.
- **Tips IA** — Mejores prácticas y ejemplos de prompts para la Gema de Gemini.
- **Rutina diaria** — Engagement diario con racha y logros.
- **Motivación** — Tips para mantener la constancia.

## Estructura del proyecto

```
guia-semanal-redes/
├── index.html          # App principal
├── styles.css          # Estilos (iPad-first, responsive)
├── app.js              # Lógica, localStorage, gamificación
├── manifest.json       # Configuración PWA
├── sw.js               # Service worker (uso offline)
├── guias/              # Guías generadas por IA (futuro)
│   ├── index.json      # Índice de guías disponibles
│   ├── README.md       # Convenciones y estructura
│   └── generadas/      # Archivos de guías (.md / .html)
└── assets/             # Imágenes, íconos
```

## Persistencia

Los datos se guardan en `localStorage` del navegador:
- Estado de checkboxes por semana
- Racha de días con rutina diaria
- Logros desbloqueados
- Preferencia de tema (claro / oscuro)

## Guías generadas por IA (futuro)

La carpeta `guias/` está preparada para almacenar contenido generado con la Gema de Gemini. Ver `guias/README.md` para convenciones de nombres y cómo agregar nuevas guías.

## GitHub Pages

Este repo está configurado para servirse con GitHub Pages desde la rama `main`, carpeta raíz (`/`).
