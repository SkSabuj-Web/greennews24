import Link from "next/link";
import Navbar from "@/components/Navbar";

const API_URL = "https://news-api-v2.vercel.app";

async function getCategoryNews(slug) {
    try {
        const res = await fetch(`${API_URL}/api/category/${slug}`, {
            next: { revalidate: 300 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch category news");
        }

        const result = await res.json();

        return result;
    } catch (error) {
        console.error("Category API Error:", error);
        return null;
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

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const result = await getCategoryNews(slug);

    const news = result?.data || [];
    const categoryTitle = result?.title || slug;

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <Navbar />

            {/* Category Heading */}
            <section className="mx-auto max-w-7xl px-4 pb-6 pt-10">
                <div className="border-b-2 border-slate-900 pb-4">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">
                        GreenNews24
                    </p>

                    <h1 className="text-3xl font-black sm:text-4xl">
                        {categoryTitle}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        মোট {news.length}টি সংবাদ
                    </p>
                </div>
            </section>

            {/* News */}
            <section className="mx-auto max-w-7xl px-4 pb-14">
                {news.length === 0 ? (
                    <div className="border border-slate-200 bg-white p-10 text-center">
                        <h2 className="text-xl font-bold">
                            কোনো সংবাদ পাওয়া যায়নি
                        </h2>

                        <p className="mt-2 text-slate-500">
                            অন্য category চেষ্টা করুন।
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
                                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="mt-4 text-xs text-slate-400">
                                        {formatDate(item.firstPublished)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 px-4 py-8 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="text-xl font-black">
                        <span className="text-green-500">GREEN</span>NEWS24
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                        সর্বশেষ সংবাদ, সবসময় আপনার হাতের কাছে।
                    </p>

                    <div className="mt-6 border-t border-slate-700 pt-5 text-sm text-slate-500">
                        © 2026 GreenNews24. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}