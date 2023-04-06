import { Box } from "@mui/material";
import * as React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}
