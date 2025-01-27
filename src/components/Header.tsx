"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuLinks } from "@/lib/menu";

export default function Header() {
  const routerPath = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => setShowMenu(false), [routerPath]);

  const handleNav = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-base-200 shadow">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 px-2">
                <h1 className="text-xl font-semibold">
                  <a href="/">
                    RRSLL<span className="text-primary">.</span>
                  </a>
                </h1>

                <button
                  className="text-white hover:text-secondary"
                  onClick={handleNav}
                >
                  <Menu size={24} />
                </button>
                <nav
                  className={cn(
                    "fixed top-0 left-0 w-full h-screen bg-base-200 bg-opacity-80 backdrop-blur transform transition-transform duration-300 ease-in-out",
                    showMenu ? "translate-x-0" : "-translate-x-full"
                  )}
                >
                  <div className="flex flex-col items-center mt-20 p-6 space-y-4">
                    {MenuLinks.map((x) => {
                      return (
                        <a
                          key={x.title}
                          href={x.href}
                          target={x.external ? "_blank" : ""}
                          className="text-white transform transition-transform duration-300 ease-in-out text-center text-lg font-medium hover:text-primary"
                        >
                          {x.title}
                        </a>
                      );
                    })}
                    <button
                      className="text-white p-2 hover:text-secondary rounded-full border-white border"
                      onClick={handleNav}
                    >
                      <X size={24} />
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
