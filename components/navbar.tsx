"use client";

import Link from "next/link";
import Container from "./layout/container";
import Logo from "@/public/icon.svg";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { Links } from "@/lib/menu";

export default function Navbar() {
  const [navShow, setNavShow] = useState<boolean>(false);

  const onToggleNav = () => {
    setNavShow((status: boolean) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };
  return (
    <Container>
      <div className="flex flex-col justify-between sticky">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="rakarasell.dev">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Image src={Logo} alt="logo" />
                </div>
                {/* <div className="hidden h-6 text-2xl font-semibold sm:block text-primary">
                  Personal Portfolio
                </div> */}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {Links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-primary sm:p-4 hover:text-accent"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden">
              <button
                type="button"
                className="ml-1 mr-1 h-8 w-8 rounded py-1"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`fixed top-0 left-0 z-50 h-full w-full transform opacity-100 duration-300 ease-in-out bg-primary ${
                  navShow ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-10 mt-11 h-8 w-8 rounded"
                    aria-label="Toggle Menu"
                    onClick={onToggleNav}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="text-secondary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <nav className="fixed h-full items-center">
                  {Links.map((link) => (
                    <div key={link.title} className="px-6 py-4">
                      <Link
                        href={link.href}
                        className="text-2xl font-bold tracking-widest text-secondary"
                        onClick={onToggleNav}
                      >
                        {link.title}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Container>
  );
}
