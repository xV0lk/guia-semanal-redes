# Métricas y Sheets — Esquema recomendado (Olumi → BilliCactus)

Objetivo: tener un "sistema nervioso" simple para operar contenido, catálogo y métricas.

---

## Sheet 1: `Catalogo`

Columnas:

- `sku` (texto)
- `marca` (Olumi / BilliCactus)
- `producto` (toalla / pañoleta / tote / manta / cuadro / cojín / cobija / mug)
- `coleccion` (Olumi) / `tipoPersonalizacion` (BilliCactus)
- `descripcionCorta`
- `beneficio1`, `beneficio2`, `beneficio3`
- `materiales` (si aplica)
- `rangoPrecio` (o `precio` si es fijo)
- `disponibilidad` (sí / no / limitado)
- `tiempoProduccion` (si aplica)
- `envios` (texto breve o link a política)
- `linkFotos` (Drive / carpeta)

---

## Sheet 2: `Backlog_Ideas`

Columnas:

- `ideaId`
- `marca`
- `pilar`
- `tema`
- `angulo`
- `hook`
- `cta`
- `productoAsociado`
- `notas`
- `estado` (pendiente / en_produccion / publicado)

---

## Sheet 3: `Calendario`

Columnas:

- `fecha`
- `marca`
- `formato` (reel / carrusel / story)
- `pilar`
- `tema`
- `hook`
- `cta`
- `assetNombre` (naming estándar)
- `assetLink` (Drive / Canva / CapCut)
- `horaPublicacion`
- `objetivoMetrica` (alcance / guardados / DM / clics)
- `experimento` (variable + A/B)

---

## Sheet 4: `Assets_Tracker`

Columnas:

- `assetNombre`
- `marca`
- `formato`
- `tema`
- `version`
- `linkOrigen` (Canva / CapCut)
- `linkExport` (Drive)
- `estado` (borrador / listo / publicado)

---

## Sheet 5: `Metricas`

Columnas:

- `fecha`
- `marca`
- `formato`
- `tema`
- `horaPublicacion`
- `alcance`
- `guardados`
- `compartidos`
- `comentarios`
- `dmIniciados`
- `clicsLinkBio`
- `nota` (aprendizaje)
- `experimento` (sí / no + variable)

---

## Automatización mínima (sin pagar)

- **Naming estándar**: `marca_YYYYMMDD_formato_tema_v1`
- **Carpetas Drive**:
  - `01_catalogo_fotos/`
  - `02_assets_canva/`
  - `03_assets_export/`
  - `04_videos_capcut/`
  - `05_testimonios_permiso/` (BilliCactus)
