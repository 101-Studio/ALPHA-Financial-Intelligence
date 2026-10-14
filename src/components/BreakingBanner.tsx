import React from 'react';
import { Radio, ArrowRight, X } from 'lucide-react';
import { NewsArticle } from '../types';

interface BreakingBannerProps {
  article: NewsArticle;
  onSelect: (article: NewsArticle) => void;
  onDismiss?: () => void;
}

export const BreakingBanner: React.FC<BreakingBannerProps> = ({
  article,
  onSelect,
  onDismiss,
}) => {
  return (
    <div className="bg-stone-900 text-stone-100 border-b border-stone-800 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            <Radio className="w-3.5 h-3.5" />
            <span>Breaking Report</span>
          </div>
          <span aria-hidden="true" className="text-stone-700">·</span>
          <button
            onClick={() => onSelect(article)}
            className="truncate hover:underline text-stone-200 hover:text-white text-left font-medium"
          >
            {article.headline}
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelect(article)}
            className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            <span>Analysis</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-stone-500 hover:text-stone-300 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
