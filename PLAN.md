# Tailwind v4 Planning for @tw/ui-themes

This plan translates the provided architecture diagram into a concrete Tailwind v4–aligned roadmap for the `@tw/ui-themes` package.

## Objectives
- **Tailwind v4 native CSS variables**: Use the v4 config + CSS variables flow for tokens and semantic colors.
- **Theme management**: Expose a runtime API that maps `tenantId` and `accentHue` to generated scales.
- **Composable integration**: Provide a Tailwind plugin that merges with application configs.

## Architecture Mapping (from diagram)
1. **Theme management layer**
   - `ThemeProvider(theme, tenantId, accentHue)` and `useTheme()` expose active theme state.
   - Updates `data-theme` and `data-tenant` attributes in the DOM.
2. **Configuration engine**
   - `extractHueFromColor(color) -> hue`
   - `generateColorScale(hue) -> colors`
   - `generateThemeVariables(config) -> CSS`
3. **CSS variable system**
   - Base tokens (spacing, typography)
   - Semantic colors (primary, background, etc.)
   - Color scales (gray, accent)
4. **Tailwind integration**
   - `twUIThemesPlugin` extends utilities and exposes CSS variables.
   - Utilities (`bg-*`, `text-*`, etc.) rely on the generated variables.

## Tailwind v4 Plan
### 1. Core package structure
- `packages/theme-core/`
  - `theme-provider.tsx`
  - `use-theme.ts`
  - `types.ts`
- `packages/theme-engine/`
  - `extract-hue.ts`
  - `generate-color-scale.ts`
  - `generate-theme-variables.ts`
- `packages/tailwind-plugin/`
  - `index.ts`
  - `tokens.ts`

### 2. Token + semantic variable model
- **Base tokens**: spacing, typography, radii, shadows.
- **Semantic variables**: `--color-bg`, `--color-fg`, `--color-primary`, `--color-accent`.
- **Tenant + theme scopes**:
  - `:root[data-tenant="acme"][data-theme="light"] { ... }`
  - `:root[data-tenant="acme"][data-theme="dark"] { ... }`

### 3. Tailwind v4 configuration usage
- Prefer Tailwind v4 `@theme` and CSS variable driven config.
- The plugin should:
  - Register base CSS variables for tokens.
  - Register theme/tenant variable sets as utilities or components.
  - Provide a helper for app-side config composition.

### 4. Runtime flow
1. `ThemeProvider` receives `theme`, `tenantId`, `accentHue`.
2. `ThemeProvider` calls `generateThemeVariables()` to compute CSS.
3. Variables are injected into a `<style>` tag or CSSOM (with SSR-safe path).
4. DOM attributes `data-theme` / `data-tenant` are updated to drive cascade.

### 5. Migration stages
1. **Scaffold** package structure and base interfaces.
2. **Implement** color engine functions and CSS variable generator.
3. **Tailwind v4 plugin** output for tokens + semantic colors.
4. **Demo app** for verification (optional).

## Deliverables
- Tailwind v4 plugin for `@tw/ui-themes`.
- Theme management utilities (provider + hook).
- Documented configuration schema and examples.

## Next Steps
- Confirm scope: React-only or multi-framework.
- Decide variable injection strategy (style tag vs. precompiled CSS).
- Define exact token schema (spacing, typography, radii, shadows).
