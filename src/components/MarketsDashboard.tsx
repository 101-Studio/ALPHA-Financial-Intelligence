import React, { useState } from 'react';
import { MarketAsset } from '../types';
import { TrendingUp, TrendingDown, Search, ArrowUpDown, Filter, BarChart2 } from 'lucide-react';

interface MarketsDashboardProps {
  assets: MarketAsset[];
  stocksToWatch: MarketAsset[];
  onSelectAsset?: (asset: MarketAsset) => void;
}

export const MarketsDashboard: React.FC<MarketsDashboardProps> = ({
  assets,
  stocksToWatch,
  onSelectAsset,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'stocks' | 'indices' | 'crypto' | 'commodities' | 'bonds'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'symbol' | 'price' | 'changePercent'>('changePercent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Combine general market assets and individual stocks
  const combinedAssets = [...assets, ...stocksToWatch.filter(s => !assets.some(a => a.symbol === s.symbol))];

  const filteredAssets = combinedAssets.filter(item => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'stocks' && item.category === 'Stock') ||
      (activeTab === 'indices' && item.category === 'Index') ||
      (activeTab === 'crypto' && item.category === 'Crypto') ||
      (activeTab === 'commodities' && (item.category === 'Commodity' || item.category === 'Forex')) ||
      (activeTab === 'bonds' && item.category === 'Bond');

    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    let factor = sortOrder === 'desc' ? -1 : 1;
    if (sortField === 'symbol') return a.symbol.localeCompare(b.symbol) * factor;
    if (sortField === 'price') return (a.price - b.price) * factor;
    return (a.changePercent - b.changePercent) * factor;
  });

  const handleSort = (field: 'symbol' | 'price' | 'changePercent') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            Real-Time Intelligence
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Global Financial Terminal
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Institutional asset pricing across equities, fixed income yields, forex cross-rates, and commodity benchmarks.
          </p>
        </div>

        {/* Tab Controls (Functional Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg">
          {(['all', 'indices', 'stocks', 'commodities', 'crypto', 'bonds'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symbol (e.g. NVDA, SPX, BTC, XAU)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:border-stone-900 text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <div className="text-xs text-stone-500 font-mono-nums">
          Showing {sortedAssets.length} tracked instruments
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-stone-200 rounded-md overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold text-stone-700 tracking-wider uppercase font-sans">
                <th
                  onClick={() => handleSort('symbol')}
                  className="py-3 px-4 cursor-pointer hover:text-stone-950"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Instrument</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-stone-950"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Last Price</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('changePercent')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-stone-950"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>24h Change</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">24h Range</th>
                <th className="py-3 px-4 text-right hidden md:table-cell">Volume</th>
                <th className="py-3 px-4 text-right hidden lg:table-cell">Valuation (P/E / Cap)</th>
                <th className="py-3 px-4 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono-nums">
              {sortedAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;
                return (
                  <tr
                    key={asset.symbol}
                    onClick={() => onSelectAsset && onSelectAsset(asset)}
                    className="hover:bg-amber-50/30 transition-colors cursor-pointer group"
                  >
                    {/* Symbol & Name */}
                    <td className="py-3 px-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-950 group-hover:text-amber-800">
                          {asset.symbol}
                        </span>
                        <span className="text-stone-500 truncate max-w-[150px] hidden sm:inline">
                          {asset.name}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-right font-semibold text-stone-900">
                      {asset.category === 'Bond'
                        ? `${asset.price.toFixed(3)}%`
                        : asset.price >= 1000
                        ? `$${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : `$${asset.price.toFixed(asset.category === 'Forex' ? 4 : 2)}`}
                    </td>

                    {/* 24h Change */}
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isPositive ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* 24h Range */}
                    <td className="py-3 px-4 text-right text-stone-500 hidden sm:table-cell">
                      <span>{asset.low24h}</span>
                      <span className="mx-1 text-stone-300">-</span>
                      <span>{asset.high24h}</span>
                    </td>

                    {/* Volume */}
                    <td className="py-3 px-4 text-right text-stone-600 hidden md:table-cell">
                      {asset.volume}
                    </td>

                    {/* Valuation / Market Cap */}
                    <td className="py-3 px-4 text-right text-stone-600 hidden lg:table-cell font-sans">
                      {asset.peRatio ? (
                        <span>P/E {asset.peRatio}x</span>
                      ) : asset.marketCap ? (
                        <span>{asset.marketCap}</span>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>

                    {/* Mini Sparkline Visualization */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-0.5 h-4 w-16">
                        {asset.sparkline.map((val, idx) => {
                          const min = Math.min(...asset.sparkline);
                          const max = Math.max(...asset.sparkline);
                          const heightPct = max === min ? 50 : Math.round(((val - min) / (max - min)) * 80) + 20;
                          return (
                            <div
                              key={idx}
                              style={{ height: `${heightPct}%` }}
                              className={`w-1.5 rounded-2xs ${
                                isPositive ? 'bg-emerald-600/70' : 'bg-rose-600/70'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info disclosure */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500 font-sans">
          <span>Official exchange feeds. Delayed by 15 minutes unless marked LIVE.</span>
          <span className="font-mono-nums">All metrics updated as of 14:45 EST</span>
        </div>
      </div>
    </div>
  );
};
