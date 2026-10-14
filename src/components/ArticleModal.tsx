import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { X, ExternalLink, ShieldCheck, Sparkles, Volume2, VolumeX, CheckCircle, ArrowRight, Share2, Bookmark } from 'lucide-react';

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookmark?: (article: NewsArticle) => void;
  isBookmarked?: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onBookmark,
  isBookmarked = false,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen || !article) return null;

  const handleRunAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/deep-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline: article.headline,
          category: article.category,
          content: article.content,
        }),
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.headline}. ${article.subtitle}. ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white border border-stone-200 rounded-lg max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Reader Top Bar */}
        <div className="border-b border-stone-200 bg-stone-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono-nums">
            <span className="font-bold text-amber-800 uppercase tracking-wider font-sans">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {article.verificationStatus}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSpeech}
              className={`p-1.5 rounded transition-colors text-xs flex items-center gap-1 font-medium ${
                isPlayingAudio ? 'bg-amber-100 text-amber-900' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Listen to full article"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
            </button>

            {onBookmark && (
              <button
                onClick={() => onBookmark(article)}
                className={`p-1.5 rounded transition-colors ${
                  isBookmarked ? 'text-amber-700' : 'text-stone-400 hover:text-stone-900'
                }`}
                title="Bookmark article"
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            )}

            <button
              onClick={() => {
                if (isPlayingAudio) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 font-sans">
          {/* Header */}
          <div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight mb-3">
              {article.headline}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans mb-4">
              {article.subtitle}
            </p>
            <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-200 font-mono-nums">
              <span>By {article.author}</span>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-stone-700 font-medium inline-flex items-center gap-1"
              >
                <span>{article.source}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Featured Visual */}
          {article.imageUrl && (
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded-md border border-stone-200">
                <img
                  src={article.imageUrl}
                  alt={article.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {article.imageCaption && (
                <p className="text-xs text-stone-500 italic mt-2 font-serif">
                  {article.imageCaption}
                </p>
              )}
            </div>
          )}

          {/* Article Body with Editorial Drop Cap */}
          <div className="prose prose-stone max-w-none text-sm sm:text-base text-stone-800 leading-relaxed space-y-4">
            {article.content.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-950'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Editorial Pull Quote */}
          <div className="border-y border-stone-300 py-6 my-6 text-center">
            <blockquote className="font-editorial italic text-xl sm:text-2xl text-stone-900 leading-snug">
              "{article.keyTakeaways[0]}"
            </blockquote>
          </div>

          {/* Structured Financial Impact Transmission Channels */}
          <div className="border border-stone-200 bg-stone-50/70 rounded-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Financial Impact & Transmission Channels
              </h3>
              <span className="text-[11px] font-mono-nums text-stone-500">ALPHA Research Desk</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>Macro Channel: </strong>{article.financialImpact.macroTransmission}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white border border-stone-200 rounded">
                <span className="font-bold text-stone-900 block mb-1">Affected Sectors</span>
                <span className="text-stone-600">{article.financialImpact.affectedSectors.join(', ')}</span>
              </div>
              <div className="p-3 bg-white border border-stone-200 rounded">
                <span className="font-bold text-stone-900 block mb-1">Affected Assets</span>
                <span className="text-stone-600">{article.financialImpact.affectedAssets.join(', ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded">
                <span className="font-bold text-emerald-950 block mb-1">Constructive Implications</span>
                <span className="text-stone-700">{article.financialImpact.bullishImplications}</span>
              </div>
              <div className="p-3 bg-rose-50/60 border border-rose-200 rounded">
                <span className="font-bold text-rose-950 block mb-1">Downside Risks</span>
                <span className="text-stone-700">{article.financialImpact.bearishRisks}</span>
              </div>
            </div>
          </div>

          {/* AI Deep Impact Synthesis Button & Output */}
          <div className="border border-stone-900 bg-stone-950 text-white rounded-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini Institutional Synthesis</span>
                </div>
                <h4 className="font-editorial text-xl font-bold text-white">
                  Live Second-Order Effects Matrix
                </h4>
              </div>

              <button
                onClick={handleRunAiAnalysis}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
              >
                {isAnalyzing ? 'Evaluating...' : 'Query Institutional AI'}
              </button>
            </div>

            {aiAnalysis ? (
              <div className="border-t border-stone-800 pt-4 space-y-3 text-xs">
                <div>
                  <span className="text-amber-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">Transmission Channel</span>
                  <p className="text-stone-300 leading-relaxed">{aiAnalysis.macroTransmission}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                    <span className="font-bold text-emerald-400 block mb-1">Primary Beneficiaries</span>
                    <span className="text-stone-300">{aiAnalysis.primaryBeneficiaries?.join(', ')}</span>
                  </div>
                  <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                    <span className="font-bold text-rose-400 block mb-1">Downside Vulnerabilities</span>
                    <span className="text-stone-300">{aiAnalysis.downsideVulnerabilities?.join(', ')}</span>
                  </div>
                </div>
                <div>
                  <span className="text-stone-400 font-bold block mb-1">Second-Order Ripple Effect:</span>
                  <p className="text-stone-300">{aiAnalysis.secondOrderEffects}</p>
                </div>
                <div className="p-2.5 bg-stone-900/80 border border-amber-900/50 rounded text-amber-200">
                  <strong>Investor Takeaway: </strong>{aiAnalysis.investorTakeaway}
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-400">
                Click above to generate real-time institutional cross-asset sensitivity, second-order forex/commodity ripple effects, and falsification rules using Gemini 3.8 Flash.
              </p>
            )}
          </div>
        </div>

        {/* Reader Footer */}
        <div className="border-t border-stone-200 px-6 py-3 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Attributed from {article.source}</span>
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-md transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
