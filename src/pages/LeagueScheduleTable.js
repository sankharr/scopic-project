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
  paddingTop: '11px',
  paddingBottom: '11px'
}));

const StyledBoldTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontFamily: ["Open sans"],
  fontSize: "16px",
  //   paddingRight: "30px",
  //   width: '20px'
}));

const calculateDate = (timeStamp) => {
  const date = new Date(timeStamp);
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
      //   let data2 = leagueObject.getLeaderboard();
      //  let leagueObject = new LeagueService();
      //   leagueObject.getMatches();
      console.log("dta => ", data);
      //   console.log('data2', data2)
    });
  }, []);
  return (
    <Table aria-label="simple table"  sx={{paddingTop: 'unset'}}>
      <TableHead>
        <TableRow>
          <StyledTableHeadCell sx={{ display: {sm: 'none' ,md: 'table-cell'}}}>Date/Time</StyledTableHeadCell>
          <StyledTableHeadCell align="left" sx={{ display: {sm: 'none', md: 'none' ,lg: 'table-cell'}}}>Stadium</StyledTableHeadCell>
          <StyledTableHeadCell align="left"></StyledTableHeadCell>
          <StyledTableHeadCell align="right">Home Team</StyledTableHeadCell>
          <StyledTableHeadCell align="right"></StyledTableHeadCell>
          <StyledTableHeadCell align="left">Away Team</StyledTableHeadCell>
          <StyledTableHeadCell align="right"></StyledTableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matchData?.map((row) => (
          <TableRow
            key={row.stadium + row.awayTeam}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <StyledTableDataCell sx={{ display: {sm: 'none' ,md: 'table-cell'}}}>
              <Grid container direction="column" justifyContent="flex-start" >
                <Grid item xs="auto" direction="column">
                  <Typography>{calculateDate(row.matchDate)}</Typography>
                </Grid>
                <Grid item xs="auto" alignItems="end">
                  <Typography>{calculateTime(row.matchDate)}</Typography>
                </Grid>
              </Grid>
            </StyledTableDataCell>
            <StyledTableDataCell align="left" sx={{ display: {sm: 'none', md: 'none' ,lg: 'table-cell'}}}>
              {row.stadium}
            </StyledTableDataCell>
            <StyledBoldTableCell align="right" padding="none">
              {row.homeTeam}
            </StyledBoldTableCell>
            <StyledTableDataCell align="right" width="70px">
              <img
                className="flag"
                src={`https://countryflagsapi.com/png/${row.homeTeam}`}
                style={{marginTop: '5.5px'}}
              />
            </StyledTableDataCell>
            {/* <StyledBoldTableCell align="right">
              <Grid
                container
                direction="row"
                justifyContent="right"
                wrap="wrap"
              >
                <Grid item xs={3} alignSelf="center">
                  {row.homeTeam}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  <img
                    className="flag"
                    src={`https://countryflagsapi.com/png/${row.homeTeam}`}
                  />
                </Grid>
              </Grid>
            </StyledBoldTableCell> */}
            <StyledBoldTableCell align="center" padding="none">
              {row.homeTeamScore} : {row.awayTeamScore}
            </StyledBoldTableCell>
            <StyledTableDataCell align="left" width="70px">
              <img
                className="flag"
                src={`https://countryflagsapi.com/png/${row.awayTeam}`}
                style={{marginTop: '5.5px'}}
              />
            </StyledTableDataCell>
            <StyledBoldTableCell align="left" padding="none">
              {row.awayTeam}
            </StyledBoldTableCell>
            
            {/* <StyledBoldTableCell align="left">
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
            </StyledBoldTableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
}
