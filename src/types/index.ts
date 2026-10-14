export type NewsCategory = 
  | 'Lead'
  | 'USA' 
  | 'Global Economy' 
  | 'Wall Street' 
  | 'Crypto' 
  | 'Startups' 
  | 'Venture Capital' 
  | 'Technology & AI' 
  | 'Commodities & Forex' 
  | 'Balkans' 
  | 'Research';

export interface NewsArticle {
  id: string;
  category: NewsCategory;
  headline: string;
  subtitle: string;
  author: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  imageUrl: string;
  imageCaption?: string;
  content: string[];
  keyTakeaways: string[];
  financialImpact: {
    macroTransmission: string;
    affectedSectors: string[];
    affectedAssets: string[];
    bullishImplications: string;
    bearishRisks: string;
  };
  verificationStatus: 'Verified Official' | 'Primary Filing' | 'Confirmed Report' | 'Developing';
  region?: 'USA' | 'Global' | 'Europe' | 'Balkans' | 'Asia';
  isLeadStory?: boolean;
  isBreaking?: boolean;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  category: 'Index' | 'Stock' | 'Crypto' | 'Commodity' | 'Forex' | 'Bond';
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  eps?: number;
  dividendYield?: number;
  sparkline: number[];
  lastUpdated: string;
}

export interface CryptoAsset extends MarketAsset {
  tokenSymbol: string;
  blockchain: string;
  circulatingSupply: string;
  tgeDate?: string;
  status: 'Established' | 'Emerging' | 'Caution' | 'Token Unlock Imminent';
  defiTvl?: string;
  warningNote?: string;
}

export interface StartupCompany {
  id: string;
  name: string;
  website: string;
  industry: string;
  subSector: string;
  location: string;
  founders: string[];
  launchDate: string;
  fundingStage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Growth' | 'Bootstrapped';
  announcedAmount: string;
  leadInvestors: string[];
  description: string;
  seeking: ('Venture Capital' | 'Angel Investors' | 'Strategic Partners' | 'Early Beta Customers' | 'Founding Engineers')[];
  applicationLink: string;
  verifiedSource: string;
  verifiedAt: string;
}

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  datePristina: string; // YYYY-MM-DD
  timePristina: string; // HH:mm in Europe/Pristina
  timeEST: string;
  importance: 'High' | 'Medium' | 'Low';
  previous: string;
  forecast: string;
  actual?: string;
  impact: 'Neutral' | 'Bullish' | 'Bearish' | 'Pending';
  source: string;
}

export interface InvestmentResearchReport {
  id: string;
  title: string;
  subtitle: string;
  assetClass: string;
  timestamp: string;
  timeHorizon: '1-3 Months' | '3-6 Months' | '12+ Months' | 'Multi-Year Tactical';
  currentSituation: string;
  supportingData: string[];
  bullScenario: {
    probability: number;
    targetUpside: string;
    catalysts: string[];
  };
  bearScenario: {
    probability: number;
    downsideRisk: string;
    triggers: string[];
  };
  falsificationEvidence: string;
  keyRisks: string[];
  disclosure: string;
}

export interface BriefingAutomationStatus {
  recipientEmail: string;
  scheduleTimePristina: string; // "07:00"
  timezone: string; // "Europe/Pristina"
  nextRunPristina: string;
  status: 'Active' | 'Paused' | 'Delivering';
  lastRunTimestamp: string | null;
  lastRunStatus: 'Success' | 'Pending' | 'Failed' | null;
  history: {
    id: string;
    timestamp: string;
    recipient: string;
    subject: string;
    status: 'Delivered' | 'Simulated' | 'Queued';
    storyCount: number;
  }[];
}
