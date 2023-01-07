import { MatchStatsInterface } from './../ts/interfaces';
import { Schema, model } from 'mongoose';
import { Match } from '../ts/types';

const statSchema = new Schema<MatchStatsInterface>({
  categoryStat: { type: String, required: true },
  homeStat: { type: Number, required: true },
  awayStat: { type: Number, required: true }
});

const matchSchema = new Schema<Match>({
  matchId: { type: String, required: true },
  matchStart: { type: Date, required: true },
  status: { type: String, required: true },
  competition: { type: String, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  overallHomeMatches: [{ type: String }],
  overallAwayMatches: [{ type: String }],
  overallH2hMatches: [{ type: String }],
  homeMatches: [{ type: String }],
  awayMatches: [{ type: String }],
  directMatches: [{ type: String }],
  homeTeamScore: { type: Number },
  awayTeamScore: { type: Number },
  stats: [{ type: Schema.Types.ObjectId, ref: statSchema }]
});

const Match = model('match', matchSchema);

export default Match;
