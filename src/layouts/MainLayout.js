// imports
import { Switch, Route } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

// pages
import LeagueSchedule from "../pages/LeagueSchedule";
import Leaderboard from "../pages/Leaderboard";
import NotFound from "../pages/NotFound";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/schedule">
          <LeagueSchedule />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route exact path="/">
          <LeagueSchedule />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
