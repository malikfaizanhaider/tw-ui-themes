# @tw/ui-themes

Tailwind UI theme utilities for Next.js projects. This package ships a ThemeProvider, ThemePanel widget, a hook, and theme variable helpers that work with Tailwind v4 CSS variables and an accessible color system.

## Installation

```bash
npm install @tw/ui-themes
```

## Usage (Next.js App Router)

```tsx
import { ThemePanel, ThemeProvider } from "@tw/ui-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          defaultValue={{
            theme: "light",
            accentColor: "indigo",
            grayColor: "slate",
            radius: "medium",
            scaling: "100%",
            panelBackground: "translucent"
          }}
        >
          {children}
          <ThemePanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
import { useTheme } from "@tw/ui-themes";

export const ThemeBadge = () => {
  const { theme, tenantId, accentColor, grayColor } = useTheme();
  return (
    <div>
      {theme} / {tenantId} / {accentColor} / {grayColor}
    </div>
  );
};
```

## Theme variables

`ThemeProvider` injects CSS variables on the `:root` element scoped by `data-theme` and optional `data-tenant` attributes. The accessible color system exposes 12-step `--accent-*` and `--gray-*` scales plus semantic tokens designed for high-contrast UI composition.

```css
:root[data-theme="light"][data-tenant="acme"] {
  --twui-color-bg: hsl(215 12% 99%);
  --twui-color-fg: hsl(215 12% 36%);
  --twui-color-primary: hsl(245 78% 60%);
  --accent-9: hsl(245 78% 60%);
  --gray-9: hsl(215 12% 60%);
}
```

## Tailwind v4 usage

Tailwind v4 can reference the generated CSS variables directly in `@theme` for utilities and components.

```css
@theme {
  --color-bg: var(--twui-color-bg);
  --color-fg: var(--twui-color-fg);
  --color-primary: var(--twui-color-primary);
}
```

## Development

```bash
npm run build
npm run typecheck
```
