/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW AND
 *       PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 */
const axios = require("axios");

class LeagueService {

  constructor() {
    this.matches = [];
  }
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    let leaderboardArray = []
    let arrayStoreCount = 0;
    let teamArray = [];
    let teamIndex;
    for (let i = 0; i < this.matches.length; i++) {
        // homeTeam data calculation
        teamIndex = teamArray.indexOf(this.matches[i].homeTeam);
        if (teamIndex == -1){
            let tempArrayA = [this.matches[i].homeTeam, 1, this.matches[i].homeTeamScore, this.matches[i].awayTeamScore]
        }
        if(leaderboardArray[arrayStoreCount] == null){
            let tempArray = []
        }
    }
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    // getting the access token
    await axios
      .get("http://localhost:3001/api/v1/getAccessToken")
      .then(async (res) => {
        await axios
          .get("http://localhost:3001/api/v1/getAllMatches", {
            // setting the header with access token
            headers: {
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            // retrieving the match data and storing them
            this.setMatches(res.data.matches);
          });
      });
  }
}

export default LeagueService;
