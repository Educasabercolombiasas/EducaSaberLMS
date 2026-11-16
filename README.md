# EducaSaber LMS

Plataforma de preparación ICFES: cursos, lecciones, simulacros, resultados y seguimiento por colegio.

Sitio: [https://educasabercolombia.com.co/](https://educasabercolombia.com.co/)

## Roles

- **Estudiante** — estudia lecciones, presenta exámenes y ve su progreso.
- **Administrador de colegio** (`school_admin`) — ve su institución, crea y edita sus estudiantes, puede armar cursos y exámenes de su colegio.
- **Administrador de plataforma** (`teacher_admin`) — crea el contenido, los colegios y a los demás administradores.

El admin de plataforma crea otros admins en **Usuarios → Administradores**. Al admin de colegio hay que asignarle un colegio. El admin de colegio no puede crear otros admins.

## Cuentas del proyecto

| Servicio | Para qué |
| --- | --- |
| GitHub | Código (`EducaSaberLMS`) |
| Vercel | Hosting. El proyecto que sirve el dominio es `educa-saber-colombia` |
| Supabase | Base de datos PostgreSQL |

No subas `.env` ni `.env.local`.

## Documentación

- `INSTRUCTIVO_ADMINISTRADORES.md` — cómo usar el panel.
- `GUIA_LLENADO_PLATAFORMA.md` — orden para cargar contenido.
- `SETUP_LOCAL.md` — cómo correr el proyecto en un computador.
- `EXPLICACION_EXAMENES.md` — tipos de examen.
- `GUIA_DEPLOY_VERCEL.md` — publicación.

## Desarrollo local

Hace falta Node.js 18 o superior y un `DATABASE_URL` de PostgreSQL (el de Supabase). No uses SQLite ni `node setup-local.js`: ese script pisa el esquema.

1. Copia `env.example` a `.env.local`.
2. Pon `DATABASE_URL` (URI de Supabase), `NEXTAUTH_SECRET` y `NEXTAUTH_URL=http://localhost:3000`.
3. Instala e inicia:

```bash
npm install
npx prisma generate
npm run dev
```

Abre `http://localhost:3000`.
