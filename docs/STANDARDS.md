# Project Standards for MunchMate FE

## Purpose

This document captures the main conventions for frontend development in the MunchMate FE repository. It is intended for contributors and maintainers so the codebase remains consistent and easy to extend.

## Project conventions

- Use React with TypeScript exclusively.
- Keep component logic and presentation separated when it improves readability.
- Prefer small, reusable components in `src/components` and feature-scoped components in `src/features`.
- Use `@` alias imports for local project modules (configured in Vite).
- Keep `any` usage out of the codebase unless there is a practical, short-term migration reason.

## Folder structure

- `src/components`: shared UI components used across features.
- `src/context`: global React context providers and hooks.
- `src/features`: feature-based modules with isolated pages, components, and state.
- `src/utils`: small utility helpers and local storage helpers.
- `src/assets`: static assets or images specific to the app.

## React patterns

- Use function components and React hooks.
- Maintain a top-level provider hierarchy in `src/App.tsx`.
- Keep routeable pages under feature directories, e.g. `src/features/home/pages/Home.tsx`.
- Use context providers for app-wide state: recipes, meal planner, shopping list, and theme.
- Prefer composition over prop drilling for shared UI behavior.

## Styling

- Use Tailwind utility classes for layout and spacing.
- Use MUI components only when a reusable, accessible control is required.
- Keep visual styling inside component markup unless a shared style utility is needed.

## TypeScript and linting

- Run `npm run lint` before committing.
- Use strict typing wherever possible.
- Prefer `type` over using `interface` unless needing to `extend` from another object.
- Keep lint fixes local to the relevant file and avoid disabling rules globally.

## Git workflow

- Keep commits small and focused.
- Use meaningful commit messages.
- Update documentation when adding or changing features.

## README and docs

- Keep [`README.md`](../README.md) current as the canonical onboarding reference.
- Add new standards or architecture notes to `STANDARDS.md` rather than expanding README with too much detail.
