# Secret Base — CLAUDE.md

## Project Overview

Secret Base is a Pokémon wiki/Pokédex web application built with Next.js 14 (App Router). Its primary goal is a smooth, mobile-friendly Pokédex experience that supports both the official National Pokédex and fan-made ROM hack Pokédexes (Seaglass, Lazarus).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, `"use client"` components) |
| Language | TypeScript 5 |
| UI Library | HeroUI (`@heroui/react`) |
| Styling | Tailwind CSS 3 + `prettier-plugin-tailwindcss` |
| Animations | Framer Motion |
| Pokémon data | `pokedex-promise-v2` (PokeAPI wrapper) + local JSON |
| Theming | `next-themes` (light/dark) |
| Analytics | `@vercel/analytics` |

---

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint (next/core-web-vitals ruleset)
```

Prettier is configured but has no dedicated npm script — run it via your editor or `npx prettier --write .`.

---

## Directory Structure

```
secretbase/
├── src/app/
│   ├── (routes)/               # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Roboto font, navbar, analytics)
│   │   ├── providers.tsx       # HeroUIProvider + NextThemesProvider
│   │   ├── page.tsx            # Root redirect → /main/
│   │   ├── globals.css         # Global CSS
│   │   ├── [pokedex]/
│   │   │   ├── page.tsx        # Pokédex list page (/main, /seaglass, /lazarus)
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Individual Pokémon detail page
│   │   └── about/
│   │       └── page.tsx        # About page
│   │
│   ├── _assets/                # Static images and GIFs
│   ├── _components/            # Reusable React components
│   │   ├── navbar/             # PrimaryNavBar, Logo, ThemeSwitcher, SupportMeButton
│   │   ├── pokedex/            # Pokedex, PokedexFilter, PokedexGrid, PokedexTableGrid, PokemonCard
│   │   └── PokemonPage/        # BasicInfoBox, StatsTable, MovesTable, EvolutionTable,
│   │                           #   ResistanceTable, SpriteGallery, DetailPanel, NavMenu, etc.
│   │
│   ├── _hooks/                 # Custom React hooks
│   │   ├── useScreenSize.tsx
│   │   ├── useScrollPosition.tsx
│   │   └── useToggleBodyScroll.tsx
│   │
│   ├── _services/              # Data access layer
│   │   ├── pokeapi.ts          # PokeAPI singleton (pokedex-promise-v2 wrapper)
│   │   ├── pokeapi.interface.ts
│   │   ├── pokedex-service.interface.ts   # IPokedexService contract
│   │   ├── national-pokedex-service.ts    # National Dex implementation
│   │   ├── seaglass-pokedex-service.ts    # Seaglass ROM hack implementation
│   │   ├── lavarus-pokedex-service.ts     # Lazarus ROM hack implementation
│   │   ├── models/             # TypeScript data models
│   │   │   ├── PokemonSimpleData.ts
│   │   │   ├── PokemonFullData.ts
│   │   │   ├── EvolutionChain.ts
│   │   │   └── DetailPanelData.ts
│   │   └── databases/          # Local JSON data per game
│   │       ├── nationalDex/    # pokemonSimpleDataDatabase.json, evolutionChainDatabase.json
│   │       ├── seaglass/       # + abilityOverrideDatabase.json, fakemonDatabase.json
│   │       ├── lazarus/        # + abilityOverrideDatabase.json, fakemonDatabase.json
│   │       └── tools/          # Scripts to generate/update JSON databases
│   │
│   ├── _types/                 # TypeScript type definitions
│   │   ├── game.type.ts        # Game = "main" | "seaglass" | "lazarus"
│   │   ├── gen.type.ts         # Gen union type (game version names)
│   │   ├── pokemon.type.ts     # PokemonType enum
│   │   └── stats.type.ts
│   │
│   └── _utils/                 # Pure utility functions
│       ├── format.ts           # formatName, extractIdFromUrl, isNumber, etc.
│       ├── pokedex-mapping.ts  # pokedexMap: Record<Game, IPokedexService>
│       ├── stats.ts            # statNameMap and stat utilities
│       ├── type-charts.ts      # Type effectiveness chart
│       └── type-colors.ts      # getPokemonTypeColor(type)
│
├── public/                     # Static public assets (SVG logo, screenshots)
├── next.config.js              # Next.js config (styledComponents SWC transform enabled)
├── tailwind.config.ts          # Tailwind + HeroUI plugin, custom brand colors
├── tsconfig.json               # TypeScript config (@/ alias → src/)
├── .eslintrc.json              # next/core-web-vitals
└── .prettierrc                 # prettier-plugin-tailwindcss
```

---

## Architecture

### Service Pattern

All Pokédex data access is abstracted behind `IPokedexService`:

```ts
interface IPokedexService {
  getPokemonSimpleDataById(id: number): PokemonSimpleData;
  getAllPokemonSimpleData(): PokemonSimpleData[];
  getEvolutionChainById(chainId: number): EvolutionChain;
  getPokemonFullDataById(pokemonId: string | number): Promise<PokemonFullData>;
}
```

Each supported game has its own singleton service that implements this interface. Services are resolved via `pokedexMap`:

```ts
// src/app/_utils/pokedex-mapping.ts
export const pokedexMap: Record<Game, IPokedexService> = {
  main: nationalDex,
  seaglass: SeaglassPokedex,
  lazarus: LazarusPokedex,
};
```

**To add a new game/Pokédex:**
1. Create a `databases/<newgame>/` directory with the required JSON files.
2. Add a service class implementing `IPokedexService` in `_services/`.
3. Add the new game to the `Game` type in `_types/game.type.ts`.
4. Register it in `pokedexMap`.

### Data Flow

- **List view**: `pokedexMap[game].getAllPokemonSimpleData()` returns pre-loaded local JSON — no API calls. Filtering/searching is fully client-side.
- **Detail view**: `getPokemonFullDataById()` makes live PokeAPI calls (species, forms, abilities, items) and merges them with local `PokemonSimpleData`.
- **Fakemon** (fan-made Pokémon in ROM hacks): stored entirely in `fakemonDatabase.json`; accessed when `pokemonId >= 99999`. No PokeAPI calls are made for fakemon.
- **Ability overrides**: ROM hack services check `abilityOverrideDatabase.json` before falling back to PokeAPI abilities.

### Routing

```
/                       → redirects to /main/
/[pokedex]/             → Pokédex list (game = main | seaglass | lazarus)
/[pokedex]/[id]/        → Pokémon detail (id = pokeapiId)
/about/                 → About page
```

URL query parameters on the list page (`search`, `type1`, `type2`, `gen`, `grid`, `shiny`) are read on load and kept in sync as filters change.

---

## Theming & Styling Conventions

- **Dark/light mode**: controlled via `next-themes` with `attribute="class"`. Default is `"light"`.
- **HeroUI** components are the primary UI primitives (Button, Card, Spinner, Alert, etc.).
- **Tailwind** is used for layout, spacing, and responsive design. Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`.
- **Custom brand colors** defined in `tailwind.config.ts`:
  - `sb-primary` / `sb-green`: `#80c060`
  - `sb-secondary` / `porygon-blue`: `#69b6d8`
  - `sb-dark-green`: `#398c31`
  - `porygon-pink`: `#e15e74`
- **HeroUI theme overrides** (dark/light background colors) also live in `tailwind.config.ts`.
- Responsive breakpoints follow Tailwind defaults (`sm`, `md`, `lg`, etc.).

---

## Key Conventions

### File & Directory Naming

- **Private app directories** are prefixed with `_` (e.g., `_components`, `_services`, `_utils`, `_types`, `_hooks`, `_assets`). This is a Next.js convention to exclude them from routing.
- **Components**: PascalCase files (e.g., `PokemonCard.tsx`).
- **Types/utils**: camelCase or kebab-case files (e.g., `game.type.ts`, `type-colors.ts`).

### Component Conventions

- All interactive components use `"use client"` directive.
- Components receive typed props interfaces defined at the top of the file.
- The `Pokedex` component is the main stateful list view; it owns filter state and infinite scroll logic.
- `DetailPanel` and `DetailPanelContext` manage the ability/item/move side-panel state via React context.

### TypeScript

- Path alias `@/` maps to `src/` (configured in `tsconfig.json`).
- Prefer `interface` for object shapes; use `type` for unions/aliases.
- Models in `_services/models/` are plain TypeScript interfaces, not classes.
- The `PokemonSimpleData` model is the lightweight cached representation; `PokemonFullData` is the full page data including PokeAPI responses.

### Data Models

```ts
// Lightweight — loaded from JSON, no API needed
interface PokemonSimpleData {
  id: number;            // Pokédex number within this game
  pokeapiId: number;     // PokeAPI identifier (used for API calls)
  name: string;
  formName: string | null;
  types: string[];
  stats: PokemonStats;
  spriteUrl: string | null;
  shinySpriteUrl: string | null;
  animatedSpriteUrl: string | null;
  animatedShinySpriteUrl: string | null;
  evolutionChainId: number;
}
```

`id` is the in-game Pokédex number; `pokeapiId` is the PokeAPI identifier. These differ for ROM hacks with custom numbering or fakemon.

### PokeAPI Wrapper

`src/app/_services/pokeapi.ts` exports a singleton `myPokedex` with a 100-second response cache and 10-second timeout. All PokeAPI calls go through this singleton.

### Database Tools

Scripts in `src/app/_services/databases/tools/` are used to generate or update the JSON database files:
- `download-simple-data.js` — downloads National Dex simple data from PokeAPI
- `seaglass-download-simple-data.js` — downloads Seaglass data
- `download-evolution-chain-data.js` — downloads evolution chain data
- `csv_to_json.py` — converts CSV exports to JSON format

These are one-off developer tools, not part of the app runtime.

---

## Gen Filter Ranges

Generation filtering on the list page maps game version names to PokeAPI ID ranges:

| Gen label | ID range |
|---|---|
| red-blue | 1–151 |
| crystal | 152–251 |
| firered-leafgreen | 252–386 |
| platinum | 387–493 |
| black-2-white-2 | 494–649 |
| omega-ruby-alpha-sapphire | 650–721 |
| ultra-sun-ultra-moon | 722–809 |
| sword-shield | 810–905 |
| scarlet-violet | 906–1025 |

---

## No Test Suite

There is currently no testing framework configured (no Jest, Vitest, Playwright, etc.). `npm run lint` is the only automated quality check.

---

## Deployment

The app is deployed to Vercel (indicated by `@vercel/analytics`). No special configuration beyond standard Next.js is required for Vercel deployment. Run `npm run build` to validate a production build locally.
