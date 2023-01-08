const typedefs = `
  scalar Date

  type Query {
    matches: [Match]
  }

  type Stats {
    categoryStat: String,
    homeStat: Int,
    awayStat: Int
  }

  type Match {
    _id: ID, 
    matchId: String, 
    startDate: Date, 
    status: String, 
    competition: String,
    homeTeam: String,
    awayTeam: String,
    overallHomeMatches: [String],
    overallAwayMatches: [String],
    overallH2hMatches: [String],
    homeMatches: [String],
    awayMatches: [String],
    directMatches: [String],
    homeTeamScore: Int,
    awayTeamScore: Int,
    stats: [Stats]
  }
`;

export default typedefs;
