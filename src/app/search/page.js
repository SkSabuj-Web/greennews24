import Link from "next/link";
import Navbar from "@/components/Navbar";

const API_URL = "https://news-api-v2.vercel.app";

async function searchNews(query) {
  if (!query) return [];

  try {
    const res = await fetch(
      `${API_URL}/api/news?q=${encodeURIComponent(query)}&limit=20`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("Search failed");

    const result = await res.json();

    return result.data || [];
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  const news = await searchNews(query);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 border-b-2 border-slate-900 pb-4">
          <h1 className="text-3xl font-black sm:text-4xl">
            সংবাদ খুঁজুন
          </h1>
        </div>

        <form action="/search" method="GET" className="mb-10 flex gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="সংবাদের নাম লিখুন..."
            className="min-w-0 flex-1 border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600"
          />

          <button
            type="submit"
            className="bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
          >
            খুঁজুন
          </button>
        </form>

        {query && (
          <p className="mb-6 text-slate-500">
            <span className="font-bold text-slate-800">
              "{query}"
            </span>{" "}
            এর জন্য {news.length}টি সংবাদ পাওয়া গেছে।
          </p>
        )}

        {!query ? (
          <div className="border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-500">
              উপরের search box ব্যবহার করে সংবাদ খুঁজুন।
            </p>
          </div>
        ) : news.length === 0 ? (
          <div className="border border-slate-200 bg-white p-12 text-center">
            <h2 className="text-xl font-bold">
              কোনো সংবাদ পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-slate-500">
              অন্য কোনো keyword দিয়ে চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Link
                href={`/article/${item.id}`}
                key={item.id}
                className="group overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-52 overflow-hidden bg-slate-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span className="text-xs font-bold text-green-600">
                    {item.category}
                  </span>

                  <h2 className="mt-2 line-clamp-3 text-lg font-bold leading-snug group-hover:text-green-600">
                    {item.title}
                  </h2>

                  {item.description && (
                    <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                      {item.description}
                    </p>
                  )}

                  <p className="mt-4 text-xs text-slate-400">
                    {formatDate(item.firstPublished)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}