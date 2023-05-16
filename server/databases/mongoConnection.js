import { MongoClient } from "mongodb";

const URL = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(URL);

const db = client.db("users");

export default db;