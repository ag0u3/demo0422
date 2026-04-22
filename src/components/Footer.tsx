"use client";

import { Box, Typography, useTheme, Container } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useApp } from "@/contexts/AppContext";

export default function Footer() {
  const theme = useTheme();
  const { t } = useApp();

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2026 {t.footerText}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.secondary",
            }}
          >
            <Typography variant="body2">Built with</Typography>
            <FavoriteIcon sx={{ fontSize: 14, color: "#ef4444" }} />
            <Typography variant="body2">
              using Next.js + MUI on Azure
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
