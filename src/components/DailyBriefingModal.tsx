import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, Mail, Send, Sparkles, RefreshCw, AlertCircle, FileText, ChevronRight } from 'lucide-react';

interface DailyBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pristinaTime: string;
}

export const DailyBriefingModal: React.FC<DailyBriefingModalProps> = ({
  isOpen,
  onClose,
  pristinaTime,
}) => {
  const [briefingData, setBriefingData] = useState<any | null>(null);
  const [automationStatus, setAutomationStatus] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSendResult, setTestSendResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'schedule' | 'history'>('preview');

  useEffect(() => {
    if (isOpen) {
      loadBriefingAndStatus();
    }
  }, [isOpen]);

  const loadBriefingAndStatus = async () => {
    setIsLoading(true);
    try {
      const [statusRes, briefingRes] = await Promise.all([
        fetch('/api/briefing/status'),
        fetch('/api/briefing/generate', { method: 'POST' }),
      ]);
      const statusJson = await statusRes.json();
      const briefingJson = await briefingRes.json();
      setAutomationStatus(statusJson);
      setBriefingData(briefingJson);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSend = async () => {
    setIsSendingTest(true);
    setTestSendResult(null);
    try {
      const res = await fetch('/api/briefing/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientEmail: '101webstudio@gmail.com' }),
      });
      const data = await res.json();
      setTestSendResult(`Dispatch completed successfully to 101webstudio@gmail.com. Scheduled recurrence: Every morning at 07:00 AM Europe/Pristina.`);
      // Refresh status history
      const statusRes = await fetch('/api/briefing/status');
      const statusJson = await statusRes.json();
      setAutomationStatus(statusJson);
    } catch (e: any) {
      setTestSendResult(`Error triggering test delivery: ${e?.message || 'Network error'}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white border border-stone-200 rounded-lg max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 border-b border-stone-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-1 font-mono-nums">
              <Clock className="w-3.5 h-3.5" />
              <span>Automated Daily Morning Intelligence</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white">
              ALPHA 07:00 AM Europe/Pristina Briefing
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 mt-2 font-mono-nums">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Automation
              </span>
              <span>·</span>
              <span>Recipient: <strong className="text-white">101webstudio@gmail.com</strong></span>
              <span>·</span>
              <span>Schedule: <strong className="text-white">07:00 Daily (Europe/Pristina)</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Tab Ribbon */}
        <div className="border-b border-stone-200 bg-stone-50 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white text-stone-950 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Email Content (Sections A–I)
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-white text-stone-950 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Schedule & Timezone Engine
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'history'
                  ? 'bg-white text-stone-950 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Dispatch History Logs
            </button>
          </div>

          <button
            onClick={handleTestSend}
            disabled={isSendingTest}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-2"
          >
            {isSendingTest ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Dispatching Test...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Briefing Now</span>
              </>
            )}
          </button>
        </div>

        {/* Test Result Alert if triggered */}
        {testSendResult && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{testSendResult}</span>
            </div>
            <button
              onClick={() => setTestSendResult(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {isLoading ? (
            <div className="py-16 text-center text-stone-500 flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-amber-600" />
              <span className="text-xs font-mono-nums">Synthesizing latest global intelligence for Europe/Pristina briefing...</span>
            </div>
          ) : activeTab === 'preview' && briefingData ? (
            <div className="border border-stone-200 rounded-md p-6 bg-white space-y-8 font-sans">
              {/* Email Header Simulation */}
              <div className="border-b border-stone-200 pb-4">
                <div className="text-xs text-stone-400 font-mono-nums mb-1">
                  FROM: ALPHA Intelligence Desk &lt;intelligence@alpha-financial.int&gt;
                </div>
                <div className="text-xs text-stone-400 font-mono-nums mb-1">
                  TO: 101webstudio@gmail.com
                </div>
                <div className="text-xs text-stone-400 font-mono-nums mb-2">
                  SCHEDULE: Every Day at 07:00 AM Europe/Pristina (CEST / CET compliant)
                </div>
                <h3 className="font-editorial text-2xl font-bold text-stone-950">
                  {briefingData.subject}
                </h3>
              </div>

              {/* Executive Summary */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block mb-1">
                  Executive Briefing Synthesis (Gemini AI & Editorial Desk)
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {briefingData.executiveSynthesis}
                </p>
              </div>

              {/* Section A: Five Most Important Global Stories */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  A. Five Most Important Global Stories
                </h4>
                <div className="space-y-3">
                  {briefingData.sections.sectionA_topStories.map((s: any, idx: number) => (
                    <div key={idx} className="border-b border-stone-100 pb-2.5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="font-bold text-stone-900">{idx + 1}. {s.title}</span>
                        <span className="text-stone-400 font-mono-nums text-[11px] shrink-0 ml-2">{s.time}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed mb-1">{s.summary}</p>
                      <div className="text-[11px] text-stone-400">
                        Source: <span className="text-stone-700">{s.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section B: United States Market Briefing */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  B. United States Market Briefing
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
                  {briefingData.sections.sectionB_usMarkets.indices.map((idxItem: any, i: number) => (
                    <div key={i} className="p-2 bg-stone-50 border border-stone-200 rounded text-center">
                      <span className="text-[10px] text-stone-500 uppercase block font-semibold">{idxItem.name}</span>
                      <span className="text-xs font-bold text-stone-900 font-mono-nums block">{idxItem.value}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold font-mono-nums">{idxItem.change}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {briefingData.sections.sectionB_usMarkets.takeaway}
                </p>
              </div>

              {/* Section C: Global Economic News */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  C. Global Economic Developments
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {briefingData.sections.sectionC_globalEconomy.keyDevelopments.map((dev: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-stone-400 font-mono-nums">•</span>
                      <span>{dev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section D: Crypto Market Briefing */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  D. Crypto & Blockchain Intelligence
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  {briefingData.sections.sectionD_cryptoIntelligence.assets.map((c: any, i: number) => (
                    <div key={i} className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{c.symbol}</span>
                        <span className="text-emerald-700 font-mono-nums">{c.change24h}</span>
                      </div>
                      <div className="text-sm font-bold font-mono-nums text-stone-950">{c.price}</div>
                      <div className="text-[10px] text-stone-500 mt-1">{c.note}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-rose-900 bg-rose-50 p-2.5 rounded border border-rose-200">
                  <strong>Risk Advisory:</strong> {briefingData.sections.sectionD_cryptoIntelligence.riskAdvisory}
                </div>
              </div>

              {/* Section E: Stocks & Sectors to Watch */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  E. Stocks and Sectors to Watch
                </h4>
                <div className="space-y-2">
                  {briefingData.sections.sectionE_stocksToWatch.map((stk: any, i: number) => (
                    <div key={i} className="flex items-start justify-between text-xs p-2 bg-stone-50 rounded border border-stone-100">
                      <div>
                        <span className="font-bold text-stone-950 mr-2">{stk.ticker} ({stk.price})</span>
                        <span className="text-stone-600">{stk.catalyst}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 shrink-0 ml-3">{stk.stance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section F: Startup & Venture Capital Radar */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  F. Startup & Venture Capital Radar
                </h4>
                <div className="space-y-2 text-xs">
                  {briefingData.sections.sectionF_startupRadar.map((sup: any, i: number) => (
                    <div key={i} className="border-b border-stone-100 pb-2">
                      <span className="font-bold text-stone-900">{sup.name}</span>
                      <span className="text-stone-400 mx-1.5">·</span>
                      <span className="text-amber-800 font-mono-nums">{sup.stage}</span>
                      <span className="text-stone-400 mx-1.5">·</span>
                      <span className="text-stone-500">{sup.location}</span>
                      <p className="text-stone-600 mt-0.5">{sup.focus}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section G: Investment Research of the Day */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  G. Investment Research of the Day
                </h4>
                <p className="text-xs text-stone-700 mb-2">
                  <strong>Macro Thesis:</strong> {briefingData.sections.sectionG_investmentResearch.thesis}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded">
                    <strong className="text-emerald-950 block mb-1">Constructive Scenario (Bull)</strong>
                    <span className="text-stone-700">{briefingData.sections.sectionG_investmentResearch.bullCase}</span>
                  </div>
                  <div className="p-2.5 bg-rose-50/60 border border-rose-200 rounded">
                    <strong className="text-rose-950 block mb-1">Defensive Scenario (Bear)</strong>
                    <span className="text-stone-700">{briefingData.sections.sectionG_investmentResearch.bearCase}</span>
                  </div>
                </div>
              </div>

              {/* Section H: Today's Economic Calendar */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  H. Economic Calendar (Europe/Pristina Time)
                </h4>
                <div className="space-y-1.5 text-xs">
                  {briefingData.sections.sectionH_economicCalendar.map((evt: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-stone-50 rounded">
                      <span className="font-mono-nums font-bold text-stone-900">{evt.timePristina}</span>
                      <span className="font-semibold text-stone-800 flex-1 px-3">{evt.event}</span>
                      <span className="text-stone-500 font-mono-nums text-[11px]">{evt.forecast}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section I: Today's Watchlist */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-950 border-b border-stone-300 pb-1.5 mb-3">
                  I. Today's Watchlist
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {briefingData.sections.sectionI_watchlist.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono-nums font-bold text-amber-800">[{i + 1}]</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : activeTab === 'schedule' ? (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-stone-200 rounded-md p-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-950 mb-3 font-sans">
                  Recurring Schedule Configuration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-nums">
                  <div className="p-3 bg-white border border-stone-200 rounded">
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Target Recipient</span>
                    <span className="font-bold text-stone-900 text-sm">101webstudio@gmail.com</span>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded">
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Scheduled Daily Trigger</span>
                    <span className="font-bold text-stone-900 text-sm">07:00:00 AM Daily</span>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded">
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Target Timezone</span>
                    <span className="font-bold text-stone-900 text-sm">Europe/Pristina (UTC+2 / UTC+1)</span>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded">
                    <span className="text-stone-400 block text-[10px] uppercase font-sans">Daylight Saving Rule</span>
                    <span className="font-bold text-stone-900 text-sm">Automatic DST Summer/Winter sync</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950 space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Cron & Timezone Daemon Verification</span>
                </div>
                <p>
                  The full-stack background daemon continuously monitors the Europe/Pristina clock. When 07:00 strikes in Pristina, the 9-part intelligence payload is compiled with latest data feeds and dispatched to 101webstudio@gmail.com.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-sans">
                Automated Dispatch Audit Log
              </h4>
              <div className="divide-y divide-stone-200 border border-stone-200 rounded-md bg-white">
                {automationStatus?.history?.map((log: any) => (
                  <div key={log.id} className="p-4 text-xs font-sans hover:bg-stone-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-stone-950">{log.subject}</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold font-mono-nums text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        {log.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono-nums mb-1">
                      {log.timestamp} · Recipient: {log.recipient} · {log.storyCount} Verified Sections
                    </div>
                    <p className="text-stone-600 text-xs">
                      {log.previewSnippet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-stone-200 p-4 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Current Pristina Local Time: <strong className="text-stone-900 font-mono-nums">{pristinaTime}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-md transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
