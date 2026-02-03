"use client";

import React, { useId } from "react";
import { getAccentSwatchColor, getGraySwatchColor } from "./theme-engine";
import { useTheme } from "./use-theme";
import type {
  AccentColor,
  GrayColor,
  PanelBackground,
  RadiusScale,
  Scaling,
  ThemeMode
} from "./types";

const ACCENT_OPTIONS: AccentColor[] = [
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky"
];

const GRAY_OPTIONS: GrayColor[] = ["auto", "gray", "mauve", "slate", "sage", "olive", "sand"];

const RADIUS_OPTIONS: { value: RadiusScale; label: string }[] = [
  { value: "none", label: "None" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "full", label: "Full" }
];

const SCALING_OPTIONS: Scaling[] = ["90%", "95%", "100%", "105%", "110%"];

const PANEL_BACKGROUND_OPTIONS: { value: PanelBackground; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "translucent", label: "Translucent" }
];

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" }
];

const basePanelStyles: React.CSSProperties = {
  position: "fixed",
  top: "1.5rem",
  right: "1.5rem",
  zIndex: 50,
  width: "min(360px, calc(100vw - 2rem))",
  maxHeight: "calc(100vh - 3rem)",
  overflow: "auto",
  borderRadius: "var(--twui-radius, 16px)",
  color: "var(--twui-color-fg)",
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.25)",
  border: "1px solid color-mix(in srgb, var(--twui-color-fg) 12%, transparent)"
};

const gridStyles: React.CSSProperties = {
  display: "grid",
  gap: "0.5rem",
  gridTemplateColumns: "repeat(10, minmax(0, 1fr))"
};

const cardGridStyles: React.CSSProperties = {
  display: "grid",
  gap: "0.5rem",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
};

const smallGridStyles: React.CSSProperties = {
  display: "grid",
  gap: "0.5rem",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))"
};

const swatchStyles: React.CSSProperties = {
  width: "100%",
  aspectRatio: "1",
  borderRadius: "999px",
  border: "1px solid color-mix(in srgb, var(--twui-color-fg) 12%, transparent)",
  cursor: "pointer"
};

const cardStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  borderRadius: "0.75rem",
  border: "1px solid color-mix(in srgb, var(--twui-color-fg) 12%, transparent)",
  background: "color-mix(in srgb, var(--twui-color-panel-solid) 80%, var(--twui-color-bg))",
  cursor: "pointer"
};

const labelStyles: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "color-mix(in srgb, var(--twui-color-fg) 70%, transparent)"
};

export const ThemePanel = () => {
  const id = useId();
  const {
    theme,
    accentColor = "indigo",
    grayColor = "slate",
    radius = "medium",
    scaling = "100%",
    panelBackground = "translucent",
    setThemeConfig,
    hasBackground = true,
    tenantId
  } = useTheme();

  const update = (partial: Partial<Parameters<typeof setThemeConfig>[0]>) => {
    setThemeConfig({
      theme,
      accentColor,
      grayColor,
      radius,
      scaling,
      panelBackground,
      hasBackground,
      tenantId,
      ...partial
    });
  };

  const panelBackgroundValue =
    panelBackground === "solid" ? "var(--twui-color-panel-solid)" : "var(--twui-color-panel-translucent)";

  return (
    <section
      style={{ ...basePanelStyles, background: panelBackgroundValue }}
      aria-label="Theme settings"
      data-panel
    >
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>Theme</h3>

        <div style={{ marginBottom: "1.25rem" }}>
          <p id={`${id}-accent`} style={labelStyles}>
            Accent color
          </p>
          <div role="group" aria-labelledby={`${id}-accent`} style={{ ...gridStyles, marginTop: "0.75rem" }}>
            {ACCENT_OPTIONS.map((option) => (
              <label key={option} style={{ display: "block" }}>
                <input
                  type="radio"
                  name="accentColor"
                  value={option}
                  checked={accentColor === option}
                  onChange={() => update({ accentColor: option })}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <span
                  aria-hidden
                  style={{
                    ...swatchStyles,
                    backgroundColor: getAccentSwatchColor(option, theme),
                    boxShadow: accentColor === option ? "0 0 0 2px var(--twui-color-primary)" : undefined
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <p id={`${id}-gray`} style={labelStyles}>
            Gray color
          </p>
          <div role="group" aria-labelledby={`${id}-gray`} style={{ ...gridStyles, marginTop: "0.75rem" }}>
            {GRAY_OPTIONS.map((option) => (
              <label key={option} style={{ display: "block" }}>
                <input
                  type="radio"
                  name="grayColor"
                  value={option}
                  checked={grayColor === option}
                  onChange={() => update({ grayColor: option })}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <span
                  aria-hidden
                  style={{
                    ...swatchStyles,
                    backgroundColor: getGraySwatchColor(option, theme),
                    boxShadow: grayColor === option ? "0 0 0 2px var(--twui-color-primary)" : undefined
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <p id={`${id}-appearance`} style={labelStyles}>
            Appearance
          </p>
          <div role="group" aria-labelledby={`${id}-appearance`} style={{ ...cardGridStyles, marginTop: "0.75rem" }}>
            {THEME_OPTIONS.map((option) => (
              <label key={option.value} style={{ display: "block" }}>
                <input
                  type="radio"
                  name="appearance"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={() => update({ theme: option.value })}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <span
                  aria-hidden
                  style={{
                    ...cardStyles,
                    borderColor:
                      theme === option.value
                        ? "var(--twui-color-primary)"
                        : "color-mix(in srgb, var(--twui-color-fg) 12%, transparent)"
                  }}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <p id={`${id}-radius`} style={labelStyles}>
            Radius
          </p>
          <div role="group" aria-labelledby={`${id}-radius`} style={{ ...smallGridStyles, marginTop: "0.75rem" }}>
            {RADIUS_OPTIONS.map((option) => (
              <label key={option.value} style={{ display: "block", textAlign: "center" }}>
                <input
                  type="radio"
                  name="radius"
                  value={option.value}
                  checked={radius === option.value}
                  onChange={() => update({ radius: option.value })}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <span
                  aria-hidden
                  style={{
                    ...cardStyles,
                    borderRadius: option.value === "full" ? "999px" : "0.75rem",
                    borderColor:
                      radius === option.value
                        ? "var(--twui-color-primary)"
                        : "color-mix(in srgb, var(--twui-color-fg) 12%, transparent)"
                  }}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <p id={`${id}-scaling`} style={labelStyles}>
            Scaling
          </p>
          <div role="group" aria-labelledby={`${id}-scaling`} style={{ ...smallGridStyles, marginTop: "0.75rem" }}>
            {SCALING_OPTIONS.map((option) => (
              <label key={option} style={{ display: "block", textAlign: "center" }}>
                <input
                  type="radio"
                  name="scaling"
                  value={option}
                  checked={scaling === option}
                  onChange={() => update({ scaling: option })}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <span
                  aria-hidden
                  style={{
                    ...cardStyles,
                    borderColor:
                      scaling === option
                        ? "var(--twui-color-primary)"
                        : "color-mix(in srgb, var(--twui-color-fg) 12%, transparent)"
                  }}
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p id={`${id}-panel-background`} style={labelStyles}>
            Panel background
          </p>
          <div
            role="group"
            aria-labelledby={`${id}-panel-background`}
            style={{ ...cardGridStyles, marginTop: "0.75rem" }}
          >
            {PANEL_BACKGROUND_OPTIONS.map((option) => (
              <label key={option.value} style={{ display: "block" }}>
                <input
                  type="radio"
                  name="panelBackground"
                  value={option.value}
                  checked={panelBackground === option.value}
                  onChange={() => update({ panelBackground: option.value })}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <span
                  aria-hidden
                  style={{
                    ...cardStyles,
                    borderColor:
                      panelBackground === option.value
                        ? "var(--twui-color-primary)"
                        : "color-mix(in srgb, var(--twui-color-fg) 12%, transparent)"
                  }}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
