"use client";

import { useEffect, useState } from "react";

import { navItems, profile } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#08080a]/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="text-[13px] font-medium tracking-[0.18em] text-white/90 uppercase transition-opacity hover:opacity-70"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-4 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:block"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-full px-4 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#08080a]/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto max-w-[1400px] px-5 py-3">
            {[...navItems, { label: "GitHub", href: profile.github }].map(
              (item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-[15px] font-medium text-white/85"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
