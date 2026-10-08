import Link from "next/link";

const footerLinks = [
  { title: "হোম", href: "/" },
  { title: "রাজনীতি", href: "/category/politics" },
  { title: "বিশ্ব", href: "/category/world" },
  { title: "অর্থনীতি", href: "/category/economy" },
  { title: "খেলা", href: "/category/sports" },
  { title: "প্রযুক্তি", href: "/category/technology" },
  { title: "স্বাস্থ্য", href: "/category/health" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-xl font-black shadow-lg shadow-green-600/20 transition-transform duration-300 group-hover:scale-105">
                G
              </span>

              <span className="text-2xl font-black tracking-tight">
                GREEN<span className="text-green-500">NEWS24</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, গুরুত্বপূর্ণ আপডেট এবং
              নির্ভরযোগ্য খবর এক জায়গায়।
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-400">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              সর্বশেষ সংবাদে আপডেট থাকুন
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              দ্রুত লিংক
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-green-400"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GreenNews24. All rights reserved.</p>

          <p>
            Made for better news experience.
          </p>
        </div>
      </div>
    </footer>
  );
}