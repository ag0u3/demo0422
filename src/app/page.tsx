"use client";

import { useState, useMemo } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import ChartSection from "@/components/ChartSection";
import TwitterTimeline from "@/components/TwitterTimeline";
import Footer from "@/components/Footer";
import { mockNews, NewsItem } from "@/data/mockData";
import twiceData from "@/data/twiceNews.json";
import { useApp } from "@/contexts/AppContext";

const twiceNews = twiceData.items as NewsItem[];
const allNews: NewsItem[] = [...twiceNews, ...mockNews];

export default function Home() {
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const { t, language } = useApp();

  const filtered = useMemo(() => {
    if (!search.trim()) return allNews;
    const q = search.toLowerCase();
    return allNews.filter((n) =>
      (language === "ja" ? n.title : n.titleEn).toLowerCase().includes(q)
    );
  }, [search, language]);

  const sections = [
    {
      key: "twice" as const,
      title: t.twice,
      subtitle: t.twiceSubtitle,
      color: "#FF6B9D",
      icon: <FavoriteIcon />,
    },
    {
      key: "topics" as const,
      title: t.topics,
      subtitle: t.newsSubtitle,
      color: "#6750A4",
      icon: <PublicIcon />,
    },
    {
      key: "business" as const,
      title: t.business,
      subtitle: t.newsSubtitle,
      color: "#0078D4",
      icon: <BusinessCenterIcon />,
    },
    {
      key: "entertainment" as const,
      title: t.entertainment,
      subtitle: t.newsSubtitle,
      color: "#E91E63",
      icon: <TheaterComedyIcon />,
    },
    {
      key: "wsj" as const,
      title: t.wsj,
      subtitle: t.newsSubtitle,
      color: "#0F766E",
      icon: <NewspaperIcon />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header search={search} onSearchChange={setSearch} />

      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 5, md: 8 },
          background: `radial-gradient(ellipse at top, ${theme.palette.primary.main}22, transparent 70%)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {t.siteTitle}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 720 }}
          >
            {t.siteSubtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* Stock Chart */}
        <Box sx={{ mb: 6 }}>
          <ChartSection />
        </Box>

        {/* News Sections */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {sections.map((section) => {
            const items = filtered.filter((n) => n.category === section.key);
            if (items.length === 0) return null;
            const sec = (
              <NewsSection
                title={section.title}
                subtitle={section.subtitle}
                items={items}
                accentColor={section.color}
                icon={section.icon}
              />
            );
            // After TWICE news, embed the official Twitter timeline.
            if (section.key === "twice") {
              return (
                <Box
                  key={section.key}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {sec}
                  <TwitterTimeline screenName="twicetimesjp03" />
                </Box>
              );
            }
            return <Box key={section.key}>{sec}</Box>;
          })}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
