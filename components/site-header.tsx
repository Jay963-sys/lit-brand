"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./logo";
import { nav, whatsappLink } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-venue/92"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-[72px]">
        <Logo />
        <nav className="hidden gap-9 text-sm font-medium md:flex">
          {nav.slice(0, 3).map((item) => {
            const active = !item.href.includes("#") && pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`no-underline transition hover:text-haze ${active ? "text-haze" : "text-mist"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="lit-fill lit-shimmer hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-[0_0_34px_rgba(255,81,31,0.4)] transition hover:brightness-110 sm:inline-block"
          >
            Book your event
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line md:hidden"
          >
            <span
              className={`absolute h-[1.5px] w-4 bg-haze transition ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              className={`absolute h-[1.5px] w-4 bg-haze transition ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-[100svh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex h-[calc(100svh-73px)] flex-col justify-between px-5 pt-6 pb-10 sm:px-8">
          <ul className="list-none space-y-1 p-0">
            {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
              <li key={item.href} style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }} className={`transition duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                <Link
                  href={item.href}
                  className="block py-1.5 font-display text-[clamp(24px,7vw,32px)] leading-tight font-semibold tracking-[-0.04em] text-haze no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={whatsappLink} className="label no-underline">
            Message us on WhatsApp →
          </a>
        </nav>
      </div>
    </header>
  );
}
