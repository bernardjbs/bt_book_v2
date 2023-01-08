import { Match } from '../models/Match';

export const matchExists = async (matchId: String) => {
  try {
    const foundMatch = await Match.findOne({ matchId: matchId });

    if (foundMatch) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};
