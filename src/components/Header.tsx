"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  alpha,
  useTheme,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TranslateIcon from "@mui/icons-material/Translate";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  const theme = useTheme();
  const { mode, toggleMode, language, setLanguage, t } = useApp();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.background.default, 0.85),
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ gap: 2, py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NewspaperIcon sx={{ color: "#fff" }} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="h6" sx={{ lineHeight: 1.1, fontWeight: 700 }}>
              {t.siteTitle}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {t.siteSubtitle}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: alpha(theme.palette.text.primary, 0.06),
              borderRadius: 100,
              px: 2,
              py: 0.5,
              width: "100%",
              maxWidth: 480,
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: alpha(theme.palette.text.primary, 0.09),
              },
            }}
          >
            <SearchIcon
              sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }}
            />
            <InputBase
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{ flex: 1, fontSize: "0.95rem" }}
              inputProps={{ "aria-label": t.search }}
            />
          </Box>
        </Box>

        <Tooltip title={t.language}>
          <IconButton
            onClick={(e) => setAnchor(e.currentTarget)}
            color="inherit"
            size="small"
          >
            <TranslateIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
        >
          <MenuItem
            selected={language === "ja"}
            onClick={() => {
              setLanguage("ja");
              setAnchor(null);
            }}
          >
            🇯🇵 日本語
          </MenuItem>
          <MenuItem
            selected={language === "en"}
            onClick={() => {
              setLanguage("en");
              setAnchor(null);
            }}
          >
            🇺🇸 English
          </MenuItem>
        </Menu>

        <Tooltip title={t.toggleTheme}>
          <IconButton onClick={toggleMode} color="inherit" size="small">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
