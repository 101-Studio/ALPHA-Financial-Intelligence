import React, { useState } from 'react';
import { CryptoAsset } from '../types';
import { AlertTriangle, ShieldCheck, ExternalLink, Lock, Flame } from 'lucide-react';

interface CryptoHubProps {
  cryptoAssets: CryptoAsset[];
  onSelectCrypto?: (asset: CryptoAsset) => void;
}

export const CryptoHub: React.FC<CryptoHubProps> = ({
  cryptoAssets,
  onSelectCrypto,
}) => {
  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            Digital Asset Intelligence
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Crypto & Blockchain Protocol Radar
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Institutional spot ETF flows, on-chain liquidity velocity, vesting unlock schedules, and security advisories.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md">
          <span className="font-semibold text-stone-900">Total DeFi TVL:</span>
          <span className="font-mono-nums text-stone-900 font-bold">$108.4B</span>
        </div>
      </div>

      {/* Security Advisory Callout */}
      <div className="border border-amber-300 bg-amber-50/70 rounded-md p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-700 leading-relaxed">
            <span className="font-bold text-amber-900 mr-1.5">ALPHA Security Notice:</span>
            Never input private seed phrases into browser extensions. Multiple unverified airdrop phishing domains mimic official testnet campaigns. ALPHA only attributes verified cryptographic contracts registered with official documentation.
          </div>
        </div>
      </div>

      {/* Crypto Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoAssets.map((asset) => {
          const isPositive = asset.changePercent >= 0;
          return (
            <div
              key={asset.symbol}
              onClick={() => onSelectCrypto && onSelectCrypto(asset)}
              className="bg-white border border-stone-200 rounded-md p-5 flex flex-col justify-between hover:border-stone-900 transition-all cursor-pointer group shadow-2xs"
            >
              <div>
                {/* Header: Name, Symbol & Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-stone-950 group-hover:text-amber-800 transition-colors">
                      {asset.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono-nums mt-0.5">
                      <span>{asset.tokenSymbol}</span>
                      <span>·</span>
                      <span>{asset.blockchain}</span>
                    </div>
                  </div>

                  <div className="text-right font-mono-nums">
                    <div className="text-base font-bold text-stone-950">
                      ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        isPositive ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Metrics Definitions */}
                <div className="border-t border-stone-100 pt-3 my-3 grid grid-cols-2 gap-3 text-[11px] font-mono-nums">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Market Cap</span>
                    <span className="font-semibold text-stone-800">{asset.marketCap || '—'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">24h Volume</span>
                    <span className="font-semibold text-stone-800">{asset.volume}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Circulating</span>
                    <span className="font-semibold text-stone-800">{asset.circulatingSupply}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Ecosystem TVL</span>
                    <span className="font-semibold text-stone-800">{asset.defiTvl || 'N/A'}</span>
                  </div>
                </div>

                {/* Warning note if token unlock imminent */}
                {asset.warningNote && (
                  <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded text-[11px] text-rose-900 leading-snug">
                    <div className="flex items-center gap-1 font-bold text-rose-950 mb-1">
                      <Lock className="w-3 h-3 text-rose-700" />
                      <span>Vesting Unlock Notice</span>
                    </div>
                    {asset.warningNote}
                  </div>
                )}
              </div>

              {/* Status footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans mt-4">
                <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{asset.status}</span>
                </span>
                <span className="text-stone-400 font-mono-nums">{asset.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
