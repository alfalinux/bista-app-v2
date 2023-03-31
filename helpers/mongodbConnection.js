import { MongoClient } from "mongodb";

export const connectToMongoDB = async () => {
  const client = await MongoClient.connect(
    `mongodb://admin:4dmin@ac-uyzhd6y-shard-00-00.qsklzwd.mongodb.net:27017,ac-uyzhd6y-shard-00-01.qsklzwd.mongodb.net:27017,ac-uyzhd6y-shard-00-02.qsklzwd.mongodb.net:27017/?ssl=true&replicaSet=atlas-yzfdd6-shard-0&authSource=admin&retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const findResi = async (client, collection, noResi) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).findOne({ noResi: noResi });
  return result;
};