import React from 'react';
import { MarketAsset } from '../types';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface MarketTickerProps {
  assets: MarketAsset[];
  onSelectAsset?: (asset: MarketAsset) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({
  assets,
  onSelectAsset,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="border-b border-stone-200 bg-white/90 backdrop-blur-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-4">
        {/* Ticker label & refresh trigger */}
        <div className="flex items-center gap-2 shrink-0 border-r border-stone-200 pr-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-900">
            Markets
          </span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
              title="Refresh Market Prices"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
            </button>
          )}
        </div>

        {/* Horizontal scrollable track with tabular figures */}
        <div className="flex-1 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-6 whitespace-nowrap text-xs font-mono-nums">
            {assets.map((asset) => {
              const isPositive = asset.changePercent >= 0;
              return (
                <button
                  key={asset.symbol}
                  onClick={() => onSelectAsset && onSelectAsset(asset)}
                  className="flex items-center gap-2 hover:bg-stone-50 px-2 py-1 rounded transition-colors group text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-semibold text-stone-900 group-hover:text-amber-800">
                    {asset.symbol}
                  </span>
                  <span className="text-stone-700">
                    {asset.category === 'Bond'
                      ? `${asset.price.toFixed(3)}%`
                      : asset.price >= 1000
                      ? asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : asset.price.toFixed(asset.category === 'Forex' ? 4 : 2)}
                  </span>
                  <span
                    className={`flex items-center text-[11px] font-medium ${
                      isPositive ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status disclosure */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 pl-3 border-l border-stone-200 text-[10px] text-stone-400 font-mono-nums">
          <span>Delayed ~15m</span>
          <span>·</span>
          <span>Crypto 24/7</span>
        </div>
      </div>
    </div>
  );
};
