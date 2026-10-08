import { getNews } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getDescription(description) {
  if (typeof description === "string") {
    return description;
  }

  if (description?.blocks) {
    const text = description.blocks
      .map((block) => {
        return block?.model?.blocks?.[0]?.model?.text || "";
      })
      .filter(Boolean)
      .join(" ");

    return text;
  }

  return "";
}

function NewsCard({ news }) {
  return (
    <Link
      href={`/article/${news.id}`}
      className="group block overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
        {news.category && (
          <span className="text-xs font-bold text-green-600">
            {news.category}
          </span>
        )}

        <h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-green-600">
          {news.title}
        </h3>

        {getDescription(news.description) && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {getDescription(news.description)}
          </p>
        )}

        <p className="mt-4 text-xs text-slate-400">
          {formatDate(news.firstPublished)}
        </p>
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

    if (!res.ok) {
      throw new Error("Failed to fetch most read");
    }

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
      {/* Breaking News */}
<div className="overflow-hidden bg-slate-900 text-white">
  <div className="mx-auto flex h-11 max-w-7xl items-center px-4">
    <span className="z-10 shrink-0 bg-green-600 px-3 py-1 text-xs font-bold">
      সর্বশেষ
    </span>

    <div className="min-w-0 flex-1 overflow-hidden">
      <div className="breaking-news-track flex w-max items-center">
        {news.slice(0, 10).map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.id}`}
            className="mx-6 whitespace-nowrap text-sm font-medium transition-colors hover:text-green-400"
          >
            {item.title}
          </Link>
        ))}

        {/* Duplicate for continuous scrolling */}
        {news.slice(0, 10).map((item) => (
          <Link
            key={`duplicate-${item.id}`}
            href={`/article/${item.id}`}
            className="mx-6 whitespace-nowrap text-sm font-medium transition-colors hover:text-green-400"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
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
              <Link
                href={`/article/${featured.id}`}
                className="group block overflow-hidden border border-slate-200 bg-white lg:col-span-2"
              >
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
                  {featured.category && (
                    <span className="text-sm font-bold text-green-600">
                      {featured.category}
                    </span>
                  )}

                  <h1 className="mt-2 text-2xl font-black leading-tight text-slate-900 transition-colors group-hover:text-green-600 sm:text-3xl">
                    {featured.title}
                  </h1>

                  {getDescription(featured.description) && (
                    <p className="mt-3 line-clamp-2 text-slate-500">
                      {getDescription(featured.description)}
                    </p>
                  )}

                  <p className="mt-4 text-xs text-slate-400">
                    {formatDate(featured.firstPublished)}
                  </p>
                </div>
              </Link>
            )}

            {/* Side News */}
            <div className="space-y-4">
              {sideNews.map((item) => (
                <Link
                  href={`/article/${item.id}`}
                  key={item.id}
                  className="group flex gap-4 border border-slate-200 bg-white p-4 transition-all hover:shadow-md"
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

                  <div className="min-w-0">
                    {item.category && (
                      <span className="text-xs font-bold text-green-600">
                        {item.category}
                      </span>
                    )}

                    <h2 className="mt-1 line-clamp-3 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-green-600">
                      {item.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-6 flex items-center justify-between border-b border-slate-300 pb-3">
            <h2 className="text-2xl font-black text-slate-900">
              সর্বশেষ সংবাদ
            </h2>

            <Link
              href="/category/bengali"
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

      {/* Most Read */}
      {mostRead.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-6 border-b border-slate-300 pb-3">
            <h2 className="text-2xl font-black text-slate-900">
              সর্বাধিক পঠিত
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mostRead.slice(0, 6).map((item, index) => (
              <Link
                href={`/article/${item.id}`}
                key={item.id}
                className="group flex gap-4 border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="shrink-0 text-3xl font-black text-green-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  {item.category && (
                    <span className="text-xs font-bold text-green-600">
                      {item.category}
                    </span>
                  )}

                  <h3 className="mt-1 font-bold leading-snug text-slate-900 transition-colors group-hover:text-green-600">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}