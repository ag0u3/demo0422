export type Language = "ja" | "en";

export interface TranslationKeys {
  siteTitle: string;
  siteSubtitle: string;
  search: string;
  searchPlaceholder: string;
  topics: string;
  business: string;
  entertainment: string;
  wsj: string;
  twice: string;
  twiceSubtitle: string;
  onceJapan: string;
  msStock: string;
  msStockSubtitle: string;
  bookmarks: string;
  bookmarksSubtitle: string;
  newsSubtitle: string;
  readMore: string;
  lastUpdated: string;
  toggleTheme: string;
  language: string;
  footerText: string;
  price: string;
  change: string;
  high: string;
  low: string;
  volume: string;
}

export const translations: Record<Language, TranslationKeys> = {
  ja: {
    siteTitle: "Modern News Hub",
    siteSubtitle: "最新ニュースと市場情報をひとつに",
    search: "検索",
    searchPlaceholder: "ニュースを検索...",
    topics: "トピックス",
    business: "ビジネス",
    entertainment: "エンタメ",
    wsj: "WSJ 日本版",
    twice: "TWICE 最新ニュース",
    twiceSubtitle: "Google News から自動収集",
    onceJapan: "ONCE JAPAN 公式",
    msStock: "Microsoft 株価",
    msStockSubtitle: "MSFT - NASDAQ リアルタイムチャート",
    bookmarks: "ブックマーク",
    bookmarksSubtitle: "よく使うサイトへのショートカット",
    newsSubtitle: "今話題のニュース",
    readMore: "続きを読む",
    lastUpdated: "最終更新",
    toggleTheme: "テーマ切替",
    language: "言語",
    footerText: "Modern News Hub - 個人テストサイト",
    price: "現在値",
    change: "変動",
    high: "高値",
    low: "安値",
    volume: "出来高",
  },
  en: {
    siteTitle: "Modern News Hub",
    siteSubtitle: "Latest news and market insights in one place",
    search: "Search",
    searchPlaceholder: "Search news...",
    topics: "Topics",
    twice: "TWICE Latest News",
    twiceSubtitle: "Auto-aggregated from Google News",
    onceJapan: "ONCE JAPAN Official",
    business: "Business",
    entertainment: "Entertainment",
    wsj: "WSJ Japan",
    msStock: "Microsoft Stock",
    msStockSubtitle: "MSFT - NASDAQ Real-time Chart",
    bookmarks: "Bookmarks",
    bookmarksSubtitle: "Quick links to your favorite sites",
    newsSubtitle: "Trending stories now",
    readMore: "Read more",
    lastUpdated: "Last updated",
    toggleTheme: "Toggle theme",
    language: "Language",
    footerText: "Modern News Hub - Personal test site",
    price: "Price",
    change: "Change",
    high: "High",
    low: "Low",
    volume: "Volume",
  },
};
