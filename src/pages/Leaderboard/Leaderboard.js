import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

// styles
import styles from "./Leaderboard.module.css";

// components
import LeaderboardTable from "./LeaderboardTable";

export default function Leaderboard() {
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p className="pageHeading">League Standings</p>
          </Grid>
          <Grid item xs={12}>
            <LeaderboardTable />
          </Grid>
          {/* <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}
