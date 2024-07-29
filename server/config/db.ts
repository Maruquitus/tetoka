import {
  ServerApiVersion,
  MongoClient,
  Collection,
  Db,
  Document,
} from "mongodb";

import { configDotenv } from "dotenv";
configDotenv();

const URL_BD = process.env.URL_BD as string;

const credentials = process.env.CERT_LOCATION as string;
const client = new MongoClient(URL_BD, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
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
