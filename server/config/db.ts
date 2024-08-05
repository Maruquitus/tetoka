import {
  ServerApiVersion,
  MongoClient,
  Collection,
  Db,
  Document,
} from "mongodb";

import { configDotenv } from "dotenv";
configDotenv();

const URI_BD = process.env.URI_BD as string;

const client = new MongoClient(URI_BD, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let database: Db, users: Collection<Document>, posts: Collection<Document>;

export async function run() {
  try {
    await client.connect();
    database = client.db("db");
    users = database.collection("Users");
    posts = database.collection("Posts");
    console.log("Conexão com a base de dados realizada com êxito!");
    return database;
  } catch (Exception) {
    console.log(Exception);
  }
}

export { users, posts };
