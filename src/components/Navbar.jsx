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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Navbar */}
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-black sm:text-3xl">
            <span className="text-green-600">GREEN</span>
            <span className="text-slate-900">NEWS24</span>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-6 lg:flex">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={category.slug}
                className="text-sm font-semibold text-slate-700 transition hover:text-green-600"
              >
                {category.title}
              </Link>
            ))}

            <Link
              href="/search"
              className="text-lg text-slate-700 transition hover:text-green-600"
              aria-label="Search"
            >
              🔍
            </Link>
          </nav>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-2xl lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="border-t border-slate-100 py-3 lg:hidden">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={category.slug}
                onClick={() => setOpen(false)}
                className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-green-600"
              >
                {category.title}
              </Link>
            ))}

            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold text-green-600"
            >
              🔍 সংবাদ খুঁজুন
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}