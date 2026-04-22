// Fetch TWICE news from Google News RSS at build time.
// Output: src/data/twiceNews.json
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/data/twiceNews.json");

const FEED_URL =
  "https://news.google.com/rss/search?q=TWICE+%E3%83%88%E3%82%A5%E3%83%AF%E3%82%A4%E3%82%B9&hl=ja&gl=JP&ceid=JP:ja";

function decodeHtml(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

function pickTag(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  let val = m[1].trim();
  // CDATA
  const cdata = val.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) val = cdata[1];
  return decodeHtml(val);
}

async function fetchTwiceNews() {
  console.log("[twice-news] Fetching from Google News RSS...");
  let xml;
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "ModernNewsHub/1.0 (+build-time)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.warn(
      `[twice-news] Fetch failed (${err.message}). Using fallback data.`
    );
    return writeFallback();
  }

  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) && items.length < 12) {
    const block = m[1];
    const title = stripHtml(pickTag(block, "title"));
    const link = pickTag(block, "link");
    const pubDate = pickTag(block, "pubDate");
    const source = stripHtml(pickTag(block, "source"));
    if (!title || !link) continue;
    items.push({
      id: `twice-${items.length}`,
      title,
      titleEn: title,
      url: link,
      category: "twice",
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      source: source || "Google News",
    });
  }

  if (items.length === 0) {
    console.warn("[twice-news] No items parsed. Using fallback.");
    return writeFallback();
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(
    OUT_PATH,
    JSON.stringify({ fetchedAt: new Date().toISOString(), items }, null, 2)
  );
  console.log(`[twice-news] Wrote ${items.length} items to ${OUT_PATH}`);
}

function writeFallback() {
  const fallback = {
    fetchedAt: new Date().toISOString(),
    items: [
      {
        id: "twice-0",
        title: "TWICE 最新情報を取得中... (フォールバック表示)",
        titleEn: "Loading TWICE latest news... (fallback)",
        url: "https://news.google.com/search?q=TWICE",
        category: "twice",
        publishedAt: new Date().toISOString(),
        source: "Google News",
      },
    ],
  };
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(fallback, null, 2));
}

await fetchTwiceNews();
