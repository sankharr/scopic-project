import * as React from "react";
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

// styles
import "./LeagueSchedule.css";
import { useState, useEffect } from "react";
import LeagueService from "../services/LeagueService";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const calculateDate = (timeStamp) => {
  const date = new Date(timeStamp);
  console.log("date", date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "." + month + "." + year;
};

const calculateTime = (timeStamp) => {
  const date = new Date(timeStamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours + ":" + minutes;
};

export default function LeagueScheduleTable() {
  const [matchData, setMatchData] = useState();

  useEffect(async () => {
    let leagueObject = new LeagueService();
    await leagueObject.fetchData().then(async () => {
      let data = leagueObject.getMatches();
      setMatchData(data);
      //  let leagueObject = new LeagueService();
      //   leagueObject.getMatches();
      console.log("dta => ", data);
    });
  }, []);
  return (
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //         <StyledTableCell>Dessert (100g serving)</StyledTableCell>
    //         <StyledTableCell align="right">Calories</StyledTableCell>
    //         <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
    //         <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
    //         <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <StyledTableRow key={row.name}>
    //           <StyledTableCell component="th" scope="row">
    //             {row.name}
    //           </StyledTableCell>
    //           <StyledTableCell align="right">{row.calories}</StyledTableCell>
    //           <StyledTableCell align="right">{row.fat}</StyledTableCell>
    //           <StyledTableCell align="right">{row.carbs}</StyledTableCell>
    //           <StyledTableCell align="right">{row.protein}</StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>

    // <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Date/Time</TableCell>
          <TableCell align="left">Stadium</TableCell>
          <TableCell align="right">Home Team</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="left">Away Team</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matchData?.map((row) => (
          <TableRow
            key={row.stadium + row.awayTeam}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="right">
              <Grid container>
                <Grid item xs={7}>
                  <Typography>{calculateDate(row.matchDate)}</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography>{calculateTime(row.matchDate)}</Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell align="left">{row.stadium}</TableCell>
            <TableCell align="right">
              <Grid container>
                <Grid item xs={3}>
                  {row.homeTeam}
                </Grid>
                <Grid item xs={3}>
                  <img
                    className="flag"
                    src={`https://countryflagsapi.com/png/${row.homeTeam}`}
                  />
                </Grid>
              </Grid>
            </TableCell>
            <TableCell align="right">
              {row.homeTeamScore}:{row.awayTeamScore}
            </TableCell>
            <TableCell align="right">
              <Grid container>
                <Grid item xs={3}>
                  <img
                    className="flag"
                    src={`https://countryflagsapi.com/png/${row.awayTeam}`}
                  />
                </Grid>
                <Grid item xs={3}>
                  {row.awayTeam}
                </Grid>
              </Grid>
            </TableCell>
            {/* <TableCell align="left">{row.awayTeam}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
}
