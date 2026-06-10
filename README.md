# template-nextjs-ts

Production-ready Next.js frontend starter with TypeScript, Tailwind CSS, shadcn/ui, Zustand, and Axios. Includes Docker and full CI/CD pipelines for both GitHub Actions and GitLab CI.

---

## What this template includes

### Core framework
- **Next.js 16.2.6** — App Router, React Server Components, SSR/SSG
- **React 18.3.1** — concurrent features
- **TypeScript 5.9.3** — strict mode enabled

### Styling
- **Tailwind CSS 3.4.19** — utility-first CSS
- **tailwindcss-animate** — animation utilities for shadcn
- **shadcn/ui** — pre-configured via `components.json`; installed Radix primitives: `checkbox`, `dialog`, `dropdown-menu`, `label`, `select`, `separator`, `slot`, `tooltip`
- **class-variance-authority** — variant-based component styling
- **clsx** + **tailwind-merge** — conflict-free class merging via `cn()`
- **lucide-react 0.563.0** — icon library

### State management
- **Zustand 4.5.7** — two pre-built stores persisted to `localStorage`:
  - `useUserStore` — auth tokens + hydration tracking
  - `useUIStore` — theme + sidebar state

### Networking
- **Axios 1.13.5** — typed HTTP client with Bearer token injection, 401 auto-logout, and 30s timeout

### UI extras
- **next-themes 0.2.1** — dark/light/system theme switching
- **framer-motion 11.18.2** — animation library (used in 404 and error pages)
- **sonner 1.7.4** — toast notifications

### Infrastructure
- **Docker** — `Dockerfile` (node:23-alpine) + `docker-compose.yml`
- **GitHub Actions** — `.github/workflows/ci-cd.yml`
- **GitLab CI** — `.gitlab-ci.yml` + `.gitlab/workflows/notifications.yml` (Telegram/Bale notifications)

---

## Prerequisites

- Node.js 20+
- npm
- Docker and Docker Compose
- `gh` CLI (optional, for bootstrapping from template)

---

## Quickstart

```bash
# Create repo from template
gh repo create my-app --template boilerpl8hub/template-nextjs-ts --public
git clone https://github.com/YOUR_ORG/my-app
cd my-app

# Install dependencies
npm install

# Set up env
cp .env.local.example .env.local
# Fill in .env.local values

# Run dev server
npm run dev
# → http://localhost:3000
```

---

## Setup checklist

Complete every item when starting a new project from this template.

### Project identity
- [ ] Rename `"name"` in `package.json` from `template-nextjs-ts` to your project name
- [ ] Update `metadata.title.default` and `metadata.description` in `src/app/layout.tsx`
- [ ] Update `<html lang="en">` in `src/app/layout.tsx` if your app uses a different locale (e.g. `lang="fa" dir="rtl"` for Persian/RTL)
- [ ] Replace the placeholder `viewport.themeColor` or remove it if unused
- [ ] Set `NEXT_PUBLIC_SITE_URL` in `.env.local`

### Font
- [ ] `src/app/layout.tsx` uses **Inter** from Google Fonts — swap to your chosen font
- [ ] If using a self-hosted font: add files to `public/fonts/`, update `src/utils/fonts.ts`, update `--font-sans` in `globals.css`

### Colors and theme
- [ ] `src/app/globals.css` — update `--background`, `--primary`, `--accent`, and other CSS variables for your brand colors in both `:root` (light) and `.dark`
- [ ] `tailwind.config.ts` — add brand-specific color tokens in the `// Add brand colors here` section

### Zustand stores
- [ ] `src/store/useUserStore.ts` — add your user fields (e.g. `username`, `email`, `role`, `permissions`)
- [ ] `src/store/useUIStore.ts` — remove/add UI state relevant to your app
- [ ] Rename the `persist` `name:` key in `useUserStore` from `"user-storage"` to `"<yourapp>-user"` — this key is also referenced in `services.ts` (see below)
- [ ] Rename the `persist` `name:` key in `useUIStore` from `"ui-storage"` to `"<yourapp>-ui"`

### Axios client
- [ ] `src/services/services.ts` — update `localStorage.getItem("user-storage")` to match the new store name if you renamed it
- [ ] Update the 401 redirect path from `/signin` to your actual login route

### Next.js config
- [ ] `next.config.ts` — add your image hosting domains to `remotePatterns`

### Docker
- [ ] `docker-compose.yml` — update the default value of `FRONTEND_REGISTRY_IMAGE` from `myapp/frontend` to your image name

### GitLab CI variables
Set these in your GitLab project: **Settings → CI/CD → Variables**

| Variable | Type | Description |
|----------|------|-------------|
| `REGISTRY` | Variable | Docker registry hostname (e.g. `registry.hamdocker.ir`) |
| `REGISTRY_USERNAME` | Variable | Registry login username |
| `REGISTRY_PASSWORD` | Variable | Registry login password |
| `FRONTEND_REGISTRY_IMAGE` | Variable | Full image path (e.g. `registry.hamdocker.ir/myorg/frontend`) |
| `FRONTEND_ENV_FILE` | **File** | Your `.env.local` contents — stored as a GitLab File variable |
| `SSH_PRIVATE_KEY` | **File** | Private key for SSH access to the deploy server |
| `SERVER_HOST` | Variable | Server IP or hostname |
| `SERVER_USER` | Variable | SSH user (e.g. `root`) |
| `PAT` | Variable | Personal access token used on the server for `docker login` |
| `TELEGRAM_BOT_TOKEN` | Variable | (Optional) Telegram bot token for pipeline notifications |
| `TELEGRAM_CHAT_ID` | Variable | (Optional) Telegram chat ID |
| `TELEGRAM_BUILD_THREAD_ID` | Variable | (Optional) Telegram thread ID for grouped notifications |
| `BALE_BOT_TOKEN` | Variable | (Optional) Bale bot token |
| `BALE_CHAT_ID` | Variable | (Optional) Bale chat ID |

### GitHub Actions secrets
Set these in your GitHub repo: **Settings → Secrets and variables → Actions**

| Secret | Description |
|--------|-------------|
| `REGISTRY` | Docker registry hostname |
| `REGISTRY_USERNAME` | Registry username |
| `REGISTRY_PASSWORD` | Registry password |
| `FRONTEND_REGISTRY_IMAGE` | Full image path |
| `ENV_LOCAL` | Full contents of your `.env.local` file |
| `SSH_PRIVATE_KEY` | Private key for SSH deploy |
| `SERVER_HOST` | Server IP or hostname |
| `SERVER_USER` | SSH user |

---

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml               # GitHub Actions pipeline
├── .gitlab/
│   └── workflows/
│       └── notifications.yml       # Telegram/Bale notification helpers
├── .gitlab-ci.yml                  # GitLab CI pipeline
├── .gitignore
├── Dockerfile                      # node:23-alpine, builds and runs Next.js
├── docker-compose.yml              # Single-service compose for deploy
├── components.json                 # shadcn/ui configuration
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/
    │   ├── globals.css             # Tailwind base + CSS variables + custom utilities
    │   ├── layout.tsx              # Root layout: Inter font, ThemeProvider, metadata
    │   ├── page.tsx                # Home page — replace with your content
    │   ├── not-found.tsx           # 404 page (uses framer-motion)
    │   └── error.tsx               # Global error boundary (uses framer-motion)
    ├── components/
    │   ├── ThemeProvider/          # next-themes wrapper component
    │   └── ui/                     # shadcn/ui components (add more via `npx shadcn add`)
    ├── hooks/
    │   └── use-mobile.tsx          # useIsMobile() — breakpoint-based boolean hook
    ├── lib/
    │   └── utils.ts                # cn() — clsx + tailwind-merge helper
    ├── services/
    │   └── services.ts             # Axios client + typed HTTP helpers
    ├── store/
    │   ├── useUserStore.ts         # Auth tokens, persisted to localStorage
    │   └── useUIStore.ts           # Theme + sidebar state, persisted to localStorage
    ├── types/
    │   └── apiTypes.ts             # GetParams, PostParams, PatchParams, PutParams, DeleteParams
    └── utils/
        └── fonts.ts                # Font variable configuration
```

---

## Axios client

`src/services/services.ts` exports a configured Axios instance and typed request helpers.

**Client configuration:**
- Base URL: `${NEXT_PUBLIC_BACKEND_URL}/`
- Timeout: 30 seconds
- Default `Content-Type: application/json`

**Request interceptor** — runs before every request:
1. Reads `user-storage` from `localStorage` (Zustand persist key)
2. Extracts `state.accessToken`
3. Injects `Authorization: Bearer <token>` header if token exists
4. Skips silently on server-side (guards with `typeof window !== "undefined"`)

**Response interceptor** — runs on every error response:
- On `401 Unauthorized`:
  1. Clears `accessToken` and `refreshToken` from the persisted store in `localStorage`
  2. Redirects to `/signin` via `window.location.replace`

**Available helpers:**

| Function | Method | Notes |
|----------|--------|-------|
| `getData({ endPoint, params?, headers? })` | GET | Supports query params |
| `postData({ endPoint, data?, headers? })` | POST | JSON body |
| `postFormData({ endPoint, data? })` | POST | Multipart — sets `Content-Type: undefined` so browser sets the boundary |
| `patchData({ endPoint, data?, headers? })` | PATCH | JSON body |
| `putData({ endPoint, data? })` | PUT | JSON body |
| `putFormData({ endPoint, data? })` | PUT | Multipart |
| `deleteData({ endPoint, data?, headers? })` | DELETE | Supports body |

All helpers return `response.data` directly.

---

## Zustand stores

### useUserStore

**File:** `src/store/useUserStore.ts`  
**Persist key:** `"user-storage"` (localStorage)

| Field | Type | Description |
|-------|------|-------------|
| `accessToken` | `string \| undefined` | JWT access token |
| `refreshToken` | `string \| undefined` | JWT refresh token |
| `_hasHydrated` | `boolean` | Set to `true` once Zustand rehydrates from localStorage |
| `setAccessToken(token)` | action | Store access token after login |
| `setRefreshToken(token)` | action | Store refresh token after login |
| `logout()` | action | Clears both tokens |

`_hasHydrated` is useful for preventing a flash of unauthenticated UI on page load — render protected content only when `_hasHydrated === true`.

### useUIStore

**File:** `src/store/useUIStore.ts`  
**Persist key:** `"ui-storage"` (localStorage)

| Field | Type | Description |
|-------|------|-------------|
| `theme` | `"light" \| "dark" \| "system"` | Current theme preference |
| `sidebarOpen` | `boolean` | Sidebar open/closed state |
| `setTheme(theme)` | action | Change theme |
| `setSidebarOpen(open)` | action | Set sidebar state explicitly |
| `toggleSidebar()` | action | Toggle sidebar |

---

## Environment variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Backend API base URL — no trailing slash | `http://localhost:8080` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for OG/SEO metadata | `https://myapp.com` |

Create `.env.local` at the project root (never commit this file):

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## CI/CD pipelines

Both pipelines follow the same trigger logic and deployment strategy.

### Trigger rules

| Event | CI (test/lint) | CD (build/push/deploy) |
|-------|---------------|------------------------|
| PR / MR → `develop` | Yes | No |
| PR / MR → `main` | Yes | Yes |
| Push to `ops/**` branch | Yes | Yes |
| Commit message starts with `ci:` | Yes (GitLab only) | No |
| Commit message starts with `cd:` | No | Yes (GitLab only) |

### GitHub Actions (`.github/workflows/ci-cd.yml`)

**Job: `test` (Build & Lint)**
- Runs on: PRs to `main` or `develop`
- Node.js 20 with npm cache
- Steps: `npm install` → `npm run build` → `npm run lint`

**Job: `build-and-push`**
- Runs on: PR to `main` or push to `ops/**`
- Writes `ENV_LOCAL` secret to `.env.local`
- Docker login → `docker compose build` → `docker compose push`

**Job: `deploy`**
- Needs: `build-and-push`
- Sets up SSH key from `SSH_PRIVATE_KEY` secret
- Copies `docker-compose.yml` to `/root/frontend/` on server
- SSH commands on server: `docker login` → write `.env.local` → `docker compose pull` → `docker compose down --remove-orphans` → `docker compose up -d` → `docker image prune -f`

### GitLab CI (`.gitlab-ci.yml`)

Stages run in order: `notify_ci` → `test` → `notify_test` → `build` → `push` → `deploy` → `notify`

**Stage: `notify_ci`**
- Sends pipeline start notification via Telegram/Bale

**Stage: `test` — `frontend_test`**
- Image: `node:20-alpine`
- npm cache keyed to `frontend-${CI_COMMIT_REF_SLUG}`
- Steps: `npm install` → `npm run build` → `npm run lint` (lint failure non-fatal)
- Artifacts: `.test-output/` (1 day), always collected

**Stage: `notify_test`**
- `notify_test_failure` — sends build/lint error output from artifact
- `notify_test_success` — sends pass notification
- `notify_cd_start` — fires only when CD will run (MR to main, ops/*, cd: commits)

**Stage: `build` — `frontend_build`**
- Runs only on CD triggers
- Copies `FRONTEND_ENV_FILE` (GitLab File variable) to `.env.local`
- `docker compose build` with output captured to `.build-output/`

**Stage: `push` — `push_image`**
- Image: `docker:24` with `docker:24-dind` service
- Docker login → `docker compose push`

**Stage: `deploy` — `deploy_frontend`**
- `retry: 2`
- SSH key setup from `SSH_PRIVATE_KEY` File variable
- Copies `docker-compose.yml` to `/root/frontend/` on server
- SSH commands: `docker login` (using `PAT`) → write `.env.local` → `docker compose pull` → `docker compose down --remove-orphans` → `docker compose up -d` → `docker image prune -f`

**Stage: `notify`**
- `notify_deploy_failure` / `notify_deploy_success` — final deploy result notification

---

## Development

```bash
npm run dev        # Dev server at http://localhost:3000 (with fast refresh)
npm run build      # Production build
npm run start      # Serve production build at http://localhost:3000
npm run lint       # ESLint
```

### Adding shadcn/ui components

```bash
npx shadcn add button
npx shadcn add input
npx shadcn add dialog table card
```

Components are added to `src/components/ui/`.

---

## Build and deploy

### Docker (local)

```bash
# Build image
docker compose build

# Run locally
docker compose up

# Stop
docker compose down
```

The `Dockerfile` uses `node:23-alpine`. It copies `package.json` and installs deps first (layer caching), then copies source and `.env.local`, runs `npm run build`, and starts with `npm run start`.

**Note:** `.env.local` must exist before `docker compose build`. In CI/CD it is injected from a secret. Locally, copy from the example:

```bash
cp .env.local.example .env.local
```

### Deploy server layout

Both pipelines deploy to `/root/frontend/` on the server:

```
/root/frontend/
├── docker-compose.yml   # copied from repo
└── .env.local           # written from CI/CD secret
```

The server pulls the image from the registry, so it never builds — only pulls and runs.
