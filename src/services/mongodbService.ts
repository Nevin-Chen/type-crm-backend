// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { customers?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI as string);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const customersCollection: mongoDB.Collection = db.collection(process.env.CUSTOMERS_COLLECTION_NAME as string);

  collections.customers = customersCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${customersCollection.collectionName}`);
}
