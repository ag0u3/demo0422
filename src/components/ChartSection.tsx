"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  alpha,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  msftStockData,
  StockDataPoint,
} from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";

type Range = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y";

const RANGES: { key: Range; days: number; label: string }[] = [
  { key: "1M", days: 30, label: "1M" },
  { key: "3M", days: 90, label: "3M" },
  { key: "6M", days: 180, label: "6M" },
  { key: "1Y", days: 365, label: "1Y" },
  { key: "3Y", days: 365 * 3, label: "3Y" },
  { key: "5Y", days: 365 * 5, label: "5Y" },
];

export default function ChartSection() {
  const theme = useTheme();
  const { t } = useApp();
  const [range, setRange] = useState<Range>("1M");

  const cfg = RANGES.find((r) => r.key === range)!;

  const data: StockDataPoint[] = useMemo(() => {
    return msftStockData.slice(-cfg.days);
  }, [cfg]);

  const current = data[data.length - 1].price;
  const first = data[0].price;
  const change = current - first;
  const changePct = (change / first) * 100;
  const isUp = change >= 0;
  const trendColor = isUp ? "#22c55e" : "#ef4444";

  const high = Math.max(...data.map((d) => d.price));
  const low = Math.min(...data.map((d) => d.price));
  const volume = data[data.length - 1].volume;

  const tickFormatter = (d: string) => {
    if (cfg.days <= 90) return d.slice(5);
    return d.slice(0, 7);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )}, ${alpha(theme.palette.primary.light, 0.02)})`,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                backgroundColor: alpha("#0078D4", 0.15),
                color: "#0078D4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShowChartIcon />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {t.msStock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.msStockSubtitle}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1 }}>
              ${current.toFixed(2)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                justifyContent: "flex-end",
                mt: 0.5,
                color: trendColor,
              }}
            >
              {isUp ? (
                <TrendingUpIcon fontSize="small" />
              ) : (
                <TrendingDownIcon fontSize="small" />
              )}
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {isUp ? "+" : ""}
                {change.toFixed(2)} ({isUp ? "+" : ""}
                {changePct.toFixed(2)}%) · {cfg.label}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Range selector */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }}>
          <ToggleButtonGroup
            value={range}
            exclusive
            size="small"
            onChange={(_, v: Range | null) => v && setRange(v)}
            sx={{
              flexWrap: "wrap",
              gap: 0.5,
              "& .MuiToggleButton-root": {
                px: 1.75,
                py: 0.5,
                fontSize: "0.75rem",
                fontWeight: 600,
                border: `1px solid ${theme.palette.divider} !important`,
                borderRadius: "100px !important",
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  borderColor: `${theme.palette.primary.main} !important`,
                },
              },
            }}
          >
            {RANGES.map((r) => (
              <ToggleButton key={r.key} value={r.key}>
                {r.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={trendColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={trendColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={alpha(theme.palette.text.primary, 0.08)}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
                tickFormatter={tickFormatter}
                stroke={theme.palette.divider}
                minTickGap={30}
              />
              <YAxis
                domain={["dataMin - 5", "dataMax + 5"]}
                tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
                stroke={theme.palette.divider}
                tickFormatter={(v: number) => `$${v.toFixed(0)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 12,
                  color: theme.palette.text.primary,
                }}
                formatter={(v) => [`$${Number(v).toFixed(2)}`, "MSFT"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={trendColor}
                strokeWidth={2.5}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
            gap: 2,
            mt: 3,
          }}
        >
          {[
            { label: t.high, value: `$${high.toFixed(2)}` },
            { label: t.low, value: `$${low.toFixed(2)}` },
            {
              label: t.volume,
              value: `${(volume / 1_000_000).toFixed(1)}M`,
            },
            { label: t.change, value: `${changePct.toFixed(2)}%` },
          ].map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.text.primary, 0.04),
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
