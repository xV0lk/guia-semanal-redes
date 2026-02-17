# Flujo de Automatizacion: BilliCactus - Contenido Personalizado

Este documento describe los flujos de trabajo automatizados con IA
para la gestion de contenido de BilliCactus, una marca de regalos personalizados.

---

## Flujo 1: Atencion al Cliente Automatizada

### Problema
BilliCactus recibe muchos DMs y comentarios preguntando por precios, proceso y tiempos.
Responder manualmente consume horas cada dia.

### Solucion: ManyChat + WhatsApp

```
TRIGGER: Cliente comenta "precio", "info", "quiero uno" en cualquier post
    │
    ▼
MANYCHAT: Respuesta automatica en DM
    "Hola! Gracias por tu interes en BilliCactus 💝
     Te cuento como funciona:
     1. Nos envias la foto que quieres ilustrar
     2. Elegimos juntos el producto (cuadro, cojin, cobija, mug)
     3. Creamos tu ilustracion personalizada
     4. Lo enviamos a todo Colombia 📦
     
     Haz tu pedido aqui 👇
     wa.me/573176801751"
    │
    ▼
WHATSAPP: Conversacion personalizada para cerrar pedido
    │
    ▼
REGISTRO: Guardar datos del cliente para seguimiento
```

### Configuracion en ManyChat (paso a paso)

1. **Crear cuenta**: manychat.com → Conectar Instagram
2. **Automation** → **New Flow**
3. **Trigger**: Comment contains keywords → "precio", "info", "quiero", "cuanto", "como pido"
4. **Action**: Send DM with message template (texto de arriba)
5. **Action**: Tag contact as "Interesado"
6. Activar y monitorear respuestas

### Variaciones del mensaje automatico

**Para productos especificos**:
```
Cuando comentan en post de CUADROS:
"Los cuadros personalizados son perfectos para decorar tu espacio
con tus recuerdos mas bonitos 🎨
Precios desde $XX.XXX
Haz tu pedido: wa.me/573176801751"

Cuando comentan en post de COJINES:
"Imagina abrazar un cojin con la carita de tu mascota 🐾
Cojines personalizados desde $XX.XXX
Haz tu pedido: wa.me/573176801751"
```

---

## Flujo 2: Contenido Post-Entrega

### Problema
Cada producto terminado es contenido potencial, pero crear el post toma tiempo.

### Solucion: Foto del producto → IA genera todo el post

```
ARTISTA: Termina ilustracion y toma foto del producto
    │
    ▼
CANVA: Usa plantilla prediseñada de BilliCactus
    → Inserta foto del producto
    → Magic Edit ajusta iluminacion si es necesario
    → Genera variaciones (post cuadrado + historia vertical)
    │
    ▼
GEMA GEMINI: Genera caption
    Prompt: "Escribe un caption emotivo para BilliCactus.
    Es un [tipo de producto] con la ilustracion de [mascota/persona].
    El cliente lo pidio para [ocasion si se sabe]."
    │
    ▼
REVISION HUMANA: La artista revisa y ajusta el caption
    → Agrega detalles personales que la IA no sabe
    │
    ▼
HOOKLE/BUFFER: Programa publicacion
    → Post para feed en horario optimo
    → Historia con sticker de "nuevo pedido listo!"
    → Opcionalmente un reel corto del producto
```

### Plantilla de Canva sugerida para producto terminado

Elementos del template:
- Fondo: Color solido suave (beige/rosa pastel)
- Foto del producto: Centrada, con sombra suave
- Logo BilliCactus: Esquina inferior derecha
- Texto opcional: "Hecho con amor" o "Tu recuerdo, nuestra arte"
- Marco decorativo sutil

---

## Flujo 3: Proceso Creativo como Contenido (Reels)

### Problema
El proceso de creacion es fascinante pero no se documenta consistentemente.

### Solucion: Grabar proceso → CapCut IA → Reel automatico

```
GRABACION: Artista graba proceso en iPad (time-lapse)
    → Foto original del cliente
    → Proceso de ilustracion (30s-2min de time-lapse)
    → Producto final terminado
    │
    ▼
CAPCUT: Importar clips
    → Seleccionar plantilla "antes/despues" trending
    → IA genera subtitulos automaticamente
    → IA sugiere musica trending que encaje
    → Exportar en formato Reel (9:16, 1080p)
    │
    ▼
GEMA GEMINI: Genera caption del Reel
    Prompt: "Escribe un caption para un Reel de BilliCactus
    que muestra el proceso de crear una ilustracion de [mascota/persona].
    El reel muestra: foto original → proceso de dibujo → producto final.
    Quiero que genere emocion y ganas de pedir uno."
    │
    ▼
PUBLICAR: Instagram Reel con caption
    → Hashtags: #ProcesoCreativo #BilliCactus #RegaloPersonalizado
    → Compartir en historias con "Quieres uno asi? 💝"
```

### Estructura del Reel sugerida

| Tiempo | Visual | Texto en pantalla |
|--------|--------|-------------------|
| 0-2s | Foto original de la mascota/persona | "Nos enviaron esta foto..." |
| 2-5s | Pantalla del iPad comenzando | "Y la transformamos en arte 🎨" |
| 5-15s | Time-lapse del proceso de ilustracion | (musica trending) |
| 15-20s | Reveal del dibujo terminado | "Ta-daaa! ✨" |
| 20-25s | Producto final (cuadro/cojin montado) | "Listo para regalar 💝" |
| 25-30s | Logo + CTA | "Pide el tuyo 👉 link en bio" |

---

## Flujo 4: Testimonios de Clientes

### Problema
Los clientes envian fotos y mensajes bonitos pero no se aprovechan como contenido.

### Solucion: Recopilacion sistematica → Contenido automatizado

```
CLIENTE: Envia foto/mensaje de satisfaccion por WhatsApp
    │
    ▼
GUARDAR: Captura de pantalla del mensaje + foto del producto en uso
    → Carpeta organizada: /testimonios/[mes]/[nombre]
    │
    ▼
CANVA: Usar plantilla de "testimonio"
    → Foto del producto en uso
    → Cita del cliente (con permiso)
    → Estrellas o corazones decorativos
    │
    ▼
GEMA GEMINI: Genera caption basado en testimonio
    Prompt: "El cliente dijo: '[mensaje del cliente]'.
    Escribe un caption agradeciendo y mostrando el impacto
    emocional de nuestros productos."
    │
    ▼
PUBLICAR: Post o carrusel de testimonios semanales
    → "Lo que dicen nuestros clientes 💝"
```

---

## Flujo 5: Campanas por Fechas Especiales

### Solucion: Planificacion anticipada con IA

```
30 DIAS ANTES de fecha especial:
    │
    ▼
GEMA GEMINI: Generar campaña completa
    Prompt: "Se acerca [fecha]. Crea una campaña de 2 semanas
    para BilliCactus con:
    - 3 posts de expectativa
    - 2 reels
    - Historias diarias la semana previa
    - Oferta especial sugerida
    - Timeline de publicacion"
    │
    ▼
CANVA: Crear todos los assets visuales
    → Usar colores tematicos de la fecha
    → Cuenta regresiva visual
    │
    ▼
HOOKLE: Programar toda la campaña
    → Posts en horarios optimos
    → Historias con cuenta regresiva
    │
    ▼
MANYCHAT: Configurar respuestas tematicas
    → "Estamos en promocion por [fecha]! 🎉"
    │
    ▼
POST-CAMPAÑA: Analizar resultados
    → Gema Gemini: "Estos fueron los resultados... que aprendimos?"
```

---

## Metricas a Seguir

| Metrica | Meta mensual | Herramienta |
|---------|-------------|-------------|
| Nuevos seguidores | +100-200 | Instagram Insights |
| Engagement rate | >3% | Instagram Insights |
| Clicks en link de WhatsApp | +20% vs mes anterior | Bitly/Instagram |
| DMs recibidos | Tracking manual | Instagram |
| Pedidos desde Instagram | Tracking manual | WhatsApp |
| Guardados por post | >5% del alcance | Instagram Insights |
| Compartidos por post | >2% del alcance | Instagram Insights |

---

## Checklist Semanal BilliCactus

```
[ ] Revisar y responder TODOS los DMs y comentarios
[ ] Publicar minimo 4 posts en feed
[ ] Publicar minimo 2 Reels
[ ] Historias diarias (minimo 3 por dia)
[ ] 1 post de producto terminado
[ ] 1 post de proceso creativo
[ ] 1 post de testimonio/cliente satisfecho
[ ] 1 contenido de engagement (encuesta, pregunta)
[ ] Interactuar con 10 cuentas del nicho
[ ] Revisar metricas del contenido de la semana anterior
```
