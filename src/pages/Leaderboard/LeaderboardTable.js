import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

// styles
import styles from "./Leaderboard.module.css";

// data retrieval
import LeagueService from "../../services/LeagueService";
import { fontSize, fontWeight } from "@mui/system";

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#E4EDF2",
  fontWeight: "bold",
  fontFamily: ["Open sans"],
  fontSize: "12px",
  paddingTop: 'unset',
  paddingBottom: 'unset',
  height: '39.5px'
}));

const StyledTableDataCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14px",
  fontFamily: ["Open sans"],
  width: "40px",
}));

const StyledBoldTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontFamily: ["Open sans"],
  fontSize: "16px",
  paddingTop: 'unset',
  paddingBottom: 'unset',
  height: '69px'
  //   paddingRight: '30px'
  //   width: '20px'
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   fontWeight: 'bold'

// }));

const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "Grey",
}));

export default function LeaderboardTable() {
  const [leagueData, setLeagueData] = useState();

  useEffect(async () => {
    let leagueObject = new LeagueService();
    await leagueObject.fetchData().then(async () => {
      let data = leagueObject.getLeaderboard();
      setLeagueData(data);
      console.log("dta => ", data);
    });
  }, []);
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableHeadCell>Team Name</StyledTableHeadCell>
          <StyledTableHeadCell align="center">MP</StyledTableHeadCell>
          <StyledTableHeadCell
            align="center"
            sx={{ display: { sm: "none", md: "table-cell" } }}
          >
            GF
          </StyledTableHeadCell>
          <StyledTableHeadCell
            align="center"
            sx={{ display: { sm: "none", md: "table-cell" } }}
          >
            GA
          </StyledTableHeadCell>
          <StyledTableHeadCell
            align="center"
            sx={{ display: { sm: "table-cell", md: "none" } }}
          >
            GD
          </StyledTableHeadCell>
          <StyledTableHeadCell align="center">Points</StyledTableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leagueData?.map((row) => (
          <TableRow
            key={row.teamName}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <StyledBoldTableCell align="left">
              <Grid container direction="row">
                <Grid item xs={2} marginRight={{sm: '40px', md: '10px'}}>
                  <img
                    className="flag"
                    src={`https://countryflagsapi.com/png/${row.teamName}`}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  alignSelf="center"
                  marginLeft={{lg: '-40px'}}
                >
                  {row.teamName}
                </Grid>
              </Grid>
            </StyledBoldTableCell>
            <StyledTableDataCell align="center">
              {row.matchesPlayed}
            </StyledTableDataCell>
            <StyledTableDataCell
              align="center"
              sx={{ display: { sm: "none", md: "table-cell" } }}
            >
              {row.goalsFor}
            </StyledTableDataCell>
            <StyledTableDataCell
              align="center"
              sx={{ display: { sm: "none", md: "table-cell" } }}
            >
              {row.goalsAgainst}
            </StyledTableDataCell>
            <StyledTableDataCell
              align="center"
              sx={{ display: { sm: "table-cell", md: "none" } }}
            >
              {row.goalsFor - row.goalsAgainst}
            </StyledTableDataCell>
            <StyledBoldTableCell
              align="center"
              sx={{ color: "#025FEB", width: "40px" }}
            >
              {row.points}
            </StyledBoldTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
