import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

// styling
import "./styles/Header.css";

// assets
import Logo from "../assets/logo.svg";
import ScheduleIcon from "../assets/schedule.png";
import LeaderboardIcon from "../assets/leaderboard.png";

const pages = [
  {
    name: "Schedule",
    icon: ScheduleIcon,
    routerPath: "/schedule",
  },
  { name: "Leaderboard", icon: LeaderboardIcon, routerPath: "/leaderboard" },
];

const Header = () => {
  return (
    <AppBar position="static" className="Appbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <img src={Logo} />
          </Box>

          {/* Logo - Mobile View */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img src={Logo} />
          </Box>

          {/* Navbar buttons */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.name} underline="none" component={RouterLink} to={page.routerPath}>
                <Button
                  variant="text"
                  sx={{ ml: "40px", color: "white", display: "block" }}
                >
                  <Box sx={{ display: { xs: "flex", md: "flex" }, gap: 1 }}>
                    <img src={page.icon} style={{ height: "25px" }} />
                    <Typography variant="body1">{page.name}</Typography>
                  </Box>
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
