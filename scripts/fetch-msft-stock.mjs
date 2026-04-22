// Fetch real MSFT stock data at build time from Nasdaq's public API.
// No API key required.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_PATH = resolve(__dirname, "../src/data/msftStock.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function curlJson(url) {
  const body = execFileSync(
    "curl",
    ["-s", "--max-time", "20", "-A", UA, "-H", "Accept: application/json", url],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  return JSON.parse(body);
}

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// Parse "$424.16" -> 424.16
function parsePrice(s) {
  if (typeof s !== "string") return NaN;
  return parseFloat(s.replace(/[$,]/g, ""));
}
function parseInt2(s) {
  if (typeof s !== "string") return 0;
  return parseInt(s.replace(/,/g, ""), 10) || 0;
}
// "04/21/2026" -> "2026-04-21"
function reformatDate(s) {
  const [m, d, y] = s.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function fetchDaily() {
  const from = todayStr(-365 * 5 - 5);
  const to = todayStr(0);
  const url = `https://api.nasdaq.com/api/quote/MSFT/historical?assetclass=stocks&fromdate=${from}&limit=9999&todate=${to}`;
  const json = curlJson(url);
  const rows = json?.data?.tradesTable?.rows || [];
  const out = rows
    .map((r) => ({
      date: reformatDate(r.date),
      price: parsePrice(r.close),
      volume: parseInt2(r.volume),
    }))
    .filter((r) => !isNaN(r.price));
  // Nasdaq returns newest first; sort ascending
  out.sort((a, b) => a.date.localeCompare(b.date));
  return out;
}

function fetchIntraday() {
  // Nasdaq dividend chart endpoint provides intraday; use chart endpoint
  // assetclass=stocks, charttype=real
  const url = `https://api.nasdaq.com/api/quote/MSFT/chart?assetclass=stocks&charttype=real`;
  try {
    const json = curlJson(url);
    const rows = json?.data?.chart || [];
    const out = rows
      .map((r) => {
        const p = r?.z?.value ?? r?.value;
        const t = r?.x ?? r?.dateTime;
        const dt = typeof t === "number" ? new Date(t) : new Date(t);
        const hh = String(dt.getUTCHours()).padStart(2, "0");
        const mm = String(dt.getUTCMinutes()).padStart(2, "0");
        const price = typeof p === "string" ? parsePrice(p) : Number(p);
        return { date: `${hh}:${mm}`, price, volume: 0 };
      })
      .filter((r) => !isNaN(r.price));
    return out;
  } catch (e) {
    console.warn("[msft-stock] intraday fetch skipped:", e.message);
    return [];
  }
}

function main() {
  const errors = [];
  let daily = [];
  let intraday = [];
  try {
    daily = fetchDaily();
  } catch (e) {
    errors.push(`daily: ${e.message}`);
  }
  try {
    intraday = fetchIntraday();
  } catch (e) {
    errors.push(`intraday: ${e.message}`);
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });

  if (daily.length === 0) {
    console.error("[msft-stock] Daily fetch failed:", errors.join("; "));
    writeFileSync(
      OUT_PATH,
      JSON.stringify(
        {
          symbol: "MSFT",
          currency: "USD",
          regularMarketPrice: null,
          previousClose: null,
          fetchedAt: new Date().toISOString(),
          daily: [],
          intraday: [],
          errors,
        },
        null,
        2
      ),
      "utf8"
    );
    return;
  }

  const latest = daily[daily.length - 1];
  const prev = daily[daily.length - 2];
  const out = {
    symbol: "MSFT",
    currency: "USD",
    regularMarketPrice: latest.price,
    previousClose: prev?.price ?? null,
    fetchedAt: new Date().toISOString(),
    daily,
    intraday,
    ...(errors.length ? { errors } : {}),
  };
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), "utf8");
  console.log(
    `[msft-stock] Wrote ${daily.length} daily / ${intraday.length} intraday. Latest: $${latest.price} on ${latest.date}`
  );
}

main();
