import React, { useState } from 'react';
import { Search, X, ArrowUpRight, TrendingUp, Building2, Calendar, FileText } from 'lucide-react';
import { NewsArticle, MarketAsset, StartupCompany, EconomicEvent } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  assets: MarketAsset[];
  startups: StartupCompany[];
  events: EconomicEvent[];
  onSelectArticle: (article: NewsArticle) => void;
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  assets,
  startups,
  events,
  onSelectArticle,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedArticles = q
    ? articles.filter(
        (a) =>
          a.headline.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  const matchedAssets = q
    ? assets.filter(
        (m) =>
          m.symbol.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      )
    : [];

  const matchedStartups = q
    ? startups.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.industry.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, stocks, crypto, startups, or economic releases..."
            className="flex-1 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs font-sans">
          {!q ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              Type to search across ALPHA's global macroeconomic database...
            </div>
          ) : (
            <>
              {/* Assets Match */}
              {matchedAssets.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-2 font-mono-nums">
                    Instruments & Equities ({matchedAssets.length})
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {matchedAssets.map((asset) => (
                      <div
                        key={asset.symbol}
                        onClick={() => {
                          onSelectAsset(asset);
                          onClose();
                        }}
                        className="p-2 border border-stone-200 rounded hover:bg-stone-50 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-stone-950">{asset.symbol}</span>
                          <span className="text-stone-500 block truncate max-w-[130px]">{asset.name}</span>
                        </div>
                        <div className="text-right font-mono-nums">
                          <span className="font-semibold block">${asset.price}</span>
                          <span className={`text-[10px] ${asset.changePercent >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Match */}
              {matchedArticles.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-2 font-mono-nums">
                    Editorial Stories ({matchedArticles.length})
                  </div>
                  <div className="space-y-2">
                    {matchedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="p-2.5 border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mb-0.5">
                          <span className="font-bold text-stone-700 uppercase">{art.category}</span>
                          <span>·</span>
                          <span>{art.publishedAt}</span>
                        </div>
                        <h4 className="font-bold text-stone-900 line-clamp-1">{art.headline}</h4>
                        <p className="text-stone-500 line-clamp-1 text-[11px] mt-0.5">{art.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Startups Match */}
              {matchedStartups.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-2 font-mono-nums">
                    Startups & Venture Radar ({matchedStartups.length})
                  </div>
                  <div className="space-y-2">
                    {matchedStartups.map((s) => (
                      <div
                        key={s.id}
                        className="p-2.5 border border-stone-200 rounded hover:bg-stone-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{s.name}</span>
                          <span className="font-mono-nums text-[10px] text-amber-800">{s.fundingStage} ({s.announcedAmount})</span>
                        </div>
                        <p className="text-stone-600 line-clamp-1 text-[11px] mt-0.5">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedArticles.length === 0 && matchedAssets.length === 0 && matchedStartups.length === 0 && (
                <div className="py-8 text-center text-stone-500">
                  No verified intelligence matches found for "{query}".
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
