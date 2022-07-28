import { Box, Typography, Container } from "@mui/material";
import React from "react";

// styling
import "./styles/Footer.css";

export default function Footer() {
  return (
    <Box className="footer">
      <Container className="container" maxWidth='disable'>
        <Typography variant="body1" sx={{ fontFamily: "Open sans", float: 'right', color: '#4B5C68', fontWeight: 'bold', fontSize: '12px' }}>API Version: 1.0</Typography>
      </Container>
    </Box>
  );
}
