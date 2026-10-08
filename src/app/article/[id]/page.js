import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const instant = false;

const API_URL = "https://news-api-v2.vercel.app";

async function getArticle(id) {
  try {
    const res = await fetch(`${API_URL}/api/article/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Article API Error:", error);
    return null;
  }
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}

function ArticleBody({ body }) {
  if (!Array.isArray(body)) {
    return null;
  }

 return (
  <div className="space-y-10">
    {body.map((block, index) => {
      if (block.type === "image") {
        return (
          <figure key={index}>
            <div className="overflow-hidden rounded-xl bg-slate-100">
              <img
                src={block.url}
                alt={block.altText || block.caption || ""}
                className="h-auto w-full"
              />
            </div>

            {block.caption && (
              <figcaption className="mt-3 text-sm leading-6 text-slate-500">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      if (block.type === "subheading") {
        return (
          <h2
            key={index}
            className="border-l-4 border-green-600 pl-4 pt-2 text-2xl font-black leading-tight text-slate-900 sm:text-3xl"
          >
            {block.text}
          </h2>
        );
      }

      if (block.type === "text") {
        return (
          <p
            key={index}
            className="whitespace-pre-line text-[17px] leading-8 text-slate-700 sm:text-lg sm:leading-9"
          >
            {block.text}
          </p>
        );
      }

      return null;
    })}
  </div>
);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "সংবাদ পাওয়া যায়নি | GreenNews24",
    };
  }

  return {
    title: `${article.title} | GreenNews24`,
    description:
      typeof article.description === "string"
        ? article.description
        : "GreenNews24 - সর্বশেষ বাংলা সংবাদ",
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <section className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-black">
            সংবাদ পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-slate-500">
            সংবাদটি হয়তো আর পাওয়া যাচ্ছে না।
          </p>

          <Link
            href="/"
            className="mt-6 inline-block bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
          >
            ← হোমে ফিরে যান
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

return (
  <main className="min-h-screen bg-slate-50">
    <Navbar />

    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Article Header */}
      <header className="mx-auto max-w-4xl">
        {/* Category */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-600" />

          <span className="text-xs font-bold uppercase tracking-wider text-green-600">
            সংবাদ
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-200 py-4 text-sm text-slate-500">
          {article.byline?.length > 0 && (
            <span className="font-semibold text-slate-700">
              {article.byline.map((person) => person.name).join(", ")}
            </span>
          )}

          {article.firstPublished && (
            <>
              <span className="text-slate-300">•</span>

              <span>{formatDate(article.firstPublished)}</span>
            </>
          )}
        </div>
      </header>

      {/* Main Image */}
      {article.imageUrl && (
        <figure className="mt-8 overflow-hidden rounded-2xl bg-slate-100 shadow-sm sm:mt-10">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-auto w-full object-cover"
          />
        </figure>
      )}

      {/* Article Content */}
      <div className="mx-auto max-w-3xl">
        {/* Description */}
        {article.description?.blocks && (
          <div className="mt-8 rounded-r-xl border-l-4 border-green-600 bg-white p-5 shadow-sm sm:p-6">
            {article.description.blocks.map((block, index) => {
              const text =
                block?.model?.blocks?.[0]?.model?.text;

              if (!text) return null;

              return (
                <p
                  key={index}
                  className="text-base font-medium leading-8 text-slate-600 sm:text-lg"
                >
                  {text}
                </p>
              );
            })}
          </div>
        )}

        {/* Article Body */}
        <div className="mt-10">
          <ArticleBody body={article.body} />
        </div>

        {/* Source */}
        {article.link && (
          <div className="mt-12 border-t border-slate-200 pt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Original Source
            </p>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md"
            >
              মূল সংবাদ পড়ুন
              <span className="text-base">↗</span>
            </a>
          </div>
        )}
      </div>
    </article>

    <Footer />
  </main>
);
}