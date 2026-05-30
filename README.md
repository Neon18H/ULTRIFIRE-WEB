# UltriFire Web

Landing page corporativa premium para **UltriFire**, empresa colombiana de ciberseguridad. Construida con Next.js App Router, TypeScript, Tailwind CSS, Framer Motion y Lucide React.

## Stack

- Next.js 14 con App Router
- TypeScript estricto
- Tailwind CSS
- Framer Motion para scroll reveal, parallax y microinteracciones
- Lucide React para iconografía
- Fuentes Google: Space Grotesk e Inter mediante `next/font`
- Dockerfile optimizado para Railway con `next start` y puerto dinámico `$PORT`

## Instalación local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Scripts

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Arranque de producción respetando $PORT
npm run lint       # Revisión ESLint / Next.js
npm run typecheck  # TypeScript sin emitir archivos
```

## Despliegue en Railway

### Opción recomendada: Dockerfile

Railway detectará el `Dockerfile` y construirá la imagen automáticamente. El contenedor arranca con:

```bash
npm run start
```

Railway inyecta la variable `$PORT`, por lo que no se requiere configuración adicional.

### Opción build estándar de Next.js

Si prefieres usar Nixpacks, configura:

- Build command: `npm run build`
- Start command: `npm run start`

## Estructura

```txt
app/          Layout, metadatos SEO, estilos globales y página principal
components/   Secciones componentizadas de la landing
lib/          Utilidades compartidas
public/       Assets estáticos listos para agregar imágenes o favicons
```

## Contacto / formulario

El formulario usa actualmente `mailto:contacto@ultrifire.co` como integración placeholder. Está listo para conectarse posteriormente a un endpoint propio, CRM o automatización.
