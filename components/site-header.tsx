import Link from "next/link";
import Logo from "./logo";
import { nav } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-venue/85 to-transparent backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-[72px]">
        <Logo />
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {nav.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href} className="text-dim no-underline transition hover:text-haze">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/quote"
          className="lit-fill rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-[0_0_34px_rgba(255,46,147,0.35)] transition hover:brightness-110"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
