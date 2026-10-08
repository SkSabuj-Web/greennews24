"use client";

import Link from "next/link";

export default function BreakingNews({ news }) {
  const breakingNews = news.slice(0, 10);

  return (
    <div className="overflow-hidden bg-slate-900 text-white">
      <div className="mx-auto flex h-11 max-w-7xl items-center px-4">
        <span className="z-20 shrink-0 bg-green-600 px-3 py-1 text-xs font-bold">
          সর্বশেষ
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="breaking-track">
            <div className="breaking-content">
              {breakingNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/article/${item.id}`}
                  className="breaking-item"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="breaking-content" aria-hidden="true">
              {breakingNews.map((item) => (
                <Link
                  key={`copy-${item.id}`}
                  href={`/article/${item.id}`}
                  className="breaking-item"
                  tabIndex={-1}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}