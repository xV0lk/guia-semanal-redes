# Flujo de Automatizacion: Olumi - Contenido de Estilo de Vida

Este documento describe los flujos de trabajo automatizados con IA
para la gestion de contenido de Olumi, una marca de productos con disenos
inspirados en la naturaleza.

---

## Flujo 1: Lanzamiento de Nueva Coleccion

### Contexto
Olumi trabaja con colecciones (no productos individuales personalizados).
Cada lanzamiento es una oportunidad de campaña completa.

### Solucion: Planificacion completa con IA

```
FASE TEASER (1 semana antes):
    │
    ▼
GEMA GEMINI: Generar contenido de expectativa
    Prompt: "Vamos a lanzar una nueva coleccion de [tipo de producto]
    con disenos de [tema]. Genera contenido teaser para 5 dias:
    - Dia 1: Pista sutil (color o textura)
    - Dia 2: Detalle del diseno
    - Dia 3: Silueta del producto
    - Dia 4: Reveal parcial
    - Dia 5: Lanzamiento completo"
    │
    ▼
CANVA: Crear assets visuales para cada dia
    → Usar paleta de colores de la coleccion
    → Mantener estetica coherente Olumi
    │
    ▼
CAPCUT: Crear Reel de reveal
    → Transicion de teaser a producto completo
    → Musica que transmita la energia de la coleccion
    │
    ▼
HOOKLE: Programar toda la campaña
    → Posts teaser a las 7:30am (genera curiosidad durante el dia)
    → Reveal final a las 19:00 (maxima audiencia)
    │
    ▼
HISTORIAS: Cuenta regresiva nativa de Instagram
    → Sticker de cuenta regresiva "Nueva coleccion en X dias"
    → Encuestas: "Que crees que viene?"

FASE LANZAMIENTO (dia del reveal):
    │
    ▼
POST PRINCIPAL: Carrusel con todos los productos de la coleccion
REEL: Video mostrando los productos en contexto lifestyle
HISTORIAS: Swipe-up o link directo para comprar
    │
    ▼
MANYCHAT: Respuesta automatica a comentarios
    "Ya disponible! Envios a todo Colombia 📦
     Escribe QUIERO para recibir el catalogo completo"

FASE POST-LANZAMIENTO (1 semana despues):
    │
    ▼
CONTENIDO UGC: Repostear clientes usando los productos
REELS LIFESTYLE: Videos de uso en playa, yoga, dia a dia
TESTIMONIOS: Posts con feedback de primeros compradores
```

---

## Flujo 2: Contenido Lifestyle Semanal

### Problema
Olumi necesita contenido constante que no siempre sea de producto,
sino que conecte con el estilo de vida de su audiencia.

### Solucion: Pilares de contenido con generacion IA

```
PILARES DE CONTENIDO OLUMI:
    │
    ├── BIENESTAR (20%): Yoga, meditacion, autocuidado
    ├── NATURALEZA (20%): Plantas, paisajes, sostenibilidad
    ├── PRODUCTO (30%): Colecciones, lookbook, formas de usar
    ├── INSPIRACION (15%): Frases, motivacion, energia positiva
    └── COMUNIDAD (15%): Clientes, detras de escenas, la creadora

FLUJO SEMANAL:
    │
    ▼
DOMINGO - Planificacion:
    GEMA GEMINI:
    "Genera un calendario de contenido para esta semana para Olumi.
     Mix de pilares: 2 posts de producto, 1 bienestar, 1 naturaleza,
     1 inspiracion. Incluye 2 Reels. Tema de la semana: [tema]"
    │
    ▼
LUNES - Creacion visual:
    CANVA: Disenar posts de la semana usando plantillas Olumi
    → Mantener paleta de colores vibrante
    → Fotos de productos con fondos naturales
    → Tipografia consistente
    │
    ▼
MARTES - Contenido de video:
    CAPCUT: Editar Reels de la semana
    → Reel de producto: mostrar texturas, colores, usos
    → Reel lifestyle: producto en contexto (playa, parque, yoga)
    │
    ▼
MIERCOLES - Programacion:
    HOOKLE: Programar toda la semana
    → Posts en horarios optimos
    → Dejar espacio para contenido espontaneo
    │
    ▼
JUEVES a DOMINGO - Engagement:
    → Historias diarias espontaneas
    → Responder todos los comentarios
    → Interactuar con cuentas afines
```

---

## Flujo 3: Reels de Producto en Contexto

### Problema
Las fotos de producto son bonitas pero los Reels generan 3x mas alcance.

### Solucion: Formato de Reel estandar para Olumi

```
GRABACION: Sesion de fotos/video con productos
    → En exteriores: playa, parque, terraza con plantas
    → Modelo usando el producto naturalmente
    → Detalles close-up de texturas y colores
    │
    ▼
CAPCUT: Editar con plantilla Olumi
    │
    ▼
ESTRUCTURA DEL REEL:

    | Segundo | Visual                         | Texto              |
    |---------|--------------------------------|--------------------|
    | 0-2s    | Hook: close-up de textura      | "Diseno que fluye" |
    | 2-5s    | Modelo desplegando producto    | Nombre coleccion   |
    | 5-12s   | Montaje: producto en contexto  | (musica vibrante)  |
    | 12-18s  | Detalles: estampado, colores   | "Inspirado en..."  |
    | 18-25s  | Estilo de vida: uso real       | "Hecho para ti"    |
    | 25-30s  | Producto completo + logo       | "Link en bio"      |

    Audio: Musica relajante/alegre tipo indie, bossa nova o tropical
    │
    ▼
GEMA GEMINI: Caption optimizado
    Prompt: "Escribe un caption vibrante para Olumi sobre
    [producto] de la coleccion [nombre]. Transmite energia
    de naturaleza, libertad y bienestar."
    │
    ▼
PUBLICAR: Instagram Reel
    → Compartir en historias con encuesta
    → Repostear en Facebook si aplica
```

---

## Flujo 4: Contenido de Bienestar (No-Producto)

### Contexto
La audiencia de Olumi se conecta con bienestar, yoga, naturaleza.
Publicar SOLO productos aleja a los seguidores. El contenido de valor
construye comunidad.

### Solucion: Contenido de valor generado con IA

```
GEMA GEMINI: Generar contenido de bienestar
    │
    ▼
OPCIONES DE CONTENIDO:

    A) CARRUSEL EDUCATIVO:
       Prompt: "Crea un carrusel de 5 slides sobre [tema de bienestar].
       Slide 1: Hook visual. Slides 2-4: Contenido de valor.
       Slide 5: CTA suave (sin venta directa)."
       Temas: "5 posturas de yoga para principiantes",
              "3 habitos de manana para energia positiva",
              "Como crear tu ritual de autocuidado"
       │
       → CANVA: Disenar con estetica Olumi
       → Colores vibrantes, ilustraciones naturales

    B) POST INSPIRACIONAL:
       Prompt: "Escribe una frase inspiracional sobre [naturaleza/
       bienestar/fluir] con el tono magico y vibrante de Olumi."
       │
       → CANVA: Frase sobre fondo con diseño Olumi

    C) REEL CORTO:
       Idea: Momentos de calma con productos Olumi de fondo
       → Taza de te + manta Olumi
       → Lectura en parque con tote bag Olumi
       → Meditacion con toalla Olumi
       Audio: Sonidos de naturaleza o musica ambient
```

---

## Flujo 5: Estrategia de Crecimiento (0 a 500 seguidores)

### Contexto
Olumi tiene 44 seguidores. Necesita una estrategia agresiva pero
organica para construir comunidad inicial.

### Plan de Crecimiento 90 Dias

```
MES 1 - FUNDAMENTOS (Meta: 150 seguidores):
    │
    ├── Publicar 5 veces por semana (minimo)
    ├── 3 Reels por semana (algoritmo favorece Reels para nuevas cuentas)
    ├── Historias diarias con stickers interactivos
    ├── Seguir y interactuar con 20 cuentas/dia del nicho:
    │   → Tiendas de productos naturales
    │   → Cuentas de yoga y bienestar
    │   → Emprendedoras creativas
    │   → Cuentas de diseño y arte
    ├── Comentar genuinamente en 15 publicaciones/dia del nicho
    └── Usar 20-25 hashtags mixtos por post

MES 2 - EXPANSION (Meta: 300 seguidores):
    │
    ├── Mantener frecuencia de publicacion
    ├── Iniciar colaboraciones:
    │   → Sorteo conjunto con marca complementaria
    │   → Intercambio de historias con emprendedoras locales
    │   → Collab posts (publicacion compartida)
    ├── Primer Reel "detras de escenas" de la creadora
    ├── Live corto (15-20 min) mostrando productos
    └── Contenido UGC: pedir a amigos/familia que creen contenido

MES 3 - CONSOLIDACION (Meta: 500 seguidores):
    │
    ├── Analizar que tipo de contenido funciono mejor
    ├── Duplicar esfuerzo en formato ganador
    ├── Primer sorteo propio
    ├── Crear highlight de "Colecciones" organizado
    ├── Optimizar bio y link in bio
    └── Evaluar si invertir en primer anuncio pago ($10-20)
```

### Hashtags Estrategicos para Olumi

```
AMPLIOS (competencia alta, alcance alto):
#emprendimiento #hechoencolombia #diseñocolombiano #tiendaonline
#regalosoriginales #compralocal

NICHO (competencia media, audiencia cualificada):
#diseñosnaturales #productosartesanales #toalladeplaya
#totebagpersonalizado #estilodevidanatural #yogalife
#bienestarfemenino #naturalezaentudia

BRANDED (unicos de la marca):
#Olumi #OlumiTienda #DisenosConAlma #MagiaEnCadaCreacion
#HechosParaFluir #InspiradosEnLaNaturaleza

LOCALES:
#emprendimientocolombia #compracolombia #enviosatodocolombia
#mujereemprendedora #negociolocal
```

---

## Flujo 6: Contenido Generado por Usuarios (UGC)

### Solucion: Incentivar y reutilizar contenido de clientes

```
INCENTIVAR:
    → En cada envio incluir tarjeta: "Compartenos tu foto
      con #Olumi y te reposteamos 💚"
    → Historia semanal: "Tag nos en tu foto y aparece aqui"
    → Sorteo mensual: "Entre quienes nos taguen sorteamos [premio]"
    │
    ▼
RECOPILAR:
    → Buscar #Olumi y #OlumiTienda diariamente
    → Guardar fotos de clientes (con permiso)
    │
    ▼
REPOSTEAR:
    → Crear template de repost en Canva
    → Agregar marco Olumi + agradecimiento
    → Compartir en historias y feed
    │
    ▼
GEMA GEMINI: Caption de agradecimiento
    Prompt: "Un cliente compartio una foto usando
    nuestro [producto]. Escribe un caption de agradecimiento
    que sea calido y invite a otros a compartir tambien."
```

---

## Metricas a Seguir (Olumi - Etapa Crecimiento)

| Metrica | Meta mensual | Por que importa |
|---------|-------------|-----------------|
| Nuevos seguidores | +50-100/mes | Crecimiento de comunidad |
| Alcance por Reel | >500 cuentas | Los Reels expanden alcance |
| Engagement rate | >5% | Cuentas pequenas deben ser >5% |
| Guardados | >3% del alcance | Indica contenido de valor |
| Compartidos | >2% del alcance | Expande alcance organico |
| Visitas al perfil | >100/semana | Indica interes en la marca |
| Clicks en link | >10/semana | Trafico a compra |

---

## Checklist Semanal Olumi

```
[ ] Publicar minimo 5 posts en feed
[ ] Publicar minimo 3 Reels
[ ] Historias diarias (minimo 2-3 por dia)
[ ] 2 contenidos de producto
[ ] 1 contenido de bienestar/naturaleza
[ ] 1 contenido inspiracional
[ ] 1 contenido de engagement (encuesta, pregunta)
[ ] Interactuar con 20 cuentas del nicho DIARIAMENTE
[ ] Comentar en 15 publicaciones del nicho DIARIAMENTE
[ ] Responder TODOS los comentarios y DMs en <30 min
[ ] Revisar metricas y anotar aprendizajes
```
