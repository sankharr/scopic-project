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
    let leaderboardArray = [];
    let arrayStoreCount = 0;
    let teamArray = [];
    let teamIndex;

    for (let i = 0; i < this.matches.length; i++) {
      // homeTeam data calculation
      teamIndex = teamArray.indexOf(this.matches[i].homeTeam);
      // if the home team doesn't exist in leaderboardArray
      if (teamIndex == -1) {
        let tempObject = {
          teamName: this.matches[i].homeTeam,
          matchesPlayed: 1,
          goalsFor: this.matches[i].homeTeamScore,
          goalsAgainst: this.matches[i].awayTeamScore,
          points:
            this.matches[i].homeTeamScore > this.matches[i].awayTeamScore
              ? 3
              : this.matches[i].homeTeamScore === this.matches[i].awayTeamScore
              ? 1
              : 0,
        };
        teamArray[arrayStoreCount] = this.matches[i].homeTeam;
        leaderboardArray[arrayStoreCount] = tempObject;
        arrayStoreCount++;
      }
      // if the home team already exist in leaderboard array
      else {
        let tempObject = {
          teamName: this.matches[i].homeTeam,
          matchesPlayed: leaderboardArray[teamIndex].matchesPlayed + 1,
          goalsFor:
            leaderboardArray[teamIndex].goalsFor +
            this.matches[i].homeTeamScore,
          goalsAgainst:
            leaderboardArray[teamIndex].goalsAgainst +
            this.matches[i].awayTeamScore,
          points:
            leaderboardArray[teamIndex].points +
            (this.matches[i].homeTeamScore > this.matches[i].awayTeamScore
              ? 3
              : this.matches[i].homeTeamScore === this.matches[i].awayTeamScore
              ? 1
              : 0),
        };
        leaderboardArray[teamIndex] = tempObject;
      }

      // awayTeam data calculation
      teamIndex = teamArray.indexOf(this.matches[i].awayTeam);
      // if the away team doesn't exist in leaderboardArray
      if (teamIndex == -1) {
        let tempObject = {
          teamName: this.matches[i].awayTeam,
          matchesPlayed: 1,
          goalsFor: this.matches[i].awayTeamScore,
          goalsAgainst: this.matches[i].homeTeamScore,
          points:
            this.matches[i].awayTeamScore > this.matches[i].homeTeamScore
              ? 3
              : this.matches[i].homeTeamScore === this.matches[i].awayTeamScore
              ? 1
              : 0,
        };
        teamArray[arrayStoreCount] = this.matches[i].awayTeam;
        leaderboardArray[arrayStoreCount] = tempObject;
        arrayStoreCount++;
      }
      // if the awayteam already exist in leaderboard array
      else {
        let tempObject = {
          teamName: this.matches[i].awayTeam,
          matchesPlayed: leaderboardArray[teamIndex].matchesPlayed + 1,
          goalsFor:
            leaderboardArray[teamIndex].goalsFor +
            this.matches[i].awayTeamScore,
          goalsAgainst:
            leaderboardArray[teamIndex].goalsAgainst +
            this.matches[i].homeTeamScore,
          points:
            leaderboardArray[teamIndex].points +
            (this.matches[i].awayTeamScore > this.matches[i].homeTeamScore
              ? 3
              : this.matches[i].homeTeamScore === this.matches[i].awayTeamScore
              ? 1
              : 0),
        };
        leaderboardArray[teamIndex] = tempObject;
      }
    }
    leaderboardArray.sort((a, b) => (a.points < b.points) ? 1 : -1)
    return leaderboardArray;
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
