# EducaSaber LMS

Plataforma de preparación ICFES: cursos, lecciones, simulacros, resultados y seguimiento por colegio.

Sitio en producción: [https://educasabercolombia.com.co/](https://educasabercolombia.com.co/)

## Roles

- **Estudiante** — estudia lecciones, presenta exámenes y ve su progreso.
- **Admin de colegio** (`school_admin`) — gestiona los estudiantes de su institución.
- **Admin de plataforma** (`teacher_admin`) — crea contenido, colegios, usuarios y carga masiva.

## Stack

Next.js (App Router), Prisma, PostgreSQL (Supabase), NextAuth, despliegue en Vercel (`educa-saber-colombia`).

## Desarrollo local

1. Copia `env.example` a `.env.local` y pon un `DATABASE_URL` de PostgreSQL (no SQLite).
2. Define `NEXTAUTH_SECRET` y `NEXTAUTH_URL=http://localhost:3000`.
3. Instala e inicia:

```bash
npm install
npx prisma generate
npm run dev
```

## Documentación útil

- `INSTRUCTIVO_ADMINISTRADORES.md` — cómo armar contenido.
- `GUIA_LLENADO_PLATAFORMA.md` — orden para cargar la plataforma.
- `SETUP_LOCAL.md` — notas de entorno local.
- `GUIA_DEPLOY_VERCEL.md` y `CHECKLIST_DEPLOY_VERCEL.md` — publicación.
- `EXPLICACION_EXAMENES.md` — tipos de examen.

No subas `.env` ni `.env.local`. El proyecto de Vercel que sirve el dominio real es `educa-saber-colombia`.
