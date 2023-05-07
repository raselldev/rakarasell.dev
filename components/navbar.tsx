"use client";

import Link from "next/link";
import Container from "./layout/container";
import Logo from "@/public/icon.svg";
import Image from "next/image";
import { Links } from "@/lib/menu";

export default function Navbar() {
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
                  target={link.title === "GitHub" ? "_blank" : undefined}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </header>
      </div>
    </Container>
  );
}
