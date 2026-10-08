import "./globals.css";

export const metadata = {
  title: {
    default: "GreenNews24 | সর্বশেষ বাংলা সংবাদ",
    template: "%s | GreenNews24",
  },
  description:
    "বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ। রাজনীতি, বিশ্ব, অর্থনীতি, খেলা, প্রযুক্তি, স্বাস্থ্য ও বিনোদনের খবর।",
  keywords: [
    "বাংলা নিউজ",
    "বাংলাদেশ নিউজ",
    "সর্বশেষ সংবাদ",
    "GreenNews24",
    "Bangla News",
  ],
  authors: [{ name: "GreenNews24" }],
  creator: "GreenNews24",
  publisher: "GreenNews24",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "GreenNews24 | সর্বশেষ বাংলা সংবাদ",
    description:
      "বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ। রাজনীতি, বিশ্ব, অর্থনীতি, খেলা, প্রযুক্তি, স্বাস্থ্য ও বিনোদনের খবর।",
    type: "website",
    locale: "bn_BD",
    siteName: "GreenNews24",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Subtle background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />
            <div className="absolute -right-32 top-[35%] h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />
            <div className="absolute -left-32 bottom-[15%] h-80 w-80 rounded-full bg-green-100/20 blur-3xl" />
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}