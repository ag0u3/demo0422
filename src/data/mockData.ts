export interface NewsItem {
  id: string;
  title: string;
  titleEn: string;
  url: string;
  category: "topics" | "business" | "entertainment" | "wsj" | "twice";
  publishedAt: string;
  source?: string;
}

export interface BookmarkItem {
  name: string;
  url: string;
  color: string;
}

export interface StockDataPoint {
  date: string;
  price: number;
  volume: number;
}

export const mockNews: NewsItem[] = [
  // Topics
  {
    id: "t1",
    title: "イランが海峡で船舶2隻だ捕 報道",
    titleEn: "Iran reportedly seizes 2 vessels in strait",
    url: "https://news.yahoo.co.jp/",
    category: "topics",
    publishedAt: "2026-04-22T09:30:00Z",
  },
  {
    id: "t2",
    title: "ペルシャ湾内船舶から邦人4人帰国",
    titleEn: "4 Japanese return from vessels in Persian Gulf",
    url: "https://news.yahoo.co.jp/",
    category: "topics",
    publishedAt: "2026-04-22T08:15:00Z",
  },
  {
    id: "t3",
    title: "茨城の不法就労通報制度 来月開始",
    titleEn: "Ibaraki illegal employment reporting system starts next month",
    url: "https://news.yahoo.co.jp/",
    category: "topics",
    publishedAt: "2026-04-22T07:45:00Z",
  },
  {
    id: "t4",
    title: "女児一時不明 百貨店で保護し連絡",
    titleEn: "Missing girl found and protected at department store",
    url: "https://news.yahoo.co.jp/",
    category: "topics",
    publishedAt: "2026-04-22T06:20:00Z",
  },
  {
    id: "t5",
    title: "北海道の町にインド人急増 理由",
    titleEn: "Reasons behind surge of Indian residents in Hokkaido town",
    url: "https://news.yahoo.co.jp/",
    category: "topics",
    publishedAt: "2026-04-22T05:00:00Z",
  },
  // Business
  {
    id: "b1",
    title: "首都高談合 4社に排除措置命令",
    titleEn: "Cease-and-desist order issued to 4 firms in highway bid-rigging",
    url: "https://news.yahoo.co.jp/",
    category: "business",
    publishedAt: "2026-04-22T10:00:00Z",
  },
  {
    id: "b2",
    title: "損保大手 トヨタ内部情報持ち出し",
    titleEn: "Major insurer accused of leaking Toyota internal data",
    url: "https://news.yahoo.co.jp/",
    category: "business",
    publishedAt: "2026-04-22T09:00:00Z",
  },
  {
    id: "b3",
    title: "ソニー生命社員 顧客の金銭詐取か",
    titleEn: "Sony Life employee suspected of defrauding customers",
    url: "https://news.yahoo.co.jp/",
    category: "business",
    publishedAt: "2026-04-22T08:30:00Z",
  },
  {
    id: "b4",
    title: "銀座線 13時間ぶりに全線運転再開",
    titleEn: "Ginza Line resumes full operation after 13 hours",
    url: "https://news.yahoo.co.jp/",
    category: "business",
    publishedAt: "2026-04-22T07:10:00Z",
  },
  {
    id: "b5",
    title: "大手 新卒「厳選採用」相次ぐ背景",
    titleEn: "Why major firms are tightening new graduate hiring",
    url: "https://news.yahoo.co.jp/",
    category: "business",
    publishedAt: "2026-04-22T06:00:00Z",
  },
  // Entertainment
  {
    id: "e1",
    title: "EXILEライブにB'z松本孝弘 歓声",
    titleEn: "B'z's Matsumoto joins EXILE live, fans cheer",
    url: "https://news.yahoo.co.jp/",
    category: "entertainment",
    publishedAt: "2026-04-22T11:00:00Z",
  },
  {
    id: "e2",
    title: "セカオワが独立発表 新会社を設立",
    titleEn: "SEKAI NO OWARI announces independence, new company",
    url: "https://news.yahoo.co.jp/",
    category: "entertainment",
    publishedAt: "2026-04-22T10:30:00Z",
  },
  {
    id: "e3",
    title: "ポケモン大会で優勝剥奪 公式声明",
    titleEn: "Pokémon tournament title revoked, official statement",
    url: "https://news.yahoo.co.jp/",
    category: "entertainment",
    publishedAt: "2026-04-22T09:45:00Z",
  },
  {
    id: "e4",
    title: "「千原ジュニアの座王」世界進出",
    titleEn: "'Chihara Junior's Zaou' to expand worldwide",
    url: "https://news.yahoo.co.jp/",
    category: "entertainment",
    publishedAt: "2026-04-22T08:00:00Z",
  },
  {
    id: "e5",
    title: "菊池風磨 活動休止「不甲斐ない」",
    titleEn: "Fuma Kikuchi takes hiatus, expresses regret",
    url: "https://news.yahoo.co.jp/",
    category: "entertainment",
    publishedAt: "2026-04-22T07:00:00Z",
  },
  // WSJ
  {
    id: "w1",
    title: "FRB議長候補ウォーシュ氏、承認公聴会での主な発言",
    titleEn: "Key moments from Kevin Warsh's congressional testimony",
    url: "https://jp.wsj.com/",
    category: "wsj",
    publishedAt: "2026-04-22T12:00:00Z",
  },
  {
    id: "w2",
    title: "アップルのターナス次期CEO、求められる刷新",
    titleEn: "Apple's new boss needs to think a little more different",
    url: "https://jp.wsj.com/",
    category: "wsj",
    publishedAt: "2026-04-22T11:30:00Z",
  },
  {
    id: "w3",
    title: "FRB議長候補ウォーシュ氏、トランプ氏と投資家の説得で綱渡り",
    titleEn: "Warsh embarks on high-wire act of convincing investors",
    url: "https://jp.wsj.com/",
    category: "wsj",
    publishedAt: "2026-04-22T10:45:00Z",
  },
  {
    id: "w4",
    title: "議長候補ウォーシュ氏の利下げ姿勢に注目",
    titleEn: "Warsh's stance on rate cuts in focus",
    url: "https://jp.wsj.com/",
    category: "wsj",
    publishedAt: "2026-04-22T09:30:00Z",
  },
  {
    id: "w5",
    title: "テック大手の決算、AI投資の行方を占う",
    titleEn: "Big Tech earnings to reveal AI spending trajectory",
    url: "https://jp.wsj.com/",
    category: "wsj",
    publishedAt: "2026-04-22T08:00:00Z",
  },
];

export const bookmarks: BookmarkItem[] = [
  { name: "Google", url: "https://www.google.com/", color: "#4285F4" },
  { name: "GitHub", url: "https://github.com/", color: "#181717" },
  { name: "Azure", url: "https://azure.microsoft.com/", color: "#0078D4" },
  { name: "React", url: "https://react.dev/", color: "#61DAFB" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/", color: "#3178C6" },
  { name: "MUI", url: "https://mui.com/", color: "#007FFF" },
  { name: "Next.js", url: "https://nextjs.org/", color: "#000000" },
  { name: "Node.js", url: "https://nodejs.org/", color: "#5FA04E" },
  { name: "Vercel", url: "https://vercel.com/", color: "#000000" },
  { name: "MDN", url: "https://developer.mozilla.org/", color: "#000000" },
];

// Real MSFT stock data fetched at build time from Nasdaq.
// See scripts/fetch-msft-stock.mjs
import msftStockJson from "./msftStock.json";

interface MsftStockJson {
  symbol: string;
  currency: string;
  regularMarketPrice: number | null;
  previousClose: number | null;
  fetchedAt: string;
  daily: StockDataPoint[];
  intraday: StockDataPoint[];
}

const stock = msftStockJson as MsftStockJson;

// Fallback to a single placeholder point if fetch failed (keeps UI alive)
const safeDaily: StockDataPoint[] =
  stock.daily.length > 0
    ? stock.daily
    : [{ date: "2026-04-22", price: 0, volume: 0 }];

export const msftStockData: StockDataPoint[] = safeDaily;

// If intraday is empty (after-hours / weekend), fall back to last day daily point
export const msftIntradayData: StockDataPoint[] =
  stock.intraday.length > 0
    ? stock.intraday
    : [
        {
          date: "16:00",
          price: safeDaily[safeDaily.length - 1].price,
          volume: safeDaily[safeDaily.length - 1].volume,
        },
      ];

export const msftStats = {
  current: msftStockData[msftStockData.length - 1].price,
  previous:
    msftStockData[msftStockData.length - 2]?.price ??
    msftStockData[msftStockData.length - 1].price,
  high: Math.max(...msftStockData.slice(-30).map((d) => d.price)),
  low: Math.min(...msftStockData.slice(-30).map((d) => d.price)),
  volume: msftStockData[msftStockData.length - 1].volume,
};
