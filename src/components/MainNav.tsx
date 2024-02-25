"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { MenuLinks } from "@/lib/menu"

export default function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <h1 className="h-6 font-bold">RRSLL</h1>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                {MenuLinks.map((x) => {
                    return (
                        <Link
                            key={x.href}
                            href={x.href}
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === x.href ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {x.title}
                        </Link>
                    )
                })}

            </nav>
        </div>
    )
}