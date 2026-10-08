"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { title: "হোম", slug: "/" },
  { title: "রাজনীতি", slug: "/category/politics" },
  { title: "বিশ্ব", slug: "/category/world" },
  { title: "অর্থনীতি", slug: "/category/economy" },
  { title: "খেলা", slug: "/category/sports" },
  { title: "প্রযুক্তি", slug: "/category/technology" },
  { title: "স্বাস্থ্য", slug: "/category/health" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="GreenNews24 Home"
          >
            {/* Logo Mark */}
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-green-600 shadow-md shadow-green-600/20 transition-transform duration-300 group-hover:scale-105">
              <span className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-green-500/40" />

              <span className="relative text-xl font-black text-white">
                G
              </span>
            </span>

            {/* Brand */}
            <span className="flex flex-col leading-none">
              <span className="text-[20px] font-black tracking-tight text-slate-900 sm:text-[22px]">
                GREEN<span className="text-green-600">NEWS</span>
              </span>

              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Bangladesh • World
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={category.slug}
                className="rounded-lg px-3 py-2 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
              >
                {category.title}
              </Link>
            ))}

            {/* Search */}
            <Link
              href="/search"
              aria-label="Search"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-600 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="border-t border-slate-100 py-3 lg:hidden">
            <div className="grid grid-cols-2 gap-1 pb-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={category.slug}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-600"
                >
                  {category.title}
                </Link>
              ))}
            </div>

            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-3 text-sm font-bold text-green-700 transition hover:bg-green-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              সংবাদ খুঁজুন
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}