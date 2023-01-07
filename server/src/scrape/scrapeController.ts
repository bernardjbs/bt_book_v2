import { MongoClient } from 'mongodb';

import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, '../../../.env')
});

export const matchExists = async (matchId: String) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  const DB_NAME = process.env.DB_NAME;
  const MATCHES_COLLECTION = process.env.MATCHES_COLLECTION;
  try {
    const database = client.db(DB_NAME);
    const matches = database.collection(MATCHES_COLLECTION!);
    const foundMatch = await matches.findOne({ matchId: matchId });

    if (foundMatch) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};
