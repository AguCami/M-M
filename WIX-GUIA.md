# Guía para rebuildear el diseño "Cauce" en Wix

Objetivo: recrear el sitio de Inversiones Generales M&M en tu Wix de pago,
lo más fiel posible con elementos nativos + algunos recuadros HTML para los
detalles especiales (contornos animados / botones glass).

> Sirve para el **Editor de Wix** clásico y para **Wix Studio** (los nombres de
> menús cambian un poco; te aviso las diferencias donde importa).

---

## 0) Preparativos (una vez)

1. **Subí el logo**: Wix → *Medios* → subí `assets/img/logo.png` (el de fondo
   transparente que ya tenés en el repo).
2. **Fuentes**:
   - **Títulos:** *Archivo* (está en la librería de Wix). Pesos 700–800.
   - **Textos:** *Hanken Grotesk*. Si no aparece en Wix, subila como fuente
     propia (*Configuración → Subir fuentes*, requiere plan pago — que ya tenés),
     o usá una alternativa cercana: **Rubik**, **DM Sans** o **Libre Franklin**.
3. **Paleta de marca** (*Editor → Diseño del sitio → Colores → Editar paleta*):

   | Rol | HEX |
   |---|---|
   | Celeste de marca | `#2F9BE0` |
   | Celeste oscuro (hover/links) | `#1D82C6` |
   | Azul marino (fondos oscuros) | `#0B2237` |
   | Marino medio | `#17466C` |
   | Tinta (texto sobre claro) | `#0C2338` |
   | Texto secundario | `#4A657D` |
   | Fondo claro | `#F4F7FA` |
   | Blanco | `#FFFFFF` |
   | Acento cálido ("Oportunidad") | `#E0A93F` |

4. **Escala de texto** (aprox., para mantener jerarquía):
   - H1 hero: 56 px (desktop) / 34 px (mobile), peso 800, interletrado ceñido.
   - H2 secciones: 40 px / 26 px, peso 700–800.
   - H3: 22 px. Cuerpo: 17–18 px, interlineado 1.6. Etiquetas: 13 px mayúsculas.

---

## 1) Encabezado (barra superior)

- **Logo** (imagen `logo.png`) a la izquierda + texto "Inversiones M&M" /
  "AGENTES INMOBILIARIOS" (subtítulo en mayúsculas, gris, 11 px).
- **Menú** con: Propiedades · Servicios · Zonas · Nosotros · Contacto.
- Botón **"Tasá tu propiedad"** (estilo borde) + botón **WhatsApp** (verde).
- Header fijo al hacer scroll: *Configuración del encabezado → Se congela al
  desplazarse*.
- Fondo del header: `#F4F7FA` con leve transparencia si tu plantilla lo permite.

---

## 2) Home — secciones (de arriba a abajo)

Cada bloque es una **Sección/Strip** en Wix.

### 2.1 Hero
- Strip con **fondo azul marino** (`#0B2237`) o degradado a `#14395B`.
- Título: **"Encontrá dónde *invertir* y dónde vivir."** ("invertir" en celeste).
- Subtítulo (texto claro): la bajada del negocio.
- **Buscador**: una caja blanca con 3 desplegables (Operación / Tipo / Zona) +
  botón "Buscar". En Wix se arma con **inputs de un Dataset** (ver sección 3) o,
  si no querés lógica, 3 *Dropdowns* + botón que lleva a la página Propiedades.
- *(Opcional)* **Contornos animados**: agregá un elemento **Insertar → HTML**
  ocupando el fondo del strip y pegá el snippet del final de esta guía.

### 2.2 Accesos por tipo (4 tarjetas)
- 4 columnas: **Casas · Departamentos · Lotes · Campos**, cada una enlaza a
  Propiedades filtrado por ese tipo.

### 2.3 Propiedades destacadas
- **Repeater** conectado a la colección `Propiedades` (sección 3), filtrando
  `destacado = verdadero`, máximo 6.
- Cada tarjeta: imagen, etiqueta (Venta/Alquiler/Oportunidad), precio, título,
  zona, y specs (dorm/baños/m²).
- Botón "Ver todas las propiedades" → página Propiedades.

### 2.4 Servicios (Compra · Venta · Tasación · Administración)
- Lista numerada 01–04 con título + descripción (no tarjetas con ícono).

### 2.5 Zonas de Córdoba
- Bloque con lista de barrios (Nueva Córdoba, Cerro de las Rosas, Güemes, Villa
  Allende, Valle Escondido, Mendiolaza…) que enlazan a Propiedades por zona.

### 2.6 Proceso (fondo oscuro)
- 4 pasos: Charlamos · Seleccionamos · Visitamos · Cerramos.

### 2.7 Nosotros / Por qué M&M
- Texto + 3 valores (Conocimiento local · Transparencia · Acompañamiento) +
  una imagen a la derecha.

### 2.8 Contacto (fondo oscuro)
- Izquierda: métodos (WhatsApp, Teléfono, Email, Instagram) — datos reales.
- Derecha: **Wix Forms** (Nombre, Teléfono/WhatsApp, Interés, Mensaje) que te
  llegue por email/CRM.

### 2.9 Pie de página
- Logo (sobre círculo blanco), columnas (Propiedades / Servicios / Contacto),
  redes, y línea legal © Inversiones Generales M&M · Córdoba.

---

## 3) Catálogo de propiedades con el CMS de Wix (lo más importante)

Esto te da un **panel para cargar propiedades** sin tocar código.

### 3.1 Crear la colección
*Wix → CMS (Content Manager) → Crear colección* → nombre **`Propiedades`**.
Campos (tipo entre paréntesis):

| Campo | Tipo |
|---|---|
| `titulo` | Texto |
| `tipo` | Texto (valores: casa, departamento, lote, campo) |
| `operacion` | Texto (venta / alquiler) |
| `zona` | Texto |
| `precio` | Número |
| `moneda` | Texto (USD / ARS) |
| `dormitorios` | Número |
| `banos` | Número |
| `superficie` | Número (m²) |
| `cochera` | Número |
| `destacado` | Sí/No (Boolean) |
| `oportunidad` | Sí/No (Boolean) |
| `descripcion` | Texto enriquecido |
| `imagenPrincipal` | Imagen |
| `galeria` | Galería de medios |
| `amenities` | Texto (o Etiquetas) |

Cargá 3–4 propiedades de ejemplo para ir probando.

### 3.2 Página "Propiedades" (listado con filtros)
1. Agregá un **Dataset** en modo *Lectura* conectado a `Propiedades`.
2. Poné un **Repeater** y conectá cada elemento (imagen → `imagenPrincipal`,
   título → `titulo`, precio → `precio`, etc.).
3. **Filtros**: agregá 3 *Dropdowns* (Operación, Tipo, Zona) y en cada uno
   *Conectar a datos → Filtrar el dataset* por el campo correspondiente. Sumá un
   *Dropdown* de orden (precio asc/desc).
4. Contador de resultados: texto conectado al *número de ítems* del dataset.

### 3.3 Ficha de propiedad (página dinámica)
1. En la colección → *Añadir página dinámica de artículo*. Wix crea
   `/propiedades/{titulo}` automáticamente.
2. Diseñá la ficha: galería (`galeria`), título, ubicación, specs
   (dormitorios/baños/m²/cochera), descripción, características (`amenities`) y
   un panel lateral con precio + botón **"Consultar por WhatsApp"**.
3. El botón de WhatsApp: enlace
   `https://wa.me/54TUNUMERO?text=Hola%20M%26M%2C%20me%20interesa%20{titulo}`.

---

## 4) Botón de WhatsApp

- Reemplazá `54TUNUMERO` por tu número real (con código de país, sin +, sin 0
  y sin 15). Ej: `5493510000000`.
- Podés usar la **app de Chat/WhatsApp de Wix** para un botón flotante, o un
  botón normal con el enlace `https://wa.me/54TUNUMERO?text=...`.

---

## 5) Detalles "Cauce" que van como recuadro HTML (opcional)

En Wix: *Agregar → Insertar → Insertar HTML → Código*. Pegá este snippet para
un **fondo de contornos animados** (por ejemplo detrás del hero o en una franja):

```html
<canvas id="c" style="width:100%;height:100%;display:block;background:#0B2237"></canvas>
<script>
(function(){
  var cv=document.getElementById('c'),x=cv.getContext('2d'),t=Math.random()*99;
  function rz(){cv.width=cv.clientWidth;cv.height=cv.clientHeight;}
  addEventListener('resize',rz);rz();
  (function loop(){
    t+=0.006;var w=cv.width,h=cv.height,cx=w*0.82,cy=h*0.15,gap=30;
    x.clearRect(0,0,w,h);
    var maxR=Math.hypot(Math.max(cx,w-cx),Math.max(cy,h-cy))+gap;
    for(var i=1;i*gap<maxR;i++){
      var base=i*gap;x.beginPath();
      for(var s=0;s<=90;s++){var a=s/90*6.283,
        r=base+Math.sin(a*3+t+base*0.02)*(7+i*1.2)+Math.sin(a*2-t)*(10+i*1.4);
        var px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r*0.94;
        s?x.lineTo(px,py):x.moveTo(px,py);}
      x.closePath();x.strokeStyle='rgba(47,155,224,'+(0.35*(1-base/maxR)+0.1)+')';
      x.lineWidth=1;x.stroke();
    }
    requestAnimationFrame(loop);
  })();
})();
</script>
```

> Los botones "liquid glass" y las animaciones al scrollear no se pueden replicar
> 1:1 en el editor de Wix. Si más adelante querés esos efectos completos, la vía
> es hosting externo (ver `DEPLOY.md`).

---

## 6) SEO y cierre
- Título de la home: "Inversiones Generales M&M · Inmobiliaria en Córdoba".
- Descripción, texto alternativo en imágenes, y URL amigables (Wix las crea).
- Conectá tu dominio (ya lo tenés en Wix) desde *Configuración → Dominios*.

---

## Checklist rápido
- [ ] Logo subido y colocado (header + footer + favicon).
- [ ] Paleta y fuentes cargadas en el tema.
- [ ] Colección `Propiedades` creada y con datos.
- [ ] Página Propiedades con Repeater + filtros.
- [ ] Página dinámica de ficha.
- [ ] Formulario de contacto + botón WhatsApp con tu número.
- [ ] Secciones del home armadas.
- [ ] Dominio conectado.
