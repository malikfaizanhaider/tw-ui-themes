# @tw/ui-themes

Tailwind UI theme utilities for Next.js projects. This package ships a small ThemeProvider, a hook, and theme variable helpers that work with Tailwind v4 CSS variables.

## Installation

```bash
npm install @tw/ui-themes
```

## Usage (Next.js App Router)

```tsx
import { ThemeProvider } from "@tw/ui-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme="light" tenantId="acme" accentHue={250}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
import { useTheme } from "@tw/ui-themes";

export const ThemeBadge = () => {
  const { theme, tenantId, accentHue } = useTheme();
  return (
    <div>
      {theme} / {tenantId} / {accentHue}
    </div>
  );
};
```

## Theme variables

`ThemeProvider` injects CSS variables on the `:root` element scoped by `data-theme` and optional `data-tenant` attributes.

```css
:root[data-theme="light"][data-tenant="acme"] {
  --twui-color-bg: #ffffff;
  --twui-color-fg: #0b0b0f;
  --twui-color-primary: hsl(250 90% 55%);
}
```

## Development

```bash
npm run build
npm run typecheck
```
