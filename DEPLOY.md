# Cómo publicar el sitio (Inversiones Generales M&M)

El sitio es estático (HTML/CSS/JS). Se publica en cualquier hosting estático.
Recomendado: **Netlify** (plan gratuito).

---

## Opción A — Netlify conectado a GitHub (recomendado, se actualiza solo)

1. Entrá a https://netlify.com y creá una cuenta (podés usar "Sign up with GitHub").
2. **Add new site → Import an existing project → Deploy with GitHub**.
3. Autorizá y elegí el repositorio **AguCami/M-M**.
4. Configuración del deploy:
   - **Branch to deploy:** `claude/vercel-labs-skills-rlqm65` (o `main` si ya lo fusionaste).
   - **Build command:** *(vacío)*
   - **Publish directory:** `.` (la raíz)
   - (El archivo `netlify.toml` del repo ya deja esto configurado.)
5. **Deploy site**. En ~1 minuto te da una URL tipo `https://algo-random.netlify.app`.
6. Abrí esa URL: el sitio se ve **igual que la preview**. Cada vez que se actualice el
   repo, Netlify vuelve a publicar solo.

### Rápido sin GitHub (solo para probar)
Descargá el repo como ZIP, descomprimilo, entrá a https://app.netlify.com/drop
y arrastrá la carpeta. Te da una URL al instante. (No se auto-actualiza.)

---

## Conectar tu dominio inversionesgeneralesmym.com

1. En Netlify: **Site configuration → Domain management → Add a domain** →
   escribí `inversionesgeneralesmym.com`.
2. Netlify te muestra los registros DNS a cargar. Tenés que ponerlos **donde está
   registrado tu dominio** (probablemente Wix, o el registrador donde lo compraste):
   - Registro **A** de `inversionesgeneralesmym.com` → apuntar a la IP que indique Netlify
     (hoy suele ser `75.2.60.5`).
   - Registro **CNAME** de `www` → `TU-SITIO.netlify.app`.
3. Esperá la propagación (de minutos a unas horas). Netlify activa **HTTPS gratis**
   automáticamente.

> Nota: si el dominio está registrado en Wix, entrá al panel de dominios de Wix y
> editá los registros DNS ahí. El dominio puede seguir siendo tuyo aunque el sitio
> ya no esté hecho en Wix. Si preferís, se puede transferir el dominio a otro
> registrador, pero no es necesario.

---

## ¿Y Wix?

- Una vez publicado en Netlify y con el dominio apuntando ahí, **ya no necesitás el
  plan pago de Wix** para este sitio (podés dar de baja la suscripción y ahorrarte
  el costo). El dominio se conserva.
- Si en cambio querés **quedarte en Wix**, hay que rebuildear el diseño con los
  elementos del editor de Wix (menos fiel) — pedímelo y te preparo la guía sección
  por sección.

---

## Alternativas equivalentes a Netlify
- **Vercel** (https://vercel.com) — mismo flujo, "Import Git Repository".
- **Cloudflare Pages** — también gratis.
- **GitHub Pages** — gratis; activá Pages en la config del repo (branch + `/root`).
