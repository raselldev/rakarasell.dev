"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const routerPath = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => setShowMenu(false), [routerPath]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
