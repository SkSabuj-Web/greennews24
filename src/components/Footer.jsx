import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-2xl font-black">
          <span className="text-green-500">GREEN</span>
          NEWS24
        </Link>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
          বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ এক জায়গায়।
        </p>

        <div className="mt-8 border-t border-slate-700 pt-5 text-sm text-slate-500">
          © 2026 GreenNews24. All rights reserved.
        </div>
      </div>
    </footer>
  );
}