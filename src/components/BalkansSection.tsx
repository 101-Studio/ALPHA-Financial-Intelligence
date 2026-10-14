import React from 'react';
import { ShieldCheck, ArrowUpRight, Zap, Building2, Globe } from 'lucide-react';
import { NewsArticle } from '../types';

interface BalkansSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const BalkansSection: React.FC<BalkansSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const balkanArticles = articles.filter(a => a.category === 'Balkans' || a.region === 'Balkans');

  const regionalMetrics = [
    { country: 'Kosovo', metric: '+38% YoY', label: 'ICT & Software Exports', detail: 'Pristina Tech Park expansion & German tech partnerships' },
    { country: 'Albania', metric: '€1.2B', label: 'Renewable FDI Commitments', detail: 'Cross-border hydro & solar transmission corridors' },
    { country: 'North Macedonia', metric: 'Corridor VIII', label: 'Rail & Freight Logistics', detail: 'Adriatic-Black Sea multimodal connectivity' },
    { country: 'Croatia', metric: '3.1% GDP', label: 'Eurozone Growth Leader', detail: 'Adriatic LNG terminal expansion & deep tech talent' },
  ];

  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            Regional Focus · Europe/Pristina Desk
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Western Balkans Economic & Venture Hub
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Capital flows, sovereign infrastructure interconnections, and digital export hubs across Kosovo, Albania, North Macedonia, Montenegro, and Croatia.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md">
          <Globe className="w-3.5 h-3.5 text-stone-500" />
          <span>Regional Base Time: Europe/Pristina</span>
        </div>
      </div>

      {/* 4-KPI Regional Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {regionalMetrics.map((item) => (
          <div key={item.country} className="bg-white border border-stone-200 p-4 rounded-md">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold text-stone-900">{item.country}</span>
              <span className="text-amber-800 font-mono-nums text-[10px] uppercase font-bold">Verified</span>
            </div>
            <div className="font-mono-nums text-2xl font-bold text-stone-950 mb-1">
              {item.metric}
            </div>
            <div className="text-xs font-semibold text-stone-800 mb-1">
              {item.label}
            </div>
            <div className="text-[11px] text-stone-500 leading-snug">
              {item.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Balkan Stories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white border border-stone-200 p-6 rounded-md">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="font-bold uppercase tracking-wider text-amber-800 font-mono-nums">
              Pristina Bureau
            </span>
            <span>·</span>
            <span>05:15 CEST</span>
          </div>

          <h3
            onClick={() => balkanArticles[0] && onSelectArticle(balkanArticles[0])}
            className="font-editorial text-2xl font-bold text-stone-950 hover:text-amber-900 cursor-pointer transition-colors leading-tight mb-3"
          >
            {balkanArticles[0]?.headline || 'Kosovo and Regional Western Balkan Corridor Attract Foreign Direct Investment'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            {balkanArticles[0]?.subtitle || 'Pristina emerges as a fast-growing digital software center as regional transmission grid interconnections gain European backing.'}
          </p>

          <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs">
            <span className="text-stone-500">Source: Kosovo Ministry of Economy & Energy Chamber</span>
            <button
              onClick={() => balkanArticles[0] && onSelectArticle(balkanArticles[0])}
              className="font-semibold text-stone-900 hover:text-amber-800 inline-flex items-center gap-1"
            >
              <span>Read Full Report</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6 space-y-4">
          <h4 className="text-xs uppercase font-bold tracking-wider text-stone-900 font-sans">
            Key Regional Themes for Foreign Investors
          </h4>
          <div className="space-y-3 text-xs text-stone-700">
            <div className="flex items-start gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900">Green Energy Synchrony:</span> Kosovo-Albania shared power dispatch mechanism eliminates peak hydro-thermal mismatches.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900">Pristina Software Diaspora:</span> Multi-lingual technical engineers building nearshore AI workflows for DACH clients at attractive unit costs.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900">EU Green Lanes:</span> Border crossing clearance automated under CEFTA digital trade frameworks.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
