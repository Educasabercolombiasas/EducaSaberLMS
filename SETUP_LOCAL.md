# Setup local — EducaSaber LMS

El sistema usa **PostgreSQL (Supabase)** en local y en producción. No uses SQLite.

## Requisitos

- Node.js 18 o superior
- Acceso al proyecto de Supabase (o un Postgres propio)
- Git

**No ejecutes** `node setup-local.js`. Ese script copia un esquema SQLite y rompe el proyecto actual.

## Pasos

1. Copia `env.example` a `.env.local`.
2. Completa al menos:

```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="una-cadena-larga-y-secreta"
NEXTAUTH_URL="http://localhost:3000"
```

`DATABASE_URL` es la URI de Postgres de Supabase (la misma que usa Vercel, o una copia de desarrollo).

3. Instala e inicia:

```bash
npm install
npx prisma generate
npm run dev
```

La app queda en `http://localhost:3000`.

## Comandos útiles

```bash
npm run dev
npx prisma generate
npx prisma studio
```

Si aparece “Prisma Client not found”:

```bash
npx prisma generate
```

Si el puerto 3000 está ocupado, cierra el otro `next dev` o usa otro puerto.

## Producción

El sitio público se publica desde Vercel, proyecto `educa-saber-colombia`, con el mismo tipo de variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` apuntando al dominio real).
