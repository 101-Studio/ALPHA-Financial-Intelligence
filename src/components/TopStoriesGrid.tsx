import React from 'react';
import { NewsArticle } from '../types';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface TopStoriesGridProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onFilterCategory?: (category: string) => void;
}

export const TopStoriesGrid: React.FC<TopStoriesGridProps> = ({
  articles,
  onSelectArticle,
}) => {
  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-stone-900 pb-2 mb-6">
        <h2 className="font-editorial text-2xl font-bold tracking-tight text-stone-950">
          Top Verified Stories
        </h2>
        <span className="text-xs text-stone-500 uppercase tracking-widest font-mono-nums">
          Global Desks · Live
        </span>
      </div>

      {/* Grid: 3-Column Editorial Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="flex flex-col justify-between group cursor-pointer border-b border-stone-200 pb-6 lg:border-b-0 lg:pb-0"
          >
            <div>
              {/* Thumbnail image with zero broken image fallback */}
              {article.imageUrl && (
                <div className="aspect-[4/3] rounded-sm overflow-hidden mb-3 bg-stone-100 border border-stone-200">
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Unboxed Metadata Line */}
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-amber-800">
                  {article.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-nums">{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{article.source}</span>
              </div>

              {/* Headline */}
              <h3
                className="font-editorial text-lg sm:text-xl font-bold text-stone-950 leading-snug group-hover:text-amber-900 transition-colors mb-2"
                style={{ textWrap: 'balance' }}
              >
                {article.headline}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                {article.subtitle}
              </p>
            </div>

            {/* Card Footer: Source & Verification */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="inline-flex items-center gap-1 text-[11px] text-stone-600">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                {article.verificationStatus}
              </span>
              <span className="inline-flex items-center gap-1 text-stone-900 font-semibold group-hover:text-amber-800 text-[11px]">
                <span>Read</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
