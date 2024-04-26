import { MongoClient, Db, Collection } from "mongodb";
import { config } from "dotenv";

export const collections: { customers?: Collection } = {}

export async function connectToDatabase() {
  try {
    config();

    const client: MongoClient = new MongoClient(process.env.MONGO_URI as string);
    await client.connect();
    const db: Db = client.db(process.env.DB_NAME);

    const customersCollection: Collection = db.collection(process.env.CUSTOMERS_COLLECTION_NAME as string);
    collections.customers = customersCollection;

    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error("Database connection failed", error);
    throw error;
  }
}
