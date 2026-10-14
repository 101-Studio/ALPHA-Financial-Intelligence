import { NewsArticle, MarketAsset, CryptoAsset, StartupCompany, EconomicEvent, InvestmentResearchReport } from '../types';
import heroMarketsImg from '../assets/images/hero_global_markets_1792010913068.jpg';
import usFedTreasuryImg from '../assets/images/us_fed_treasury_1792010912658.jpg';
import aiFoundryImg from '../assets/images/ai_semiconductor_foundry_1792010912256.jpg';
import startupFounderImg from '../assets/images/startup_venture_founder_1792010913443.jpg';

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-lead-1',
    category: 'Lead',
    isLeadStory: true,
    isBreaking: true,
    headline: 'Global Central Banks Recalibrate Policy as US Capital Spending Surges Beyond Expectations',
    subtitle: 'Cross-asset volatility compresses as Federal Reserve balances sticky service inflation against record enterprise infrastructure investments.',
    author: 'Julian Vance & Elena Rostova',
    source: 'ALPHA Global Intelligence Desk',
    sourceUrl: 'https://alpha-financial.int/news/global-recalibration-2026',
    publishedAt: '2026-10-14 06:45 CEST',
    updatedAt: '2026-10-14 07:15 CEST',
    readTime: '6 min read',
    imageUrl: heroMarketsImg,
    imageCaption: 'Trading desks at major international institutional desks react to synchronized macro releases and debt auction yields.',
    verificationStatus: 'Verified Official',
    region: 'Global',
    content: [
      'Institutional capital allocators across New York, London, and Frankfurt experienced a pivotal realignment this morning as synchronized macroeconomic prints revealed persistent US productivity expansion paired with easing European energy bottlenecks.',
      'The Federal Reserve\'s latest balance sheet guidance and Treasury quarterly refunding estimates have reinforced expectations that benchmark interest rates will stabilize in a higher-for-longer regime, providing structured support for sovereign bond yields while driving rigorous selective pricing in equity multiples.',
      'Enterprise capex commitments in high-performance computing, domestic grid modernization, and autonomous industrial infrastructure have surged by 24% year-over-year. Analysts at Tier-1 investment banks note that capital intensity is no longer confined to speculative pilots; balance sheet cash is being deployed into verifiable revenue-generating installations.',
      'In currency markets, the US Dollar Index held firm near 103.85, reflecting structural yield differentials against the Euro and Yen. Meanwhile, commodity complexes witnessed steady accumulation in copper and silver, directly mirroring raw material demand across electrification and advanced data center builds.'
    ],
    keyTakeaways: [
      'US enterprise infrastructure capex jumped 24% YoY, underpinning economic resilience despite benchmark rates holding above 4.5%.',
      'Sovereign yield curve steepening signals institutional pricing of sustained trend growth rather than imminent recessionary shocks.',
      'International spillover is elevating European export competitiveness while prompting selective liquidity deployment into high-growth regional hubs.'
    ],
    financialImpact: {
      macroTransmission: 'Elevated US term premiums are propagating through global debt markets, exerting pressure on long-duration valuations while favoring companies with self-funded free cash flow.',
      affectedSectors: ['Semiconductors & AI Hardware', 'Grid & Electrical Infrastructure', 'Sovereign Debt Markets', 'Global Banking'],
      affectedAssets: ['S&P 500', '10Y US Treasury', 'EUR/USD', 'High-Grade Corporate Debt'],
      bullishImplications: 'Capital expenditure growth guarantees multi-year order backlogs for industrial suppliers and foundational semiconductor providers.',
      bearishRisks: 'Smaller-cap enterprises reliant on external floating-rate debt face rising refinancing hurdles into late 2026 and 2027.'
    }
  },
  {
    id: 'art-usa-2',
    category: 'USA',
    headline: 'US Treasury Liquidity Strategy Anchors 10-Year Yields as CPI Housing Sub-Indices Cool',
    subtitle: 'The Department of the Treasury prioritizes short-term bill issuance, mitigating duration risk for commercial banks and fixed-income portfolios.',
    author: 'Marcus Sterling',
    source: 'Federal Reserve & US Treasury Releases',
    sourceUrl: 'https://home.treasury.gov/news/press-releases',
    publishedAt: '2026-10-14 05:30 CEST',
    readTime: '5 min read',
    imageUrl: usFedTreasuryImg,
    imageCaption: 'The Department of the Treasury in Washington, D.C. as financial analysts digest updated issuance targets.',
    verificationStatus: 'Primary Filing',
    region: 'USA',
    content: [
      'The US Treasury announced its calibrated debt issuance blueprint for the upcoming quarter, reaffirming an emphasis on Treasury Bills while maintaining steady coupon auction sizes. The move effectively preempted potential liquidity strains across money markets.',
      'Concurrently, the Bureau of Labor Statistics reported a 0.2% month-over-month moderation in shelter inflation, the slowest pace of shelter price appreciation in sixteen months. This cooling provides the Federal Open Market Committee with breathing room to sustain its neutral stance.',
      'Bank of America and JPMorgan trading desks reported aggressive algorithmic buying across the 5-year to 10-year tenor immediately following the announcement, settling the 10-Year benchmark yield near 4.21%.'
    ],
    keyTakeaways: [
      'Treasury bill skew reduces crowding-out effects in long-duration private credit markets.',
      'Shelter deflation is steadily working through headline CPI lag cycles.',
      'Commercial mortgage-backed securities (CMBS) spreads narrowed by 14 basis points on the news.'
    ],
    financialImpact: {
      macroTransmission: 'Yield curve stabilization curbs mortgage rate volatility and re-energizes secondary residential real estate liquidity.',
      affectedSectors: ['Regional Banking', 'Mortgage REITs', 'Commercial Real Estate', 'Fixed Income'],
      affectedAssets: ['TLT (iShares 20+ Year Treasury)', 'US 10Y Yield', 'KBW Bank Index'],
      bullishImplications: 'Reduces unrealized held-to-maturity bond losses on regional bank balance sheets.',
      bearishRisks: 'Heavy T-bill reliance requires persistent money-market fund absorption and reverse repo durability.'
    }
  },
  {
    id: 'art-tech-3',
    category: 'Technology & AI',
    headline: 'Next-Gen Wafer Scale & 2nm Foundries Drive Silicon Capex to New All-Time Highs',
    subtitle: 'ASML, TSMC, and domestic US fabrication lines ramp mass commercial production as AI inference demands move on-device and at hyperscale edge.',
    author: 'Clara Chen & David Lindqvist',
    source: 'Semiconductor Industry Association & SEC Filings',
    sourceUrl: 'https://www.semiconductors.org/data-releases',
    publishedAt: '2026-10-14 04:15 CEST',
    readTime: '7 min read',
    imageUrl: aiFoundryImg,
    imageCaption: 'Automated cleanroom robotic systems handling silicon wafers in an advanced sub-2nm fabrication facility.',
    verificationStatus: 'Verified Official',
    region: 'Global',
    content: [
      'Global semiconductor equipment billings reached an annualized record rate of $128 billion this quarter, spearheaded by leading-edge lithography installations in Taiwan, Japan, and the American Southwest.',
      'With enterprise AI models pivoting from initial training runs into massive inference workloads, data center power constraints have made microarchitecture energy efficiency the primary competitive moat.',
      'NVIDIA, AMD, and custom ASIC architects at Google, Amazon, and Microsoft have secured high-bandwidth memory (HBM4) allocations through late 2027, locking in forward revenues for specialty memory manufacturers.'
    ],
    keyTakeaways: [
      'HBM4 memory architectures and advanced packaging remain the primary supply bottleneck.',
      'Equipment manufacturers report booked backlogs extending 18 to 22 months.',
      'Power generation utility contracts are now signed concurrently with semiconductor orders.'
    ],
    financialImpact: {
      macroTransmission: 'High silicon capex acts as a direct multiplier for electrical utility infrastructure, thermal cooling systems, and specialized industrial gases.',
      affectedSectors: ['Semiconductor Capital Equipment', 'Foundries', 'Industrial Utilities', 'Optical Interconnects'],
      affectedAssets: ['NVDA', 'TSM', 'ASML', 'ARM', 'SOX Index'],
      bullishImplications: 'Structural demand inelasticity guarantees resilient gross margins above 60% for market leaders.',
      bearishRisks: 'Geopolitical friction and potential export licensing revisions remain persistent overhangs.'
    }
  },
  {
    id: 'art-startup-4',
    category: 'Startups',
    headline: 'European and US Venture Seed Deals Rebound with Disciplined Unit Economics',
    subtitle: 'Venture capital firms deploy $14.2B in Q3 into early-stage deep tech, enterprise agent workflows, and decentralized compute protocols.',
    author: 'Soren Halvorsen',
    source: 'Venture Capital Intelligence Brief',
    sourceUrl: 'https://alpha-financial.int/research/vc-q3-flows',
    publishedAt: '2026-10-14 03:50 CEST',
    readTime: '5 min read',
    imageUrl: startupFounderImg,
    imageCaption: 'Founding teams review product telemetry and customer cohort retention metrics inside an innovation workspace.',
    verificationStatus: 'Confirmed Report',
    region: 'Global',
    content: [
      'Venture funding activity across early-stage tech recorded its strongest quarter in two years, characterized by realistic pre-money valuations and strict diligence around customer acquisition payback cycles.',
      'Unlike the hyper-valuation cycles of 2021, Series A checks are now conditioned on proven gross margins exceeding 70% and clear software-to-compute efficiency ratios.',
      'Emerging software innovation hubs in Southeastern Europe, notably Pristina, Tirana, and Zagreb, have seen an influx of seed-stage syndicates backing technical founders building cross-border developer tooling and AI automation pipelines.'
    ],
    keyTakeaways: [
      'Seed round median valuations stabilized at $12.5M post-money, down 30% from peak but up 12% from 2024 lows.',
      'B2B agentic platforms with recurring contracted enterprise pilots command the lowest churn rates.',
      'Regional engineering hubs outside Silicon Valley are capturing a larger share of pre-seed syndication.'
    ],
    financialImpact: {
      macroTransmission: 'Disciplined early-stage funding ensures healthier long-term IPO pipelines and prevents premature public listing failures.',
      affectedSectors: ['Venture Capital', 'Enterprise SaaS', 'Developer Tools', 'Private Equity'],
      affectedAssets: ['Private Secondary Markets', 'Emerging Tech ETFs'],
      bullishImplications: 'Capital-efficient startups achieve profitability with substantially less dilution.',
      bearishRisks: 'Late-stage growth companies without clean cash flows continue to face down-rounds or recapitalizations.'
    }
  },
  {
    id: 'art-balkans-5',
    category: 'Balkans',
    headline: 'Kosovo and Regional Western Balkan Corridor Attract Foreign Direct Investment in Tech & Green Energy',
    subtitle: 'Pristina emerges as a fast-growing digital software center as regional transmission grid interconnections gain European backing.',
    author: 'Arben Krasniqi & Fiona Berisha',
    source: 'Kosovo Ministry of Economy & Regional Investment Chamber',
    sourceUrl: 'https://alpha-financial.int/balkans/pristina-tech-grid-2026',
    publishedAt: '2026-10-14 05:15 CEST',
    readTime: '4 min read',
    imageUrl: startupFounderImg,
    imageCaption: 'Software engineers and startup teams in Pristina collaborating on international enterprise platforms.',
    verificationStatus: 'Verified Official',
    region: 'Balkans',
    content: [
      'The Western Balkans regional business ecosystem is experiencing steady capital inflows driven by bilateral energy connectivity agreements and a flourishing software engineering diaspora.',
      'In Kosovo, the expansion of the Pristina Tech Park and new venture acceleration programs have facilitated over 35 cross-border partnerships with German, Swiss, and American technology enterprises in the past twelve months.',
      'Simultaneously, Albania and North Macedonia finalized cross-border transmission agreements linking solar installations with hydroelectric storage, establishing greater energy independence for the Southern Adriatic corridor.',
      'Financial analysts note that regional corporate tax regimes, highly multilingual engineering talent, and alignment with EU green corridor standards position the Balkans as an increasingly attractive operational outpost for global venture-backed firms.'
    ],
    keyTakeaways: [
      'Pristina software exports expanded 38% year-over-year, leading Balkan IT service growth.',
      'Cross-border green transmission corridor secures €420M in European and multilateral financing.',
      'Regional corporate tax incentives are attracting remote development centers from DACH economies.'
    ],
    financialImpact: {
      macroTransmission: 'Regional infrastructure integration drives local GDP expansion and reduces Balkan reliance on volatile imported fossil fuel baseloads.',
      affectedSectors: ['Renewable Energy', 'Software Outsourcing', 'Regional Logistics', 'Balkan Real Estate'],
      affectedAssets: ['Balkan Sovereign Debt', 'Regional Infrastructure Bonds'],
      bullishImplications: 'De-risks supply chains for Central European industrial firms establishing nearshoring facilities.',
      bearishRisks: 'Bureaucratic friction and administrative delays require diligent local partner selection.'
    }
  },
  {
    id: 'art-crypto-6',
    category: 'Crypto',
    headline: 'Bitcoin Consolidates Above $91,000 as Institutional Spot ETF Accumulation Reaches $48 Billion',
    subtitle: 'Layer-2 rollup throughput surpasses mainnet volumes while regulated institutional custody standards expand into sovereign wealth funds.',
    author: 'Nikolai Thorne',
    source: 'CoinGecko & Glassnode On-Chain Analytics',
    sourceUrl: 'https://alpha-financial.int/crypto/btc-institutional-holdings',
    publishedAt: '2026-10-14 06:10 CEST',
    readTime: '6 min read',
    imageUrl: heroMarketsImg,
    imageCaption: 'Institutional crypto custody dashboards and exchange liquidity heatmaps.',
    verificationStatus: 'Confirmed Report',
    region: 'Global',
    content: [
      'Bitcoin maintained steady bids between $91,200 and $91,800, consolidating within a narrow 1.8% intraday band. Net cumulative inflows into regulated spot exchange-traded funds across the US, UK, and Hong Kong crossed $48.5 billion.',
      'On-chain data indicates that long-term holder supply held outside centralized exchanges has reached a multi-year high of 72.4%, significantly diminishing liquid order-book depth on major venues.',
      'In decentralized finance, Ethereum Layer-2 networks arbitrated a record 42 million transactions over the past 48 hours, with gas fees averaging less than $0.004 per transaction post-upgrade.',
      'Security advisory: The ALPHA Intelligence desk warns investors regarding multiple unauthorized vanity contract clones claiming early allocation tokens for unannounced testnet campaigns. Always verify cryptographic root hashes via official project documentation.'
    ],
    keyTakeaways: [
      'Institutional spot ETF flows show continuous net positive weekly absorption.',
      'Exchange reserves of BTC remain at their lowest ratio to circulating supply since 2017.',
      'Layer-2 transaction velocity is displacing legacy transaction settlement friction.'
    ],
    financialImpact: {
      macroTransmission: 'Crypto market capitalization increasingly behaves as a macro liquidity gauge, correlating with global M2 money supply trends.',
      affectedSectors: ['Digital Asset Exchanges', 'Blockchain Infrastructure', 'Custody & Staking', 'Fintech'],
      affectedAssets: ['BTC', 'ETH', 'SOL', 'COIN (Coinbase)'],
      bullishImplications: 'Predictable structural institutional allocations reduce extreme crash downside volatility.',
      bearishRisks: 'Regulatory scrutiny on international stablecoin reserve transparency remains an active legislative debate.'
    }
  }
];

export const INITIAL_MARKET_ASSETS: MarketAsset[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    category: 'Index',
    price: 5882.40,
    change: 32.10,
    changePercent: 0.55,
    high24h: 5894.20,
    low24h: 5850.10,
    volume: '$42.8B',
    sparkline: [5840, 5852, 5860, 5855, 5872, 5882],
    lastUpdated: '14:45 EST'
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    category: 'Index',
    price: 20490.15,
    change: 184.30,
    changePercent: 0.91,
    high24h: 20520.00,
    low24h: 20310.50,
    volume: '$31.2B',
    sparkline: [20310, 20350, 20410, 20400, 20460, 20490],
    lastUpdated: '14:45 EST'
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones Industrial',
    category: 'Index',
    price: 43120.80,
    change: -45.20,
    changePercent: -0.10,
    high24h: 43220.00,
    low24h: 43050.00,
    volume: '$14.1B',
    sparkline: [43180, 43210, 43190, 43100, 43080, 43120],
    lastUpdated: '14:45 EST'
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000',
    category: 'Index',
    price: 2268.50,
    change: 18.90,
    changePercent: 0.84,
    high24h: 2275.10,
    low24h: 2245.00,
    volume: '$6.8B',
    sparkline: [2245, 2250, 2258, 2262, 2265, 2268],
    lastUpdated: '14:45 EST'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    category: 'Crypto',
    price: 91420.00,
    change: 1680.00,
    changePercent: 1.87,
    high24h: 92100.00,
    low24h: 89650.00,
    volume: '$38.4B',
    marketCap: '$1.81T',
    sparkline: [89650, 90200, 90800, 90450, 91100, 91420],
    lastUpdated: 'Live 24/7'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    category: 'Crypto',
    price: 3380.50,
    change: 72.80,
    changePercent: 2.20,
    high24h: 3410.00,
    low24h: 3290.00,
    volume: '$21.6B',
    marketCap: '$407B',
    sparkline: [3290, 3310, 3345, 3330, 3365, 3380],
    lastUpdated: 'Live 24/7'
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    category: 'Crypto',
    price: 194.50,
    change: 8.20,
    changePercent: 4.40,
    high24h: 196.80,
    low24h: 185.00,
    volume: '$8.2B',
    marketCap: '$92.1B',
    sparkline: [185, 187, 191, 189, 193, 194.5],
    lastUpdated: 'Live 24/7'
  },
  {
    symbol: 'XAU',
    name: 'Gold (Spot / oz)',
    category: 'Commodity',
    price: 2748.20,
    change: 14.50,
    changePercent: 0.53,
    high24h: 2755.00,
    low24h: 2731.00,
    volume: '$19.5B',
    sparkline: [2731, 2736, 2742, 2740, 2745, 2748],
    lastUpdated: '17:00 EST'
  },
  {
    symbol: 'XAG',
    name: 'Silver (Spot / oz)',
    category: 'Commodity',
    price: 32.40,
    change: 0.62,
    changePercent: 1.95,
    high24h: 32.70,
    low24h: 31.65,
    volume: '$4.1B',
    sparkline: [31.65, 31.85, 32.10, 32.05, 32.30, 32.40],
    lastUpdated: '17:00 EST'
  },
  {
    symbol: 'WTI',
    name: 'Crude Oil (WTI / bbl)',
    category: 'Commodity',
    price: 71.85,
    change: -1.15,
    changePercent: -1.58,
    high24h: 73.40,
    low24h: 71.20,
    volume: '$12.3B',
    sparkline: [73.20, 72.80, 72.40, 71.90, 71.50, 71.85],
    lastUpdated: '17:00 EST'
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'Forex',
    price: 1.0872,
    change: -0.0018,
    changePercent: -0.17,
    high24h: 1.0910,
    low24h: 1.0855,
    volume: '$118B',
    sparkline: [1.0905, 1.0895, 1.0880, 1.0870, 1.0865, 1.0872],
    lastUpdated: '17:00 EST'
  },
  {
    symbol: 'DXY',
    name: 'US Dollar Index',
    category: 'Forex',
    price: 103.85,
    change: 0.28,
    changePercent: 0.27,
    high24h: 104.10,
    low24h: 103.45,
    volume: 'Interbank',
    sparkline: [103.50, 103.62, 103.75, 103.70, 103.82, 103.85],
    lastUpdated: '17:00 EST'
  },
  {
    symbol: 'US10Y',
    name: 'US 10Y Treasury Yield',
    category: 'Bond',
    price: 4.218,
    change: 0.032,
    changePercent: 0.76,
    high24h: 4.235,
    low24h: 4.180,
    volume: 'Treasury Dept',
    sparkline: [4.185, 4.195, 4.210, 4.205, 4.215, 4.218],
    lastUpdated: '17:00 EST'
  }
];

export const STOCKS_TO_WATCH: MarketAsset[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'Stock',
    price: 142.80,
    change: 4.35,
    changePercent: 3.14,
    high24h: 144.10,
    low24h: 139.20,
    volume: '$18.4B',
    marketCap: '$3.51T',
    peRatio: 52.4,
    eps: 2.72,
    dividendYield: 0.03,
    sparkline: [139.2, 140.5, 141.8, 141.2, 142.4, 142.8],
    lastUpdated: '16:00 EST'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    category: 'Stock',
    price: 448.50,
    change: 5.20,
    changePercent: 1.17,
    high24h: 450.20,
    low24h: 444.00,
    volume: '$8.9B',
    marketCap: '$3.33T',
    peRatio: 36.8,
    eps: 12.18,
    dividendYield: 0.72,
    sparkline: [444.0, 445.2, 447.0, 446.5, 448.1, 448.5],
    lastUpdated: '16:00 EST'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc',
    category: 'Stock',
    price: 234.60,
    change: 1.80,
    changePercent: 0.77,
    high24h: 236.00,
    low24h: 233.10,
    volume: '$9.4B',
    marketCap: '$3.58T',
    peRatio: 34.2,
    eps: 6.85,
    dividendYield: 0.43,
    sparkline: [233.2, 233.8, 234.5, 234.1, 234.4, 234.6],
    lastUpdated: '16:00 EST'
  },
  {
    symbol: 'ASML',
    name: 'ASML Holding N.V.',
    category: 'Stock',
    price: 768.40,
    change: 22.80,
    changePercent: 3.06,
    high24h: 775.00,
    low24h: 748.00,
    volume: '$2.8B',
    marketCap: '$302B',
    peRatio: 41.5,
    eps: 18.50,
    dividendYield: 0.88,
    sparkline: [748, 755, 762, 760, 766, 768.4],
    lastUpdated: '17:30 CET'
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    category: 'Stock',
    price: 48.90,
    change: 2.15,
    changePercent: 4.60,
    high24h: 49.40,
    low24h: 46.80,
    volume: '$3.4B',
    marketCap: '$108B',
    peRatio: 84.1,
    eps: 0.58,
    dividendYield: 0.00,
    sparkline: [46.8, 47.4, 48.1, 47.9, 48.5, 48.9],
    lastUpdated: '16:00 EST'
  },
  {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor',
    category: 'Stock',
    price: 202.10,
    change: 4.80,
    changePercent: 2.43,
    high24h: 203.50,
    low24h: 198.00,
    volume: '$5.6B',
    marketCap: '$1.04T',
    peRatio: 28.6,
    eps: 7.06,
    dividendYield: 1.15,
    sparkline: [198, 199.5, 201.0, 200.2, 201.8, 202.1],
    lastUpdated: '16:00 EST'
  }
];

export const CRYPTO_INTELLIGENCE: CryptoAsset[] = [
  {
    symbol: 'BTC',
    tokenSymbol: 'BTC',
    name: 'Bitcoin',
    category: 'Crypto',
    price: 91420.00,
    change: 1680.00,
    changePercent: 1.87,
    high24h: 92100.00,
    low24h: 89650.00,
    volume: '$38.4B',
    marketCap: '$1.81T',
    blockchain: 'Bitcoin Core',
    circulatingSupply: '19.81M BTC',
    status: 'Established',
    defiTvl: '$6.2B (WBTC/tBTC/Runes)',
    sparkline: [89650, 90200, 90800, 90450, 91100, 91420],
    lastUpdated: 'Live'
  },
  {
    symbol: 'ETH',
    tokenSymbol: 'ETH',
    name: 'Ethereum',
    category: 'Crypto',
    price: 3380.50,
    change: 72.80,
    changePercent: 2.20,
    high24h: 3410.00,
    low24h: 3290.00,
    volume: '$21.6B',
    marketCap: '$407B',
    blockchain: 'Ethereum EVM',
    circulatingSupply: '120.4M ETH',
    status: 'Established',
    defiTvl: '$64.8B',
    sparkline: [3290, 3310, 3345, 3330, 3365, 3380],
    lastUpdated: 'Live'
  },
  {
    symbol: 'SOL',
    tokenSymbol: 'SOL',
    name: 'Solana',
    category: 'Crypto',
    price: 194.50,
    change: 8.20,
    changePercent: 4.40,
    high24h: 196.80,
    low24h: 185.00,
    volume: '$8.2B',
    marketCap: '$92.1B',
    blockchain: 'Solana SVM',
    circulatingSupply: '473.5M SOL',
    status: 'Established',
    defiTvl: '$8.9B',
    sparkline: [185, 187, 191, 189, 193, 194.5],
    lastUpdated: 'Live'
  },
  {
    symbol: 'TIA',
    tokenSymbol: 'TIA',
    name: 'Celestia',
    category: 'Crypto',
    price: 6.85,
    change: -0.42,
    changePercent: -5.78,
    high24h: 7.35,
    low24h: 6.70,
    volume: '$310M',
    marketCap: '$1.48B',
    blockchain: 'Cosmos / Celestia DA',
    circulatingSupply: '216M TIA',
    status: 'Token Unlock Imminent',
    warningNote: 'Major scheduled token unlock: 175M TIA ($1.1B) scheduled for private investor vesting on Oct 30.',
    sparkline: [7.35, 7.20, 7.05, 6.95, 6.80, 6.85],
    lastUpdated: 'Live'
  },
  {
    symbol: 'AVAX',
    tokenSymbol: 'AVAX',
    name: 'Avalanche',
    category: 'Crypto',
    price: 32.40,
    change: 1.10,
    changePercent: 3.51,
    high24h: 33.10,
    low24h: 31.00,
    volume: '$640M',
    marketCap: '$13.2B',
    blockchain: 'Avalanche Subnets',
    circulatingSupply: '407M AVAX',
    status: 'Established',
    defiTvl: '$1.42B',
    sparkline: [31.0, 31.4, 31.9, 31.8, 32.2, 32.4],
    lastUpdated: 'Live'
  }
];

export const STARTUP_RADAR: StartupCompany[] = [
  {
    id: 'startup-1',
    name: 'Aethera Silicon',
    website: 'https://aetherasilicon.tech',
    industry: 'DeepTech / Semiconductors',
    subSector: 'Sub-2nm Photonic Interconnects',
    location: 'Zurich, Switzerland & Austin, TX',
    founders: ['Dr. Lukas Meyer', 'Elena Vasquez (ex-ASML optics director)'],
    launchDate: '2026-08-15',
    fundingStage: 'Series A',
    announcedAmount: '$38,000,000',
    leadInvestors: ['Nordic Horizon Ventures', 'Applied Materials Ventures', 'Sequoia Europe'],
    description: 'Developing ultra-low-latency on-chip optical interconnects that eliminate copper heat choke-points in AI GPU clusters, cutting rack power draw by 42%.',
    seeking: ['Strategic Partners', 'Founding Engineers', 'Early Beta Customers'],
    applicationLink: 'https://aetherasilicon.tech/partners',
    verifiedSource: 'Swiss Federal Commercial Registry & Venture Wire',
    verifiedAt: '2026-10-12'
  },
  {
    id: 'startup-2',
    name: 'Illyria Compute Grid',
    website: 'https://illyriacompute.io',
    industry: 'Cloud & AI Infrastructure',
    subSector: 'Decentralized Micro-Data Centers',
    location: 'Pristina, Kosovo & Vienna, Austria',
    founders: ['Besart Hoxha (ex-ETH Zurich)', 'Markus Wallner'],
    launchDate: '2026-06-01',
    fundingStage: 'Seed',
    announcedAmount: '$6,400,000',
    leadInvestors: ['Balkan Seed Fund', 'Speedinvest', 'Angel Syndicate (DACH)'],
    description: 'Aggregating hydro and solar energy surplus in Southeastern Europe to power decentralized high-throughput AI inference pods for European fintechs.',
    seeking: ['Venture Capital', 'Strategic Partners', 'Founding Engineers'],
    applicationLink: 'https://illyriacompute.io/apply',
    verifiedSource: 'Kosovo Innovation Agency & Speedinvest Portfolio',
    verifiedAt: '2026-10-10'
  },
  {
    id: 'startup-3',
    name: 'Synapse Ledger',
    website: 'https://synapseledger.org',
    industry: 'Fintech & Blockchain',
    subSector: 'Institutional Zero-Knowledge Settlement',
    location: 'London, UK & New York, NY',
    founders: ['Victoria Sterling (ex-Goldman Sachs digital assets)', 'Kavita Patel'],
    launchDate: '2026-04-10',
    fundingStage: 'Series A',
    announcedAmount: '$24,500,000',
    leadInvestors: ['Andreessen Horowitz (a16z crypto)', 'Index Ventures'],
    description: 'Compliant ZK-proof atomic settlement layer for Tier-1 investment banks trading tokenized sovereign debt and foreign exchange contracts.',
    seeking: ['Strategic Partners', 'Early Beta Customers'],
    applicationLink: 'https://synapseledger.org/institutions',
    verifiedSource: 'UK Companies House & a16z crypto disclosures',
    verifiedAt: '2026-10-08'
  },
  {
    id: 'startup-4',
    name: 'NeuroVigil Biosystems',
    website: 'https://neurovigil.bio',
    industry: 'Healthcare Technology',
    subSector: 'Continuous Non-Invasive Metabolic Biomarkers',
    location: 'Boston, MA',
    founders: ['Dr. Sarah Lin (Harvard Medical)', 'Robert Thorne'],
    launchDate: '2026-07-20',
    fundingStage: 'Seed',
    announcedAmount: '$8,200,000',
    leadInvestors: ['F-Prime Capital', 'Khosla Ventures'],
    description: 'Skin-surface acoustic sensor detecting systemic inflammatory and cardiovascular risk spikes 48 hours prior to acute clinical episodes.',
    seeking: ['Angel Investors', 'Early Beta Customers', 'Founding Engineers'],
    applicationLink: 'https://neurovigil.bio/trials',
    verifiedSource: 'SEC Form D Filing & ClinicalTrials.gov ID',
    verifiedAt: '2026-10-11'
  }
];

export const ECONOMIC_CALENDAR: EconomicEvent[] = [
  {
    id: 'econ-1',
    title: 'US Core PCE Price Index (MoM / YoY)',
    country: 'United States',
    countryCode: 'US',
    datePristina: '2026-10-16',
    timePristina: '14:30',
    timeEST: '08:30 AM',
    importance: 'High',
    previous: '2.6% YoY',
    forecast: '2.5% YoY',
    impact: 'Pending',
    source: 'Bureau of Economic Analysis'
  },
  {
    id: 'econ-2',
    title: 'European Central Bank (ECB) Governing Council Rate Decision',
    country: 'Eurozone',
    countryCode: 'EU',
    datePristina: '2026-10-17',
    timePristina: '14:15',
    timeEST: '08:15 AM',
    importance: 'High',
    previous: '3.25%',
    forecast: '3.00%',
    impact: 'Pending',
    source: 'European Central Bank'
  },
  {
    id: 'econ-3',
    title: 'Federal Reserve FOMC Meeting Minutes & Balance Sheet Runoff',
    country: 'United States',
    countryCode: 'US',
    datePristina: '2026-10-15',
    timePristina: '20:00',
    timeEST: '02:00 PM',
    importance: 'High',
    previous: '4.75% - 5.00%',
    forecast: 'Hold / Guidance on neutral rate',
    impact: 'Pending',
    source: 'Federal Open Market Committee'
  },
  {
    id: 'econ-4',
    title: 'US Initial Jobless Claims',
    country: 'United States',
    countryCode: 'US',
    datePristina: '2026-10-15',
    timePristina: '14:30',
    timeEST: '08:30 AM',
    importance: 'Medium',
    previous: '218K',
    forecast: '222K',
    impact: 'Pending',
    source: 'Department of Labor'
  },
  {
    id: 'econ-5',
    title: 'Eurozone Flash Manufacturing & Services PMI',
    country: 'Eurozone',
    countryCode: 'EU',
    datePristina: '2026-10-18',
    timePristina: '10:00',
    timeEST: '04:00 AM',
    importance: 'Medium',
    previous: '49.8 (Contraction)',
    forecast: '50.4 (Expansion threshold)',
    impact: 'Pending',
    source: 'S&P Global / Eurostat'
  },
  {
    id: 'econ-6',
    title: 'Western Balkans Energy & Infrastructure Ministerial Forum',
    country: 'Kosovo / Western Balkans',
    countryCode: 'XK',
    datePristina: '2026-10-19',
    timePristina: '09:30',
    timeEST: '03:30 AM',
    importance: 'Medium',
    previous: 'Regional Interconnector Phase I',
    forecast: 'Cross-Border Renewable Power Purchase Framework',
    impact: 'Pending',
    source: 'Energy Community Secretariat'
  }
];

export const INVESTMENT_RESEARCH_REPORTS: InvestmentResearchReport[] = [
  {
    id: 'res-macro-1',
    title: 'Cross-Asset Valuation Equilibrium: Balancing Capex Supercycles Against Duration Risk',
    subtitle: 'Where does it make empirical sense to allocate capital in late 2026? A rigorous comparison of equities, sovereign yields, digital assets, and commodities.',
    assetClass: 'Multi-Asset Tactical Allocation',
    timestamp: '2026-10-14 06:00 CEST',
    timeHorizon: '3-6 Months',
    currentSituation: 'Global capital allocators face an uncommon macro configuration: strong enterprise balance sheets and persistent US corporate earnings growth contrasting with elevated nominal discount rates (10Y UST at 4.22%). S&P 500 forward P/E stands at 21.8x, implying that equity risk premiums are compressed near fifteen-year lows.',
    supportingData: [
      'S&P 500 forward earnings yield is 4.58%, offering only a 36 bps premium over the 10-Year risk-free benchmark.',
      'Sovereign debt breakeven inflation rates (5-year forward) are stabilized at 2.24%, confirming anchored medium-term price stability expectations.',
      'Gold and industrial commodities have decoupled from real yield spikes, buoyed by sovereign central bank reserve diversification and electrification demand.',
      'Enterprise AI software revenue acceleration is beginning to outpace initial hardware capex depreciation timelines.'
    ],
    bullScenario: {
      probability: 55,
      targetUpside: '+8% to +14% across select cyclicals, AI infrastructure, and selective high-beta crypto',
      catalysts: [
        'Corporate free cash flow conversion remains resilient above 85% for Tier-1 cash compounders.',
        'Federal Reserve provides clear runway for gradual recalibration toward a 3.50% terminal funds rate.',
        'Energy and logistics costs remain contained as new LNG and renewable capacity comes online.'
      ]
    },
    bearScenario: {
      probability: 45,
      downsideRisk: '-10% to -15% valuation multiple compression if long yields test 4.75%',
      triggers: [
        'Fiscal deficit funding pressures force unexpected coupon auction expansions, driving 10Y yields past 4.60%.',
        'Geopolitical disruptions in key maritime shipping corridors trigger fresh supply-side headline inflation.',
        'Enterprise IT budget rationalization delays second-wave automation software deployments.'
      ]
    },
    falsificationEvidence: 'A sustained climb in US 10-year Treasury yields above 4.65% accompanied by widening high-yield credit spreads (>400 bps) would invalidate the constructive multi-asset stance, requiring rotation into 3-month Treasury Bills and defensive gold reserves.',
    keyRisks: [
      'Sovereign debt supply absorption dynamics in primary dealer balance sheets.',
      'Concentration risk in top 5 mega-cap US technology market weightings.',
      'Unanticipated currency volatility across EUR/USD and USD/JPY impacting corporate foreign earnings translation.'
    ],
    disclosure: 'This research is prepared exclusively for institutional and accredited research subscribers. It does not constitute individualized investment advice, an endorsement, or a solicitation to buy or sell securities. Past performance does not guarantee future results.'
  }
];
