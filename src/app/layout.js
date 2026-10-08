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
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}