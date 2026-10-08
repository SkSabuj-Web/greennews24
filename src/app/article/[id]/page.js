import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = "https://news-api-v2.vercel.app";

async function getArticle(id) {
  try {
    const res = await fetch(`${API_URL}/api/article/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch article");
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
    <div className="space-y-8">
      {body.map((block, index) => {
        if (block.type === "image") {
          return (
            <figure key={index} className="space-y-2">
              <img
                src={block.url}
                alt={block.altText || block.caption || ""}
                className="h-auto w-full"
              />

              {block.caption && (
                <figcaption className="text-sm leading-6 text-slate-500">
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
              className="pt-3 text-2xl font-black leading-tight text-slate-900"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "text") {
          return (
            <p
              key={index}
              className="whitespace-pre-line text-lg leading-8 text-slate-700"
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

      <article className="mx-auto max-w-4xl px-4 py-10">
        {/* Category */}
        <div className="mb-5">
          <span className="text-sm font-bold text-green-600">
            সংবাদ
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          {article.byline?.length > 0 && (
            <span>
              {article.byline.map((person) => person.name).join(", ")}
            </span>
          )}

          {article.firstPublished && (
            <>
              <span>•</span>

              <span>
                {formatDate(article.firstPublished)}
              </span>
            </>
          )}
        </div>

        {/* Main Image */}
        {article.imageUrl && (
          <figure className="mt-8 overflow-hidden bg-slate-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-auto w-full"
            />
          </figure>
        )}

        {/* Description */}
        {article.description?.blocks && (
          <div className="mt-8 border-l-4 border-green-600 bg-white p-5">
            {article.description.blocks.map((block, index) => {
              const text =
                block?.model?.blocks?.[0]?.model?.text;

              if (!text) return null;

              return (
                <p
                  key={index}
                  className="text-lg font-medium leading-8 text-slate-600"
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
          <div className="mt-12 border-t border-slate-200 pt-6">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
            >
              মূল সংবাদ পড়ুন →
            </a>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}