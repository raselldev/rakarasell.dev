"use client"

import { SunIcon, MoonIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import * as React from "react"
export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
            ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
            )}
        </Button>
    )
}