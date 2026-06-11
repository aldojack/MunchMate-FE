# MunchMate FE

MunchMate FE is the frontend for a meal planning application built with React, TypeScript, and Vite. It supports recipe browsing, recipe creation, weekly meal planning, and a shopping list drawer.

## Features

- Client-side routing with React Router
- Meal planner page with contextual state
- Recipe listing, recipe details, and add recipe form
- Shopping list drawer with floating action button
- Theme provider and reusable shared components
- Tailwind CSS plus MUI for visual components

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at the address shown by Vite.

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - compile TypeScript and build the production bundle
- `npm run preview` - locally preview the production build
- `npm run lint` - run ESLint on the repository
- `npm run jsonServer` - optional local JSON server (requires `src/data/db.json`)

## Project structure

- `src/App.tsx` - application entry point and route definitions
- `src/main.tsx` - React root setup and theme provider
- `src/features` - feature modules for home, recipes, planner, and shopping list
- `src/context` - shared React context providers and hooks
- `src/components` - reusable shared UI components
- `src/utils` - helper utilities and local storage helpers

## Key technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- MUI
- React Router
- ESLint with TypeScript rules

## Conventions

- Use `@` alias imports for local modules
- Keep feature pages under `src/features/*/pages`
- Keep shared UI in `src/components`
- Prefer context providers for application state
- Use strict TypeScript typings and run `npm run lint`

## Notes

If you add new routes, keep them registered in `src/App.tsx`.
If you add shared app state, add a context provider in `src/context` and wrap it at the top level.

## Standards

See [`STANDARDS.md`](./docs/STANDARDS.md) for repository conventions, folder guidance, and coding norms.
