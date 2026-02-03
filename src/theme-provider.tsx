"use client";

import React, { useEffect, useId, useRef } from "react";
import { ThemeContext, useThemeContextValue } from "./theme-context";
import type { ThemeProviderProps } from "./types";
import { generateThemeVariables, serializeThemeVariables } from "./theme-engine";

const STYLE_ID_PREFIX = "twui-theme";

const ensureStyleTag = (id: string): HTMLStyleElement | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const existing = document.getElementById(id);
  if (existing && existing instanceof HTMLStyleElement) {
    return existing;
  }

  const style = document.createElement("style");
  style.setAttribute("id", id);
  document.head.appendChild(style);
  return style;
};

const setRootAttributes = (theme: string, tenantId?: string) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  if (tenantId) {
    root.dataset.tenant = tenantId;
  } else {
    delete root.dataset.tenant;
  }
};

export const ThemeProvider = ({
  theme,
  tenantId,
  accentHue,
  children
}: ThemeProviderProps) => {
  const contextValue = useThemeContextValue({ theme, tenantId, accentHue });
  const id = useId();
  const styleIdRef = useRef(`${STYLE_ID_PREFIX}-${id}`);

  useEffect(() => {
    const style = ensureStyleTag(styleIdRef.current);
    if (!style) {
      return;
    }

    const variables = generateThemeVariables({ theme, tenantId, accentHue });
    style.textContent = `:root[data-theme="${theme}"]${tenantId ? `[data-tenant="${tenantId}"]` : ""} {\n${serializeThemeVariables(variables)}\n}`;
    setRootAttributes(theme, tenantId);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [theme, tenantId, accentHue]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
