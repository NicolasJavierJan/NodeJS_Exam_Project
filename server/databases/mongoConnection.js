import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

const db = client.db("users");

export default db;