"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Image from "next/image";
import Logo from "../../public/icon.svg";
import { MenuLinks } from "@/lib/menu";
import { useEffect, useState } from "react";
import HeaderMenuLinks from "./HeaderMenuLinks";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const routerPath = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => setShowMenu(false), [routerPath]);
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b bg-primary">
      <Container classNames="relative flex h-16 items-center justify-between gap-4 sm:gap-8">
        <div className="flex flex-1 items-center gap-4">
          <Link href="/">
            <div className="inline-flex gap-1.5 text-sm">
              <Image src={Logo} alt="logo" width={45} />
            </div>
          </Link>

          <HeaderMenuLinks
            menuLinks={MenuLinks}
            navClass="hidden lg:block lg:flex-1"
            ulClass="gap-4 flex"
          />
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <HeaderMenu
            showMenu={showMenu}
            handleSetShowMenu={setShowMenu}
            menuLinks={MenuLinks}
          />
        </div>
      </Container>
    </header>
  );
}
