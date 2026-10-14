import React, { useState, useEffect } from 'react';
import {
  INITIAL_ARTICLES,
  INITIAL_MARKET_ASSETS,
  STOCKS_TO_WATCH,
  CRYPTO_INTELLIGENCE,
  STARTUP_RADAR,
  ECONOMIC_CALENDAR,
  INVESTMENT_RESEARCH_REPORTS,
} from './data/financialData';
import { NewsArticle, MarketAsset, CryptoAsset, StartupCompany } from './types';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { BreakingBanner } from './components/BreakingBanner';
import { HeroLeadStory } from './components/HeroLeadStory';
import { TopStoriesGrid } from './components/TopStoriesGrid';
import { MarketsDashboard } from './components/MarketsDashboard';
import { CryptoHub } from './components/CryptoHub';
import { StartupRadar } from './components/StartupRadar';
import { BalkansSection } from './components/BalkansSection';
import { InvestmentResearch } from './components/InvestmentResearch';
import { EconomicCalendar } from './components/EconomicCalendar';
import { DailyBriefingModal } from './components/DailyBriefingModal';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_ARTICLES);
  const [marketAssets, setMarketAssets] = useState<MarketAsset[]>(INITIAL_MARKET_ASSETS);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRefreshingMarkets, setIsRefreshingMarkets] = useState(false);
  const [pristinaTime, setPristinaTime] = useState<string>('');

  // Live Pristina time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const candidates = ['Europe/Pristina', 'Europe/Belgrade', 'Europe/Tirane', 'Europe/Skopje', 'CET'];
      let formatter: Intl.DateTimeFormat | null = null;
      for (const tz of candidates) {
        try {
          formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            hour12: false,
          });
          break;
        } catch {
          // try next
        }
      }
      if (!formatter) {
        formatter = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      }
      setPristinaTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Market Refresh simulation
  const handleRefreshMarkets = () => {
    setIsRefreshingMarkets(true);
    setTimeout(() => {
      setMarketAssets((prev) =>
        prev.map((asset) => {
          const delta = (Math.random() - 0.48) * (asset.price * 0.003);
          const newPrice = Number((asset.price + delta).toFixed(asset.category === 'Forex' ? 4 : 2));
          const newChange = Number((asset.change + delta).toFixed(2));
          const newPct = Number(((newChange / asset.price) * 100).toFixed(2));
          return {
            ...asset,
            price: newPrice,
            change: newChange,
            changePercent: newPct,
            sparkline: [...asset.sparkline.slice(1), newPrice],
            lastUpdated: 'Live Just Now',
          };
        })
      );
      setIsRefreshingMarkets(false);
    }, 600);
  };

  const handleOpenArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const leadStory = articles.find((a) => a.isLeadStory) || articles[0];
  const breakingStory = articles.find((a) => a.isBreaking);
  const secondaryStories = articles.filter((a) => a.id !== leadStory.id);

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenBriefing={() => setIsBriefingModalOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
        pristinaTime={pristinaTime}
      />

      {/* Live Market Strip */}
      <MarketTicker
        assets={marketAssets}
        onRefresh={handleRefreshMarkets}
        isRefreshing={isRefreshingMarkets}
        onSelectAsset={() => setActiveSection('markets')}
      />

      {/* Breaking News Ribbon if present */}
      {breakingStory && (
        <BreakingBanner
          article={breakingStory}
          onSelect={handleOpenArticle}
        />
      )}

      {/* Main Content Container surrounded by subtle gradient border */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* VIEW 1: HOME FRONT PAGE */}
        {activeSection === 'home' && (
          <div>
            {/* Primary Global Story */}
            <HeroLeadStory
              article={leadStory}
              onReadArticle={handleOpenArticle}
              onOpenAnalysis={handleOpenArticle}
            />

            {/* Top Stories Grid */}
            <TopStoriesGrid
              articles={secondaryStories}
              onSelectArticle={handleOpenArticle}
            />

            {/* Market Terminal Snapshot */}
            <MarketsDashboard
              assets={marketAssets}
              stocksToWatch={STOCKS_TO_WATCH}
              onSelectAsset={() => setActiveSection('markets')}
            />

            {/* Western Balkans Regional Desk */}
            <BalkansSection
              articles={articles}
              onSelectArticle={handleOpenArticle}
            />

            {/* Global Startup Radar */}
            <StartupRadar
              startups={STARTUP_RADAR}
              onSelectStartup={() => {}}
            />

            {/* Investment Research */}
            <InvestmentResearch
              reports={INVESTMENT_RESEARCH_REPORTS}
            />

            {/* Economic Calendar */}
            <EconomicCalendar
              events={ECONOMIC_CALENDAR}
            />
          </div>
        )}

        {/* VIEW 2: MARKETS TERMINAL */}
        {activeSection === 'markets' && (
          <MarketsDashboard
            assets={marketAssets}
            stocksToWatch={STOCKS_TO_WATCH}
            onSelectAsset={() => {}}
          />
        )}

        {/* VIEW 3: CRYPTO INTELLIGENCE */}
        {activeSection === 'crypto' && (
          <CryptoHub
            cryptoAssets={CRYPTO_INTELLIGENCE}
            onSelectCrypto={() => {}}
          />
        )}

        {/* VIEW 4: STARTUPS & VENTURE CAPITAL */}
        {activeSection === 'startups' && (
          <StartupRadar
            startups={STARTUP_RADAR}
            onSelectStartup={() => {}}
          />
        )}

        {/* VIEW 5: BALKANS ECONOMIC HUB */}
        {activeSection === 'balkans' && (
          <BalkansSection
            articles={articles}
            onSelectArticle={handleOpenArticle}
          />
        )}

        {/* VIEW 6: INVESTMENT RESEARCH */}
        {activeSection === 'research' && (
          <InvestmentResearch
            reports={INVESTMENT_RESEARCH_REPORTS}
          />
        )}

        {/* VIEW 7: ECONOMIC CALENDAR */}
        {activeSection === 'calendar' && (
          <EconomicCalendar
            events={ECONOMIC_CALENDAR}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBriefing={() => setIsBriefingModalOpen(true)}
      />

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
      />

      <DailyBriefingModal
        isOpen={isBriefingModalOpen}
        onClose={() => setIsBriefingModalOpen(false)}
        pristinaTime={pristinaTime}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        articles={articles}
        assets={marketAssets}
        startups={STARTUP_RADAR}
        events={ECONOMIC_CALENDAR}
        onSelectArticle={handleOpenArticle}
        onSelectAsset={() => setActiveSection('markets')}
      />
    </div>
  );
}
