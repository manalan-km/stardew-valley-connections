# Stardew Valley Connections

A daily word-association puzzle game inspired by the NYT Connections format, themed around Stardew Valley. Sixteen items, four hidden groups, four guesses to spare — find what connects them.

> **Status:** Playable and in development, working towards public release. Backend lives in [stardew-valley-connections-api](https://github.com/manalan-km/stardew-valley-connections-api).

<!-- TODO: add a screenshot or short GIF here — for a game, this is the single highest-value thing a README can have -->

## How it works

- A new puzzle is generated daily by the backend and served over its REST API.
- Players group 16 Stardew Valley items (crops, fish, villagers, and more) into 4 categories of 4.
- User accounts are handled by the backend through Supabase.

## Tech

| Area | Choice |
| --- | --- |
| Framework | React 19 + TypeScript, built with Vite 7 |
| Styling | Tailwind CSS 4 |
| Animations | anime.js v4, orchestrated through a singleton AnimationSequencer so game animations run as ordered sequences rather than competing timelines |
| Architecture | Smart/dumb component split: container components own state and API calls, presentational components stay pure |
| Tooling | pnpm, ESLint, Prettier, date-fns |

## Running locally

Requires Node.js 20+ and pnpm.

```bash
git clone https://github.com/manalan-km/stardew-valley-connections.git
cd stardew-valley-connections
pnpm install
pnpm dev
```

The app expects the API to be running — see the [API repo](https://github.com/manalan-km/stardew-valley-connections-api) for setup.

### Configuration

```bash
# .env.local
SV_API_BASE_URL="http://127.0.0.1:8000"
```

## Scripts

```bash
pnpm dev       # start dev server with HMR
pnpm build     # type-check (tsc -b) and build for production
pnpm lint      # run ESLint
pnpm preview   # preview the production build
```

## Disclaimer

This is a non-commercial fan project. Stardew Valley and its assets belong to ConcernedApe; this project is not affiliated with or endorsed by ConcernedApe.
