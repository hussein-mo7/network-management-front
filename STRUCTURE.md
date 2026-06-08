# network-management-front — Project Structure & Rules

> Read this file at the start of a session so the agent follows our conventions without re-explaining everything.

---

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (semantic tokens via CSS variables in `src/styles/index.css`)
- React Router, TanStack Query, TanStack Table
- React Hook Form (no Zod), Axios, date-fns, Recharts, Sonner
- i18next — Arabic (default) + English
- **No Zustand** for now (TanStack Query + AuthProvider enough)

---

## Folder structure

```
src/
├── app/              # App shell + router + route guards
│   ├── App.tsx
│   ├── router.tsx
│   └── routing/      # ProtectedRoute, GuestRoute, Can
├── pages/            # Route screens only — thin wiring (state, handlers, compose sections)
├── components/
│   ├── layout/       # DashboardLayout, AuthLayout
│   ├── pages/        # Page sections — one folder per route screen
│   │   ├── auth/
│   │   ├── speeds/
│   │   ├── available-usernames/
│   │   ├── subscribers/
│   │   └── support/
│   └── ui/           # Design system only (reusable primitives)
│       ├── buttons/
│       ├── forms/
│       ├── typography/
│       ├── navigation/
│       ├── feedback/
│       ├── modals/
│       ├── cards/
│       ├── overlays/
│       ├── branding/
│       └── */index.ts   # barrel exports
├── services/         # API only — authService, subscribersService, …
├── hooks/            # useAuth, useSubscribers — wrap services + TanStack Query
├── lib/              # apiClient, cn, permissions, i18n, devAuth
├── types/
├── providers/        # QueryProvider, ThemeProvider, AuthProvider
├── locales/          # ar.ts, en.ts
├── styles/           # index.css, theme.ts
└── store/            # reserved (empty until Zustand needed)
```

### Page-specific components

**Pages stay thin** — only route wiring (state, handlers, layout). All UI sections live under `components/pages/`:

```
pages/auth/
├── LoginPage.tsx
├── ForgotPasswordPage.tsx
└── ResetPasswordPage.tsx   ← imports from @/components/pages/auth

components/pages/auth/
├── LoginForm.tsx
├── ForgotPasswordForm.tsx
├── ResetPasswordForm.tsx
├── AuthBackLink.tsx
└── index.ts

pages/speeds/
└── SpeedsPage.tsx              ← imports from @/components/pages/speeds

components/pages/speeds/
├── SpeedTierCard.tsx
├── SpeedFormModal.tsx
└── index.ts

pages/available-usernames/
└── AvailableUsernamesPage.tsx  ← imports from @/components/pages/available-usernames

components/pages/available-usernames/
├── AvailableUsernamesTable.tsx
├── AvailableUsernameFormModal.tsx
├── ImportUsernamesModal.tsx
└── index.ts
```

- **One folder per route** under `components/pages/` — mirrors `pages/` names.
- If a section is used by **more than one page** (e.g. `SpeedTierPicker` on available-usernames), keep it in the owning domain folder (`components/pages/speeds/`) and import from there.
- **Never** put page sections inside `components/ui/` — that folder is design-system primitives only.
- If a component becomes **global** (used across many unrelated pages), promote it to `components/<domain>/` or `components/ui/`.

---

## Coding rules

### UI components — always use our design system

| Need | Use | Do NOT use |
|------|-----|------------|
| Titles | `<Heading as="h1\|h2\|h3\|h4">` | raw `<h1>`, `<h2>`, … |
| Body / muted text | `<Text>` or `<Text muted>` | raw `<p>` with manual classes |
| Buttons | `<Button>` from `ui/buttons` | raw `<button>` with custom styles |
| Inputs | `<Input>`, `<PasswordInput>` | raw `<input>` |
| Cards | `<Card>`, `<CardHeader>` | ad-hoc divs |
| Loading | `<Spinner>`, `<FullPageLoader>` | custom spinners |
| Logo | `<Logo>` from `ui/branding` | hardcoded text |

Import from barrel files: `@/components/ui/typography`, `@/components/ui/forms`, etc.

### Services + hooks pattern

```ts
// services/auth.service.ts — HTTP only, no React
export const authService = { login, logout, me };

// hooks/useSubscribers.ts — TanStack Query + service
export function useSubscribers() {
  return useQuery({ queryKey: [...], queryFn: () => subscribersService.getAll() });
}
```

- **useQuery** → read/fetch data (GET)
- **useMutation** → write data (POST, PUT, DELETE)
- Invalidate related queries after mutations so stats stay in sync

### i18n

- All user-facing strings in `src/locales/ar.ts` and `en.ts`
- Use `useTranslation()` → `t("auth.welcome")`
- Never hardcode Arabic/English in JSX (except brand name "WeWiFi")
- Language toggle: `<LanguageToggle />` — saves to `localStorage` key `wewifi-lang`
- `document.dir` and `document.lang` update automatically
- Browser tab title updates per route via `DocumentTitle` + `src/lib/pageTitles.ts` (format: `{page} — WeWiFi`)

### Styling

- Use semantic Tailwind tokens: `bg-primary`, `text-muted-foreground`, `border-border`
- Never hardcode hex colors in components
- Custom colors live in `src/styles/index.css` as CSS variables
- Theme presets in `src/styles/theme.ts` (user color picker later)
- RTL-safe spacing: prefer `ps-*`, `pe-*`, `start`, `end` over `pl-*`, `pr-*`, `left`, `right`

### Auth (dev vs production)

`.env`:

```
VITE_API_BASE_URL=/api/v1
VITE_SKIP_AUTH_CHECK=false   # true = mock login without backend
```

- `VITE_SKIP_AUTH_CHECK=true` → skip `/auth/me`, mock login with any credentials
- `AuthProvider` runs `GET /auth/me` once at app root to restore session after refresh
- JWT is stored in an **httpOnly cookie** (`wewifi_token`) — the frontend never reads or stores the token
- All API requests use `withCredentials: true` so the cookie is sent automatically
- Protected routes: `ProtectedRoute`, `GuestRoute`, permission checks: `<Can permission="…">`

### Mock data (until API is ready)

```
src/lib/mocks/
├── availableUsernames.mock.ts
├── speeds.mock.ts          ← next
└── index.ts
```

Pages import from `@/lib/mocks` during UI development. When backend is ready: add `services/` + `hooks/` and replace mock imports.

### Admin vs viewer (UI rules)

| | Admin | Viewer |
|---|-------|--------|
| Nav / pages | All allowed by permissions | `*.view` only |
| Buttons (add, edit, delete, import) | Visible | Hidden — use `useRoleAccess().canManage` |
| Password columns | `••••••••••••` + eye toggle to reveal | `••••••••••••` only — no reveal |
| Tables | Full data + actions column | Same data, no actions column |

Use `<MaskedPasswordCell value={password} />` anywhere credentials appear in tables.

**Dev tip:** login with username `viewer` (any password) to test read-only UI.

> If a section is used by **more than one page**, keep it in the owning domain under `components/pages/<domain>/` (e.g. `SpeedTierPicker` lives in `components/pages/speeds/`).
> Pages stay thin — wiring only.

### After each task

The agent should list **files edited/added** at the end of the response so you can review.

---

## Backend contract (Mohanad)

> **Frontend-only rule:** Do not change `network-management-api` from this repo. Share this section with Mohanad.

When `VITE_SKIP_AUTH_CHECK=false`, the frontend calls **`/api/v1/auth/*`** (Vite proxy: `/api` → `http://localhost:3000`).

### Auth header / cookie
- JWT in **httpOnly cookie** `wewifi_token` on protected routes (sent automatically with `credentials: include`)
- `Authorization: Bearer` still accepted by the backend for tooling, but the frontend does not use it

### Endpoints the frontend needs

#### `POST /api/v1/auth/login`
**Request:** `{ "username": "...", "password": "..." }`

**Response `200`:** sets `wewifi_token` httpOnly cookie. Body:
```json
{
  "success": true,
  "message": "Logged in successfully.",
  "user": {
    "id": 1,
    "name": "Administrator",
    "username": "admin",
    "email": "admin@we.wifi",
    "roleId": 2,
    "role": "admin",
    "status": "active"
  }
}
```

Frontend maps `user.role` → permissions client-side.

**Errors:** `401` invalid credentials, `403` inactive account — body must include `{ "message": "..." }`.

---

#### `GET /api/v1/auth/me` *(required — session restore on refresh)*
**Cookie:** `wewifi_token`

**Response `200`:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Administrator",
    "username": "admin",
    "email": "admin@we.wifi",
    "roleId": 2,
    "role": "admin",
    "status": "active"
  }
}
```

**Error `401`:** invalid/expired/revoked token (not logged in).

Used by `AuthProvider` on app load so refresh keeps the user signed in.

---

#### `POST /api/v1/auth/logout`
**Cookie:** `wewifi_token`

**Response `200`:** clears cookie and revokes session server-side.
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

#### `POST /api/v1/auth/forgot-password`
**Request:** `{ "email": "..." }`

**Response `200`:** always `{ "success": true, "message": "..." }` (do not reveal if email exists)

Reset link in email: `{FRONTEND_URL}/reset-password?token={rawToken}`  
Set `FRONTEND_URL=http://localhost:5173` in backend `.env` for dev.

---

#### `POST /api/v1/auth/reset-password`
**Request:** `{ "token": "...", "newPassword": "..." }`  
(Frontend form field is `password`; `auth.service.ts` maps it to `newPassword`.)

**Response `200`:** `{ "success": true, "message": "..." }`  
**Error `400`:** invalid/expired token — `{ "message": "..." }`

---

### User + permissions shape

| Field | Type | Notes |
|-------|------|-------|
| `role_name` | `"admin"` \| `"viewer"` | Also accept `super_admin` → treat as admin permissions on frontend |
| `role_id` | number | |
| `status` | `"active"` \| `"inactive"` | |

**Permission strings** (return full list for the user's role on login + me):

Viewer: `dashboard.view`, `subscribers.view`, `expired.view`, `disabled.view`, `available_usernames.view`, `logs.view`, `online_users.view`, `subscription_statistics.view`, `speeds.view`

Admin: all viewer permissions plus `subscribers.create/update/delete/import/export`, `expired.update`, `disabled.restore`, `available_usernames.create/import/export/delete`, `sms.view/send`, `users.view/create/update`, `speeds.manage`

See `src/lib/roles.ts` for the canonical list.

### Roles (seed)

| Role | `role_name` | Access |
|------|-------------|--------|
| Admin | `admin` | Full access |
| Viewer | `viewer` | Read-only (`*.view`) |

### CORS (dev)
Allow origin `http://localhost:5173` so the Vite app can call the API.

### Dev proxy
Vite: `/api` → `http://localhost:3000` — frontend base URL is `/api/v1`.

---

### Support tickets *(connected to API)*

Route: `/support` — tickets are **created manually by support staff** (phone / office visit), not by subscribers online.

#### Suggested statuses
| `status` | Meaning |
|----------|---------|
| `open` | Logged, not started |
| `in_progress` | Team is working on it |
| `waiting_customer` | Waiting for subscriber callback / info |
| `resolved` | Closed / solved |

#### Suggested fields (`SupportTicket`)
| Field | Type | Notes |
|-------|------|-------|
| `id` | number | |
| `ticketNumber` | string | e.g. `TKT-2026-0142` |
| `title` | string | Short summary |
| `description` | string | Full issue details |
| `status` | enum above | |
| `priority` | `low` \| `medium` \| `high` \| `urgent` | |
| `channel` | `phone` \| `visit` \| `whatsapp` \| `other` | How contact happened |
| `subscriberName` | string | May not be linked to DB subscriber yet |
| `subscriberPhone` | string | |
| `assignedTo` | string | Support staff name |
| `createdAt` | ISO datetime | |
| `updatedAt` | ISO datetime | |
| `resolvedAt` | ISO datetime \| null | Set when status → `resolved` |

#### Endpoints (implemented)
- `GET /api/v1/support/tickets` — list (+ optional `?status=` filter)
- `POST /api/v1/support/tickets` — create (admin)
- `PUT /api/v1/support/tickets/:id` — update (admin)
- `DELETE /api/v1/support/tickets/:id` — delete one (admin)
- `DELETE /api/v1/support/tickets/all` — delete all tickets (admin)

Charts/stats are computed on the frontend from the ticket list (`src/lib/supportAnalytics.ts`). Ticket `title` is free text (Arabic in production, e.g. «يحتاج برمجة راوتر»).

Seed: `npm run seed` (API) inserts roles and default admin/viewer users only — no sample subscribers or tickets.

---

### Customers & subscribers *(UI — mock; API spec ready)*

**Backend API (every request for UI pages):** [`docs/backend.md`](docs/backend.md).  
**Field-level contract:** [`docs/CUSTOMERS_SUBSCRIBERS_API.md`](docs/CUSTOMERS_SUBSCRIBERS_API.md).

**Model:** One DB row per person. Stopped accounts **stay on Customers** (balance/debt). Stop removes them from Subscribers and clears username back to pool.

| Page | Rule |
|------|------|
| `/customers` | **All** records (customer, subscriber, expiring, **stopped**) |
| `/subscribers` | Has username, not stopped (**includes expiring**) |
| `/expiring` | Username, not stopped, disconnect ≤7 days or past |
| `/stopped` | **Customers + Stopped only** — `isSuspended`, username cleared |

Excel import/export → **Settings** only.

Helpers: `src/lib/customerUtils.ts`, `src/lib/subscriberUtils.ts`, mock: `src/lib/mocks/subscribers.mock.ts`.

---

### Available usernames *(connected to API)*

Route: `/available-usernames` — pool of PPPoE usernames **per speed tier**. When a username is assigned to a subscriber it stays visible here during a **cooldown** (default **30 days**), then moves to the **Expiring** page (separate route, not built yet).

#### Lifecycle (derived on frontend + backend)

| UI status | `lifecycleStatus` | In pool? | Meaning |
|-----------|-------------------|----------|---------|
| **New** | `new` | yes | Never assigned (`assignedAt` / `expiryDate` null, not owner) |
| **Running** | `in_cooldown` | yes | Assigned; cooldown active until `expiryDate` |
| **Owner** | `owner` | yes | `isOwnerUsername: true` — never expires |
| *(hidden)* | `expired` | no | `expiryDate` passed — list on Expiring page later |

Do **not** rely on `isUsed` alone for UI; use `assignedAt`, `expiryDate`, `isOwnerUsername`, and compare `expiryDate` to now.

#### API row shape (`AvailableUsername`)

| Field | Type | DB column | Notes |
|-------|------|-----------|-------|
| `id` | number | `id` | |
| `username` | string | `username` | unique |
| `password` | string | `password` | |
| `speedId` | number | `speed_id` | FK → speed tier |
| `isOwnerUsername` | boolean | `is_owner_username` | Owner pool row |
| `createdAt` | ISO date | `created_at` | |
| `assignedAt` (UI) | ISO datetime \| null | `start_date` | API field **`startDate`** e.g. `2026-05-21T21:50:33.724+03:00` |
| `expiryDate` (UI) | ISO datetime \| null | `end_date` | Set by API when `startDate` + 30 days; null for new / owner |

Optional legacy fields in DB: `is_used`, `first_connection_date`, `package` — can support assign flow on backend.

#### Endpoints (implemented)

Base: `/api/v1/speeds/:speedId/usernames`

| Method | Path | Notes |
|--------|------|-------|
| GET | `/` | List (`?page=1&limit=500`), excludes `isExpired` |
| POST | `/` | Create — body below |
| PUT | `/:id` | Update status/password |
| DELETE | `/:id` | Soft-delete (`isExpired`) |
| POST | `/import` | multipart `file` (Excel) |
| GET | `/export` | Excel download |

UI list filters (`new` / Running / Owner) are **client-side** on the list response.

#### Pool counts (speed cards / header)

Per `speedId`, return or let frontend compute:

```json
{ "total": 12, "new": 5, "inCooldown": 4, "owner": 3 }
```

Helpers: `src/types/availableUsername.ts` (`getSpeedPoolCounts`, `getDaysUntilExpiry`).

#### Assign / cooldown (subscriber flow — backend)

When admin assigns pool username to subscriber (or subscriber changes username but cooldown not finished):

1. Set `assignedAt` (and `is_used` if you keep it).
2. Set `expiryDate = assignedAt + USERNAME_COOLDOWN_DAYS` (30 unless configurable).
3. Row remains in **Available usernames** list with status **Running** and “Expires in N days”.

After `expiryDate`, row leaves this pool → **Expiring** table/page (future).

Owner usernames: `isOwnerUsername: true`, no `expiryDate` / no cooldown.

#### POST body (create) — maps from UI status

| UI status | `isOwnerUsername` | `isUsed` | `startDate` |
|-----------|-------------------|----------|-------------|
| New | `false` | `false` | omit |
| Running | `false` | `true` | **required** — ISO with offset from form |
| Owner | `true` | `false` | omit |

Example Running payload:
```json
{
  "username": "0599123456PP",
  "password": "wifi2024",
  "isOwnerUsername": false,
  "isUsed": true,
  "startDate": "2026-05-21T21:50:33.724+03:00"
}
```

PUT uses the same flags; `isUsed: false` or `isOwnerUsername: true` clears `startDate` / `endDate` on the server.

Frontend: `src/services/usernames.service.ts`, `src/lib/mapAvailableUsernames.ts` (`toApiStartDate`), `src/hooks/useAvailableUsernames.ts`

---

## Commands

```bash
npm run dev       # http://localhost:5173
npm run build
npm run preview
```

---

## Product context (WeWiFi)

Admin dashboard for WiFi/PPPoE subscription management:

- Customers → assign username from pool → 30-day cycle
- Speed tiers, invoices (debit/credit), MikroTik online users, SMS, RBAC
- Roles: **admin** (full access) + **viewer** (read-only) — only two roles for now
- Arabic RTL primary; English secondary

See client requirements in chat history for full feature list.
