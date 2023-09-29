"use client";

import HeaderMenuLinks from "./HeaderMenuLinks";
import Image from "next/image";
import Hamburger from "../../public/hamburger.svg";

type HeaderMenuProps = {
  showMenu: boolean;
  handleSetShowMenu: (show: boolean) => void;
  menuLinks: MenuLink[];
};

export default function HeaderMenu({
  showMenu,
  handleSetShowMenu,
  menuLinks,
}: HeaderMenuProps): JSX.Element {
  return (
    <div className="flex items-center lg:hidden">
      <button onClick={() => handleSetShowMenu(!showMenu)}>
        <Image src={Hamburger} alt="logo" />

        <span className="sr-only">Toggle menu</span>
      </button>

      {showMenu && (
        <div className="absolute inset-x-0 top-14 px-2">
          <HeaderMenuLinks
            menuLinks={menuLinks}
            navClass="bg-primary border p-4 border-gray-200 shadow-lg rounded-lg"
            ulClass="space-y-4"
          />
        </div>
      )}
    </div>
  );
}
