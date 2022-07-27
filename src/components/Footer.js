import { Box, Typography, Container } from "@mui/material";
import React from "react";

// styling
import "./styles/Footer.css";

export default function Footer() {
  return (
    <Box className="footer">
      <Container className="container" maxWidth='disable'>
        <Typography variant="body1">API Version: 1.0</Typography>
      </Container>
    </Box>
  );
}
