"use client";

import { useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  alpha,
  Button,
} from "@mui/material";
import XIcon from "@mui/icons-material/X";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useApp } from "@/contexts/AppContext";

interface Props {
  screenName?: string; // default: ONCE_JAPAN
}

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement | null) => void };
    };
  }
}

export default function TwitterTimeline({
  screenName = "ONCE_JAPAN",
}: Props) {
  const theme = useTheme();
  const { mode, language } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const PINK = "#FF6B9D";

  useEffect(() => {
    const SRC = "https://platform.twitter.com/widgets.js";
    const existing = document.querySelector(
      `script[src="${SRC}"]`
    ) as HTMLScriptElement | null;

    const renderWidget = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load(containerRef.current);
      }
    };

    if (existing) {
      renderWidget();
    } else {
      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.charset = "utf-8";
      script.onload = renderWidget;
      document.body.appendChild(script);
    }
  }, [mode, language]);

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        background: `linear-gradient(135deg, ${alpha(PINK, 0.05)}, ${alpha(
          PINK,
          0.01
        )})`,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                backgroundColor: alpha(PINK, 0.15),
                color: PINK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <XIcon />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                @{screenName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {language === "ja"
                  ? "公式タイムライン"
                  : "Official Timeline"}
              </Typography>
            </Box>
          </Box>
          <Button
            href={`https://twitter.com/${screenName}`}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            endIcon={<OpenInNewIcon />}
            sx={{ color: PINK }}
          >
            {language === "ja" ? "Xで開く" : "Open on X"}
          </Button>
        </Box>

        <Box
          ref={containerRef}
          sx={{
            maxHeight: 600,
            overflow: "hidden",
            borderRadius: 2,
            "& iframe": { borderRadius: 2 },
          }}
        >
          <a
            className="twitter-timeline"
            data-height="600"
            data-theme={mode === "dark" ? "dark" : "light"}
            data-chrome="noheader nofooter noborders transparent"
            data-lang={language}
            href={`https://twitter.com/${screenName}?ref_src=twsrc%5Etfw`}
          >
            Tweets by @{screenName}
          </a>
        </Box>
      </CardContent>
    </Card>
  );
}
