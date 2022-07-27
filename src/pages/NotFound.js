import { Container, Box } from "@mui/material";
import React from "react";

// styling
import "./styles/NotFound.css";

// assets
import Picture from "../assets/404.png";

export default function NotFound() {
  return (
    <Box>
      <Container>
        <img className="image404" src={Picture} />
      </Container>
    </Box>
  );
}
