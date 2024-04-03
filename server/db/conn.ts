import * as dotenv from 'dotenv';
import * as mongoDB from 'mongodb';

export const collections: { highscore?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || '');

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const highscoreCollection: mongoDB.Collection = db.collection(process.env.DB_COLLECTION_NAME || '');

  collections.highscore = highscoreCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${highscoreCollection.collectionName}`);
}