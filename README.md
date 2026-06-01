# We-Paltel Front

React SPA admin dashboard for WeWiFi subscription management.

**Project rules & folder structure:** see [STRUCTURE.md](./STRUCTURE.md)

## Stack

- React 19 + TypeScript + **Vite**
- Tailwind CSS (custom theme tokens via CSS variables)
- React Router, TanStack Query, TanStack Table
- React Hook Form, Axios, date-fns, Recharts, Sonner

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=/api
VITE_SKIP_AUTH_CHECK=true
```

Set `VITE_SKIP_AUTH_CHECK=false` once Mohanad's backend is running on port 3000.

Vite exposes only variables prefixed with `VITE_`.  
Dev server proxies `/api` to `http://localhost:3000`.

## Folder structure

```
src/
├── app/              # App shell + router
├── pages/            # Route pages
├── components/
│   ├── layout/
│   ├── auth/
│   └── ui/           # Design system primitives
├── services/         # API layer (authService, ...)
├── hooks/            # TanStack Query hooks
├── lib/              # apiClient, permissions, cn
├── types/
├── providers/
├── styles/           # Tailwind + theme presets
└── store/            # Reserved (Zustand later)
```

## Theme customization

Default colors live in `src/styles/index.css` as CSS variables.
Presets and runtime apply helpers are in `src/styles/theme.ts`.
