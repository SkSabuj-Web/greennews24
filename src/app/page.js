import { getNews } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const categories = [
  "সর্বশেষ",
  "বাংলাদেশ",
  "রাজনীতি",
  "বিশ্ব",
  "অর্থনীতি",
  "খেলা",
  "প্রযুক্তি",
  "স্বাস্থ্য",
  "বিনোদন",
];

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}


function NewsCard({ news }) {
  return (
    <Link
      href={`/article/${news.id}`}
      className="group block overflow-hidden border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="h-52 overflow-hidden bg-slate-100">
        {news.imageUrl ? (
          <img
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs font-bold text-green-600">
          {news.category}
        </span>

        <h3 className="mt-2 text-lg font-bold leading-snug transition-colors group-hover:text-green-600">
          {news.title}
        </h3>

        {news.description && (
          <p className="mt-3 line-clamp-2 text-sm text-slate-500">
            {news.description}
          </p>
        )}

        <div className="mt-4 text-xs text-slate-400">
          {formatDate(news.firstPublished)}
        </div>
      </div>
    </Link>
  );
}


async function getMostRead() {
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/most-read",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch most read");

    const result = await res.json();

    return result.data || [];
  } catch (error) {
    console.error("Most Read API Error:", error);
    return [];
  }
}

export default async function Home() {
  const news = await getNews(12);
  const mostRead = await getMostRead();


  const featured = news[0];
  const sideNews = news.slice(1, 4);
  const latestNews = news.slice(4);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Breaking News */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex h-11 max-w-7xl items-center gap-4 px-4">
          <span className="bg-green-600 px-3 py-1 text-xs font-bold whitespace-nowrap">
            সর্বশেষ
          </span>

          <p className="truncate text-sm">
            GreenNews24 — সর্বশেষ সংবাদ এক জায়গায়
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        {news.length === 0 ? (
          <div className="border border-red-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold">
              সংবাদ লোড করা সম্ভব হয়নি
            </h2>

            <p className="mt-2 text-slate-500">
              কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Featured News */}
            {featured && (
              <article className="group overflow-hidden border border-slate-200 bg-white lg:col-span-2">
                <div className="h-[380px] overflow-hidden bg-slate-100">
                  {featured.imageUrl ? (
                    <img
                      src={featured.imageUrl}
                      alt={featured.imageAlt || featured.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-sm font-bold text-green-600">
                    {featured.category}
                  </span>

                  <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
                    {featured.title}
                  </h1>

                  {featured.description && (
                    <p className="mt-3 line-clamp-2 text-slate-500">
                      {featured.description}
                    </p>
                  )}

                  <p className="mt-4 text-xs text-slate-400">
                    {formatDate(featured.firstPublished)}
                  </p>
                </div>
              </article>
            )}

            {/* Side News */}
            <div className="space-y-4">
              {sideNews.map((item) => (
                <article
                  key={item.id}
                  className="group flex gap-4 border border-slate-200 bg-white p-4"
                >
                  <div className="h-24 w-28 shrink-0 overflow-hidden bg-slate-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-green-600">
                      {item.category}
                    </span>

                    <h2 className="mt-1 line-clamp-3 text-sm font-bold leading-snug group-hover:text-green-600">
                      {item.title}
                    </h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        
<section className="mx-auto max-w-7xl px-4 pb-12">
  <div className="mb-6 flex items-center justify-between border-b border-slate-300 pb-3">
    <h2 className="text-2xl font-black">সর্বশেষ সংবাদ</h2>

    <Link
      href="/category/latest"
      className="text-sm font-bold text-green-600 transition-colors hover:text-green-700"
    >
      সব দেখুন →
    </Link>
  </div>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {latestNews.map((item) => (
      <NewsCard key={item.id} news={item} />
    ))}
  </div>
</section>


      )}
      {mostRead.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-6 border-b border-slate-300 pb-3">
            <h2 className="text-2xl font-black">
              সর্বাধিক পঠিত
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mostRead.slice(0, 6).map((item, index) => (
              <Link
                href={`/article/${item.id}`}
                key={item.id}
                className="group flex gap-4 border border-slate-200 bg-white p-4 hover:shadow-md"
              >
                <span className="text-3xl font-black text-green-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <span className="text-xs font-bold text-green-600">
                    {item.category}
                  </span>

                  <h3 className="mt-1 font-bold leading-snug group-hover:text-green-600">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}