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
import { styled } from "@mui/material/styles";

// styling
import "./styles/Header.css";

// assets
import Logo from "../assets/logo.svg";
import ScheduleIcon from "../assets/schedule.png";
import LeaderboardIcon from "../assets/leaderboard.png";

const StyledAppbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#025FEB",
  paddingRight: "unset",
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingRight: "unset",
}));

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
    <StyledAppbar position="static" className="Appbar">
      <StyledContainer maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <img src={Logo} style={{ width: "110px" }} />
          </Box>

          {/* Logo - Mobile View */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img src={Logo} />
          </Box>

          {/* Navbar buttons */}
          <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row", marginRight: '8px' }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                underline="none"
                component={RouterLink}
                to={page.routerPath}
                sx={{marginLeft: '24px'}}
              >
                <Button
                  variant="text"
                  sx={{ color: "white", display: "block" }}
                >
                  <Box sx={{ display: { xs: "flex", md: "flex" }, gap: 1 }}>
                    <img src={page.icon} style={{ height: "25px" }} />
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "capitalize", fontFamily: ["Open sans"] }}
                    >
                      {page.name}
                    </Typography>
                  </Box>
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </StyledContainer>
    </StyledAppbar>
  );
};
export default Header;
