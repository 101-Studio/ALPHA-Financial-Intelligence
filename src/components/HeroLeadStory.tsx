import React from 'react';
import { NewsArticle } from '../types';
import { ArrowUpRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

interface HeroLeadStoryProps {
  article: NewsArticle;
  onReadArticle: (article: NewsArticle) => void;
  onOpenAnalysis: (article: NewsArticle) => void;
}

export const HeroLeadStory: React.FC<HeroLeadStoryProps> = ({
  article,
  onReadArticle,
  onOpenAnalysis,
}) => {
  return (
    <article className="border-b border-stone-200 pb-10 mb-10">
      {/* Category & Verification Kicker */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 mb-3">
        <span className="font-bold tracking-wider uppercase text-amber-800">
          Global Financial Lead
        </span>
        <span aria-hidden="true">·</span>
        <span className="font-mono-nums">{article.publishedAt}</span>
        <span aria-hidden="true">·</span>
        <span className="text-stone-700 font-medium">{article.source}</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          {article.verificationStatus}
        </span>
      </div>

      {/* Main Grid: Asymmetrical Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Headline, Subtitle, Deck & Takeaways (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h1
              onClick={() => onReadArticle(article)}
              className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-[1.12] hover:text-amber-900 cursor-pointer transition-colors mb-4"
              style={{ textWrap: 'balance' }}
            >
              {article.headline}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans mb-6">
              {article.subtitle}
            </p>

            {/* Key Macro Takeaways (Editorial Bullet List) */}
            <div className="border-y border-stone-200 py-4 my-5 bg-stone-50/50 px-4 rounded-sm">
              <h2 className="text-xs uppercase tracking-wider font-bold text-stone-900 mb-2.5">
                Executive Transmission Channels
              </h2>
              <ul className="space-y-2 text-xs text-stone-700 leading-relaxed">
                {article.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-stone-400 font-mono-nums">0{idx + 1}.</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onReadArticle(article)}
              className="px-5 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-2 group"
            >
              <span>Read Full Report & Scenarios</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={() => onOpenAnalysis(article)}
              className="px-4 py-2.5 border border-stone-300 hover:border-stone-900 bg-white text-stone-800 hover:text-stone-950 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Transmission Matrix</span>
            </button>

            <span className="text-xs text-stone-500 font-mono-nums ml-auto">
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Right Column: High-Impact Editorial Image & Caption (5 cols) */}
        <div className="lg:col-span-5">
          <div
            onClick={() => onReadArticle(article)}
            className="group cursor-pointer overflow-hidden rounded-md border border-stone-200 bg-stone-100"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.headline}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />
            </div>
          </div>
          {article.imageCaption && (
            <p className="text-[11px] text-stone-500 font-serif italic mt-2.5 leading-snug">
              {article.imageCaption}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
