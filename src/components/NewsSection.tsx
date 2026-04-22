"use client";

import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NewsItem } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";

interface Props {
  title: string;
  subtitle?: string;
  items: NewsItem[];
  accentColor?: string;
  icon?: React.ReactNode;
}

function timeAgo(iso: string, lang: "ja" | "en"): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diffMs / 60_000));
  const hours = Math.floor(mins / 60);
  if (lang === "ja") {
    if (hours > 0) return `${hours}時間前`;
    return `${mins}分前`;
  }
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

export default function NewsSection({
  title,
  subtitle,
  items,
  accentColor,
  icon,
}: Props) {
  const theme = useTheme();
  const { language } = useApp();
  const color = accentColor || theme.palette.primary.main;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        {icon && (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              backgroundColor: alpha(color, 0.15),
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
        }}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            variant="outlined"
            sx={{
              borderColor: theme.palette.divider,
              backgroundColor: theme.palette.background.paper,
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: 4,
                height: "100%",
                backgroundColor: color,
              },
            }}
          >
            <CardActionArea
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ height: "100%" }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {language === "ja" ? item.title : item.titleEn}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
                    <Chip
                      icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                      label={timeAgo(item.publishedAt, language)}
                      size="small"
                      sx={{
                        backgroundColor: alpha(color, 0.1),
                        color: color,
                        "& .MuiChip-icon": { color: color },
                      }}
                    />
                    {item.source && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          maxWidth: 120,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.source}
                      </Typography>
                    )}
                  </Box>
                  <OpenInNewIcon
                    sx={{ fontSize: 16, color: theme.palette.text.secondary }}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
