import { MatchStatsInterface } from './interfaces';
export type Match = {
  matchId: string;
  matchStart: Date;
  status: String;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  overallHomeMatches: String;
  overallAwayMatches: String;
  overallH2hMatches: String;
  homeMatches: String;
  awayMatches: String;
  directMatches: String;
  homeTeamScore: Number;
  awayTeamScore: Number; 
  stats: MatchStatsInterface;
};
