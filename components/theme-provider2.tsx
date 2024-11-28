// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode,
  attribute?: "class" | "data-theme" | "data-mode",
  defaultTheme?: "dark" | "light" | "system",
  enableSystem?: boolean,
  disableTransitionOnChange?: boolean,
  storageKey?: string,
  themes?: string[],
  forcedTheme?: string,
  enableColorScheme?: boolean,
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}