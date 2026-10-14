import React, { useState } from 'react';
import { InvestmentResearchReport } from '../types';
import { Sparkles, Scale, AlertOctagon, HelpCircle, Check, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface InvestmentResearchProps {
  reports: InvestmentResearchReport[];
}

export const InvestmentResearch: React.FC<InvestmentResearchProps> = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState<InvestmentResearchReport>(reports[0]);
  const [interactiveTopic, setInteractiveTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<any | null>(null);

  const handleGenerateScenarios = async () => {
    if (!interactiveTopic.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/research-scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: interactiveTopic,
          assetClass: 'Cross-Asset Strategic Allocation',
        }),
      });
      const data = await res.json();
      setCustomAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            Institutional Research Desk
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            ALPHA Investment Research
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Evidence-based cross-asset comparisons, valuation equilibrium, scenario probabilities, and falsification rules.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md font-mono-nums">
          <Scale className="w-3.5 h-3.5 text-stone-500" />
          <span>Horizon: {selectedReport.timeHorizon}</span>
        </div>
      </div>

      {/* Main Research Paper View */}
      <div className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 mb-8 shadow-xs">
        {/* Research Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono-nums mb-2">
            <span className="font-bold text-amber-800 uppercase tracking-wider font-sans">
              {selectedReport.assetClass}
            </span>
            <span aria-hidden="true">·</span>
            <span>{selectedReport.timestamp}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-800 font-medium font-sans inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Macro Model
            </span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 leading-tight mb-3">
            {selectedReport.title}
          </h3>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
            {selectedReport.subtitle}
          </p>
        </div>

        {/* Current Situation & Supporting Data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2 font-sans">
              1. Current Situation & Market Diagnostics
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {selectedReport.currentSituation}
            </p>
          </div>

          <div className="lg:col-span-5 bg-stone-50 p-4 rounded border border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2.5 font-sans">
              Primary Empirical Data Points
            </h4>
            <ul className="space-y-2 text-xs text-stone-700">
              {selectedReport.supportingData.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-stone-400 font-mono-nums">[{i + 1}]</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Balanced Scenarios Matrix: Bull vs Bear */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Bull Scenario */}
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-md p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 font-sans">
                Constructive Scenario (Bull)
              </span>
              <span className="font-mono-nums text-sm font-bold text-emerald-800">
                {selectedReport.bullScenario.probability}% Probability
              </span>
            </div>

            <div className="text-xs font-semibold text-emerald-950 mb-3 font-sans">
              Target: {selectedReport.bullScenario.targetUpside}
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <span className="font-bold text-[11px] uppercase tracking-wider text-stone-500 block">
                Required Catalysts:
              </span>
              {selectedReport.bullScenario.catalysts.map((c, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bear Scenario */}
          <div className="border border-rose-200 bg-rose-50/40 rounded-md p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900 font-sans">
                Defensive Scenario (Bear)
              </span>
              <span className="font-mono-nums text-sm font-bold text-rose-800">
                {selectedReport.bearScenario.probability}% Probability
              </span>
            </div>

            <div className="text-xs font-semibold text-rose-950 mb-3 font-sans">
              Downside Risk: {selectedReport.bearScenario.downsideRisk}
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <span className="font-bold text-[11px] uppercase tracking-wider text-stone-500 block">
                Primary Triggers:
              </span>
              {selectedReport.bearScenario.triggers.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Falsification Condition (Scientific Rigor) */}
        <div className="border border-stone-200 bg-stone-50/70 p-4 rounded-md mb-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-stone-700">
              <span className="font-bold text-stone-950 uppercase tracking-wider font-sans block mb-1">
                Falsification Rule (What Evidence Invalidates This Stance):
              </span>
              {selectedReport.falsificationEvidence}
            </div>
          </div>
        </div>

        {/* Regulatory & General Research Disclaimer */}
        <div className="p-3 bg-stone-100/70 rounded text-[11px] text-stone-500 leading-relaxed font-sans border-t border-stone-200">
          <span className="font-semibold text-stone-700">Regulatory Disclosure: </span>
          {selectedReport.disclosure}
        </div>
      </div>

      {/* Interactive AI Research Simulator */}
      <div className="bg-stone-900 text-white rounded-md p-6 sm:p-8">
        <div className="max-w-2xl mb-4">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Macro Scenario Engine</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold tracking-tight text-white mb-2">
            Simulate Capital Allocation Scenarios
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Test custom macroeconomic hypotheses (e.g. "What if oil surges to $95?", "Where to invest if US 10Y touches 4.5%?", "Impact of European rate cuts on Balkan tech exports").
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={interactiveTopic}
            onChange={(e) => setInteractiveTopic(e.target.value)}
            placeholder="Enter research theme, asset pair, or macro development..."
            className="flex-1 bg-stone-800 border border-stone-700 rounded-md px-3.5 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={handleGenerateScenarios}
            disabled={isGenerating || !interactiveTopic.trim()}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <span>Run Scenario Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Display custom AI output if generated */}
        {customAnalysis && (
          <div className="mt-6 pt-6 border-t border-stone-800 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Institutional Simulation Output
            </div>
            <h4 className="font-editorial text-xl font-bold text-white">
              {customAnalysis.title}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {customAnalysis.currentValuationAssessment}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-800/80 p-3.5 rounded border border-emerald-900/40">
                <div className="font-bold text-emerald-400 mb-1">
                  Bull Case ({customAnalysis.bullCase?.probability}%)
                </div>
                <div className="text-stone-300 mb-2">{customAnalysis.bullCase?.target}</div>
                <ul className="text-[11px] text-stone-400 space-y-1">
                  {customAnalysis.bullCase?.catalysts?.map((c: string, i: number) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-800/80 p-3.5 rounded border border-stone-700">
                <div className="font-bold text-stone-200 mb-1">
                  Base Case ({customAnalysis.baseCase?.probability}%)
                </div>
                <div className="text-stone-300 mb-2">{customAnalysis.baseCase?.target}</div>
                <ul className="text-[11px] text-stone-400 space-y-1">
                  {customAnalysis.baseCase?.catalysts?.map((c: string, i: number) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-800/80 p-3.5 rounded border border-rose-900/40">
                <div className="font-bold text-rose-400 mb-1">
                  Bear Case ({customAnalysis.bearCase?.probability}%)
                </div>
                <div className="text-stone-300 mb-2">{customAnalysis.bearCase?.target}</div>
                <ul className="text-[11px] text-stone-400 space-y-1">
                  {customAnalysis.bearCase?.triggers?.map((t: string, i: number) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] text-stone-400 italic">
              Falsification: {customAnalysis.falsificationRule}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
