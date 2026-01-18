# React Catalog (Nx + Vite)

Nx + Vite workspace for a TanStack Query product catalog with i18n, RTL, and PrimeReact UI.

## How to Run

- Serve: `nx serve my-app`
- Build: `nx build my-app`
- Lint: `nx lint my-app`
- Test: `nx test my-app` (placeholder) | e2e: `npm run test:e2e`

## Workspace Structure

- apps/my-app: Vite + React storefront shell.
- libs/ui: Shared UI widgets (toasts, layout); build/test placeholders for affected demo.
- libs/hooks: Shared hooks (form cache, storage, toast).
- libs/i18n: Translations and i18next setup.

## Architecture Rules (module boundaries)

- type:app -> only depend on type:ui, type:hooks, type:i18n.
- type:ui -> only depend on type:hooks, type:i18n.
- type:hooks -> only depend on type:ui, type:i18n.
- type:i18n -> no downstream deps.

## Affected Demo (Part A4)

Change: tweak toast text weight in [libs/ui/src/ToastHost.css](libs/ui/src/ToastHost.css).

```
npx nx affected --target=lint --target=build --target=test --files libs/ui/src/ToastHost.css --output-style=static

 NX   Running targets lint, build, test for project ui:

- ui

> nx run ui:build
> echo ui build placeholder
ui build placeholder

> nx run ui:test
> echo ui test placeholder
ui test placeholder

> nx run ui:lint
Linting "ui"...
✔ All files pass linting

 NX   Successfully ran targets lint, build, test for project ui
```

```
npx nx show projects --affected --files libs/ui/src/ToastHost.css
ui
```

## Stretch Task (S3 - CI-friendly)

- CI verification: `npm run ci:affected` (runs `nx affected -t lint,test,build --base=origin/main --head=HEAD`).

## Repo Link

- https://github.com/YosefKahlon/react-c
