import { MongoClient } from "mongodb";

export const connectToMongoDB = async () => {
  const client = await MongoClient.connect(
    `mongodb://admin:4dmin@ac-uyzhd6y-shard-00-00.qsklzwd.mongodb.net:27017,ac-uyzhd6y-shard-00-01.qsklzwd.mongodb.net:27017,ac-uyzhd6y-shard-00-02.qsklzwd.mongodb.net:27017/?ssl=true&replicaSet=atlas-yzfdd6-shard-0&authSource=admin&retryWrites=true&w=majority`
  );

  return client;
};

// POST TO DATABASE
export const insertDocument = async (client, collection, document) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).insertOne(document);

  return result;
};
// END POST TO DATABASE

// FIND IN DATABASE
export const findUserCabang = async (client, collection, cabang) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).find({ cabangDesc: cabang }).toArray();
  return result;
};

export const findResi = async (client, collection, noResi) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).findOne({ noResi: noResi });
  return result;
};

export const findResiCabangByDate = async (client, collection, cabang, tglTransaksi) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({ cabangAsal: cabang, tglTransaksi: { $regex: `${tglTransaksi}.*` } })
    .toArray();
  return result;
};

export const findResiBelumManifest = async (client, collection, cabangAsal) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({ cabangAsal: cabangAsal, "tujuan.cov": { $ne: cabangAsal }, noManifest: null })
    .toArray();
  return result;
};

export const findResiBelumDelivery = async (client, collection, cabang) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({
      $or: [
        {
          cabangAsal: cabang,
          cabangCoveran: cabang,
          $or: [
            { delivery: null },
            { "delivery.deliveryStatus.proses": { $nin: ["pengantaran", "diterima"] } },
          ],
        },
        {
          cabangCoveran: cabang,
          manifestReceivedAt: { $ne: null },
          $or: [
            { delivery: null },
            { "delivery.deliveryStatus.proses": { $nin: ["pengantaran", "diterima"] } },
          ],
        },
      ],
    })
    .toArray();
  return result;
};

export const findManifest = async (client, collection, noManifest) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).findOne({ noManifest: noManifest });
  return result;
};

export const findManifestBelumReceive = async (client, collection, coveranArea) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({ coveranArea: coveranArea, manifestReceivedAt: null })
    .toArray();

  return result;
};

export const findSuratJalan = async (client, collection, noSuratJalan) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).findOne({ noSuratJalan: noSuratJalan });
  return result;
};

export const findManifestBelumSuratJalan = async (client, collection, cabangAsal) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).find({ cabangAsal: cabangAsal, suratJalan: null }).toArray();

  return result;
};

export const findManifestTransit = async (client, collection, cabangTransit) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({
      coveranArea: { $ne: cabangTransit },
      "suratJalan.cabangTujuan": cabangTransit,
      "suratJalan.suratJalanReceivedAt": { $exists: true },
      suratJalan: { $not: { $elemMatch: { cabangAsal: cabangTransit } } },
    })
    .toArray();

  return result;
};

export const findSuratJalanBelumReceive = async (client, collection, cabangTujuan) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({ cabangTujuan: cabangTujuan, suratJalanReceivedAt: null })
    .toArray();

  return result;
};

export const findDelivery = async (client, collection, noDelivery) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).find({ "delivery.noDelivery": noDelivery }).toArray();
  return result;
};

export const findDeliveryByCabang = async (client, collection, cabang) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .find({
      "delivery.noDelivery": { $ne: null },
      "delivery.dataKurir.cabangDesc": cabang,
      delivery: { $elemMatch: { deliveryClosedAt: { $exists: false } } },
    })
    .toArray();
  return result;
};

// END FIND IN DATABASE

// UPDATE DATABASE
export const setManifest = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).updateMany({ noResi: { $in: filter } }, { $set: update });

  return result;
};

export const updateManifest = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .updateMany({ noManifest: { $in: filter } }, { $set: update });

  return result;
};

export const setSuratJalan = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).updateMany(
    { noManifest: { $in: filter } },
    {
      $push: { suratJalan: update },
    }
  );

  return result;
};

export const updateSuratJalan = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db
    .collection(collection)
    .updateMany({ noSuratJalan: { $in: filter } }, { $set: { ...update } });

  return result;
};

export const pushManySuratJalan = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).updateMany(
    {
      "suratJalan.noSuratJalan": { $in: filter },
    },
    {
      $set: {
        "suratJalan.$.suratJalanReceivedAt": update.suratJalanReceivedAt,
        "suratJalan.$.suratJalanReceivedBy": update.suratJalanReceivedBy,
      },
    }
  );

  return result;
};

export const pushDelivery = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).updateMany(
    {
      noResi: { $in: filter },
    },
    {
      $push: { delivery: update },
    }
  );

  return result;
};

export const updateOneDeliveryStatus = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).updateOne(
    { noResi: filter.noResi, "delivery.noDelivery": filter.noDelivery },
    {
      $set: {
        "delivery.$.deliveryStatus.proses": update.proses,
        "delivery.$.deliveryStatus.keterangan": update.keterangan,
        "delivery.$.deliveryStatus.prosesAt": update.prosesAt,
        "delivery.$.deliveryStatus.prosesBy": update.prosesBy,
        "delivery.$.deliveryStatus.prosesIn": update.prosesIn,
      },
    }
  );

  return result;
};

export const setDeliveryClosed = async (client, collection, filter, update) => {
  const db = client.db("bista-app-v2");
  const result = await db.collection(collection).updateMany(
    { "delivery.noDelivery": filter },
    {
      $set: {
        "delivery.$.deliveryClosedAt": update.deliveryClosedAt,
        "delivery.$.deliveryClosedBy": update.deliveryClosedBy,
      },
    }
  );

  return result;
};

// END UPDATE DATABASE
