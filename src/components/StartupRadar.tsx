import React, { useState } from 'react';
import { StartupCompany } from '../types';
import { ExternalLink, Users, MapPin, Calendar, DollarSign, Building, Sparkles } from 'lucide-react';

interface StartupRadarProps {
  startups: StartupCompany[];
  onSelectStartup?: (startup: StartupCompany) => void;
}

export const StartupRadar: React.FC<StartupRadarProps> = ({
  startups,
  onSelectStartup,
}) => {
  const [filterStage, setFilterStage] = useState<string>('all');

  const filtered = startups.filter((item) => {
    if (filterStage === 'all') return true;
    return item.fundingStage.toLowerCase() === filterStage.toLowerCase();
  });

  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            Venture & Innovation Intelligence
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Global Startup Radar
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Verified deep tech spinouts, infrastructure protocols, and emerging companies actively seeking capital, partners, or foundational talent.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
          {['all', 'seed', 'series a'].map((stage) => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                filterStage === stage
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((company) => (
          <div
            key={company.id}
            onClick={() => onSelectStartup && onSelectStartup(company)}
            className="bg-white border border-stone-200 rounded-md p-6 flex flex-col justify-between hover:border-stone-900 transition-all cursor-pointer group shadow-2xs"
          >
            <div>
              {/* Top metadata line (Unboxed) */}
              <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2 font-mono-nums">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-800 uppercase tracking-wider text-[11px] font-sans">
                    {company.fundingStage}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-900 font-semibold">{company.announcedAmount}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-400">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-[130px]">{company.location}</span>
                </div>
              </div>

              {/* Company Title & Website Link */}
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h3 className="font-editorial text-xl font-bold text-stone-950 group-hover:text-amber-800 transition-colors">
                  {company.name}
                </h3>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-stone-400 hover:text-stone-900 p-1"
                  title="Visit official website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="text-xs font-medium text-stone-600 mb-3 font-sans">
                {company.industry} · <span className="text-stone-500">{company.subSector}</span>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed line-clamp-3 mb-4">
                {company.description}
              </p>

              {/* Founders & Lead Investors */}
              <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs">
                <div className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-medium shrink-0">Founders:</span>
                  <span className="text-stone-800 font-medium">{company.founders.join(', ')}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-medium shrink-0">Backers:</span>
                  <span className="text-stone-800">{company.leadInvestors.join(', ')}</span>
                </div>
              </div>

              {/* Seeking Opportunities tags (Unboxed inline text with separator) */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1.5 font-sans">
                  Current Public Inquiries:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700 font-medium">
                  {company.seeking.map((need, idx) => (
                    <React.Fragment key={need}>
                      {idx > 0 && <span aria-hidden="true" className="text-stone-300">·</span>}
                      <span className="text-stone-800 hover:text-amber-900 transition-colors">
                        {need}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono-nums">
              <span>Source: {company.verifiedSource}</span>
              <a
                href={company.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-sans font-semibold text-stone-900 group-hover:text-amber-800 inline-flex items-center gap-1"
              >
                <span>Partner Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
