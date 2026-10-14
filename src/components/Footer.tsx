import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBriefing: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBriefing }) => {
  return (
    <footer className="border-t-2 border-stone-900 bg-white pt-12 pb-16 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Brand & Editorial Mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-200">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-editorial text-3xl font-extrabold tracking-tight text-stone-950">
                ALPHA
              </span>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-medium font-sans">
                Global Financial Intelligence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-md mb-4">
              An independent global financial intelligence publication covering American and international markets, macroeconomic policy, cryptocurrencies, venture capital, and deep tech startups.
            </p>
            <div className="text-xs text-stone-500 font-mono-nums">
              Editorial HQ & Timezone: Europe/Pristina · US Desks in New York & Washington
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 font-sans">
              Desks
            </h4>
            <ul className="space-y-2 text-xs">
              {['markets', 'crypto', 'startups', 'balkans', 'research', 'calendar'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => onNavigate(sec)}
                    className="hover:text-stone-950 capitalize transition-colors text-stone-600"
                  >
                    {sec}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 font-sans">
              Coverage
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>United States Markets</li>
              <li>Federal Reserve Policy</li>
              <li>Silicon Foundries & AI</li>
              <li>Western Balkans Hub</li>
              <li>Venture Capital Flows</li>
              <li>Cross-Asset Scenarios</li>
            </ul>
          </div>

          {/* Daily Briefing Automation Box */}
          <div className="md:col-span-3 bg-stone-50 p-4 rounded-md border border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-sans">
              Daily Intelligence Automation
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Configured for automated dispatch at <strong>07:00 AM Europe/Pristina</strong> to <strong>101webstudio@gmail.com</strong>.
            </p>
            <button
              onClick={onOpenBriefing}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Automation Console</span>
            </button>
          </div>
        </div>

        {/* Regulatory & Risk Disclosures */}
        <div className="py-8 border-b border-stone-100 text-[11px] text-stone-500 leading-relaxed font-sans space-y-2">
          <p>
            <strong>Financial Disclaimer:</strong> Market quotations are delayed by 15 minutes unless marked LIVE. Cryptocurrency and blockchain intelligence are subject to rapid liquidity shifts and smart contract risks. Nothing published by ALPHA constitutes an individualized recommendation or personal investment advice.
          </p>
          <p>
            <strong>Source Attribution:</strong> ALPHA evaluates and attributes primary sources, including Federal Reserve releases, the US Department of the Treasury, Bureau of Labor Statistics, SEC EDGAR, CoinGecko, and licensed corporate investor disclosures without paywall circumvention.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono-nums">
          <div>
            © 2026 ALPHA Global Intelligence Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-sans text-[11px]">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Security Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
