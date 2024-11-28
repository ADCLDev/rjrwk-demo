"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-9 w-9 rounded-md border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
    >
      <Sun className="absolute h-4 w-4 rotate-0 scale-100 transform-gpu text-neutral-600 transition-all duration-200 dark:rotate-90 dark:scale-0 dark:text-neutral-400" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transform-gpu text-neutral-600 transition-all duration-200 dark:rotate-0 dark:scale-100 dark:text-neutral-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}