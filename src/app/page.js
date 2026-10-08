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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-200 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {news.imageUrl ? (
          <img
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No Image
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category Badge */}
        {news.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-green-700 shadow-sm backdrop-blur-sm">
            {news.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-3 text-lg font-extrabold leading-7 text-slate-900 transition-colors duration-200 group-hover:text-green-600">
          {news.title}
        </h3>

        {getDescription(news.description) && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {getDescription(news.description)}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-xs font-medium text-slate-400">
            {formatDate(news.firstPublished)}
          </p>

          <span className="text-xs font-bold text-green-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            পড়ুন →
          </span>
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
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {news.length === 0 ? (
          <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
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
                className="group relative overflow-hidden rounded-2xl bg-slate-900 lg:col-span-2"
              >
                <div className="relative h-[420px] overflow-hidden sm:h-[480px]">
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

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                    {featured.category && (
                      <span className="inline-flex rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                        {featured.category}
                      </span>
                    )}

                    <h1 className="mt-3 max-w-3xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                      {featured.title}
                    </h1>

                    {getDescription(featured.description) && (
                      <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                        {getDescription(featured.description)}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                      <span>{formatDate(featured.firstPublished)}</span>
                      <span>•</span>
                      <span className="font-semibold text-green-400">
                        বিস্তারিত পড়ুন →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Side News */}
            <div className="flex flex-col gap-4">
              {sideNews.map((item, index) => (
                <Link
                  href={`/article/${item.id}`}
                  key={item.id}
                  className="group flex flex-1 gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                >
                  <div className="h-28 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-36">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 py-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-green-600">
                        0{index + 1}
                      </span>

                      {item.category && (
                        <span className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-400">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 line-clamp-4 text-sm font-bold leading-6 text-slate-900 transition-colors group-hover:text-green-600">
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
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <div className="mb-7 flex items-end justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                  Latest Updates
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                সর্বশেষ সংবাদ
              </h2>
            </div>

            <Link
              href="/category/bengali"
              className="group hidden items-center gap-1 text-sm font-bold text-slate-500 transition-colors hover:text-green-600 sm:flex"
            >
              সব দেখুন
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          <Link
            href="/category/bengali"
            className="mt-6 flex items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-600 sm:hidden"
          >
            সব সংবাদ দেখুন →
          </Link>
        </section>
      )}

      {/* Most Read */}
      {/* Most Read */}
      {mostRead.length > 0 && (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <div className="mb-7">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                  Trending
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                সর্বাধিক পঠিত
              </h2>
            </div>

            <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
              {mostRead.slice(0, 6).map((item, index) => (
                <Link
                  href={`/article/${item.id}`}
                  key={item.id}
                  className="group flex gap-5 border-b border-slate-100 py-4 transition-colors hover:border-green-200"
                >
                  {/* Number */}
                  <span className="w-10 shrink-0 text-3xl font-black leading-none text-slate-200 transition-colors group-hover:text-green-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="min-w-0">
                    {item.category && (
                      <span className="text-[11px] font-bold uppercase tracking-wide text-green-600">
                        {item.category}
                      </span>
                    )}

                    <h3 className="mt-1 line-clamp-2 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-green-600 sm:text-lg">
                      {item.title}
                    </h3>

                    <span className="mt-2 inline-block text-xs font-semibold text-slate-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                      বিস্তারিত পড়ুন →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}