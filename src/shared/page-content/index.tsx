import { Box, Container, Paper } from "@mui/material";
import { ReactNode } from "react";

export const PageContent: React.FC<{
  title: string;
  subtitle?: string;
  children: JSX.Element;
}> = ({ title, subtitle, children }) => {
  return (
    <Container>
      <Box component="section">
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <div>
              <h2>{title}</h2>
              <small>{subtitle}</small>
            </div>
          </Box>
        </Paper>
        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>
    </Container>
  );
};
