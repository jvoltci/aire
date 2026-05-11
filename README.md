# aire

![aire](images/aire.png)

Realtime polls at the edge. Create a yes/no poll, share the link, watch votes update live.

**Live:** https://jvoltci.github.io/aire/
**API:** https://aire-api.altrusian.workers.dev

## Stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** (zero-config v4)
- **HashRouter** (GitHub Pages SPA-friendly)
- Native **WebSocket** + auto-reconnect
- Backend lives in [aire-api](https://github.com/jvoltci/aire-api): Cloudflare Worker + Durable Object + D1

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Override the API URL with an env var if you want to point at a local worker:

```bash
echo 'VITE_API_URL=http://127.0.0.1:8787' > .env.local
npm run dev
```

## Build

```bash
npm run build        # outputs to dist/
npm run preview      # serve the built dist/ locally
```

## Deploy

Pushing to `master` auto-deploys to GitHub Pages via the workflow in
[.github/workflows/deploy.yml](.github/workflows/deploy.yml).

**One-time setup:** in the repo on GitHub, go to
**Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

## Project layout

```
src/
├── main.tsx              # entry
├── index.css             # tailwind v4 + theme tokens
├── components/
│   ├── Shell.tsx         # layout
│   └── Bar.tsx           # animated yes/no bar
├── routes/
│   ├── Home.tsx          # create a poll
│   ├── Vote.tsx          # cast a vote
│   └── Results.tsx       # live results
└── lib/
    ├── api.ts            # REST client
    ├── ws.ts             # WebSocket with reconnect + ping
    ├── env.ts            # API base URL
    └── voter.ts          # voter id in localStorage (dedupe)
```
