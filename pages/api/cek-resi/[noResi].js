import { connectToMongoDB } from "../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { noResi } = req.query;
  let client;
  try {
    client = await connectToMongoDB();
  } catch (error) {
    client.close();
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke database" });
    return;
  }

  if (req.method === "GET") {
    const db = client.db("bista-app-v2");
    let resi, manifest, suratJalan;

    try {
      resi = await db.collection("data-resi").findOne({ noResi: noResi });
    } catch (error) {
      resi = null;
    }

    try {
      manifest = await db
        .collection("data-manifest")
        .findOne({ dataResi: { $elemMatch: { noResi: noResi } } });
    } catch (error) {
      manifest = null;
    }

    try {
      suratJalan = await db
        .collection("data-surat-jalan")
        .find({ dataManifest: { $elemMatch: { noManifest: manifest.noManifest } } })
        .toArray();
    } catch (error) {
      suratJalan = null;
    }

    const noResiCheck = !resi ? "" : resi.noResi;
    const resiCreatedAt = !resi ? "" : resi.tglTransaksi;
    const resiCreatedIn = !resi ? "" : resi.cabangAsal;
    const resiCreatedBy = !resi ? "" : resi.petugasInput;
    const noManifest = !manifest ? "" : manifest.noManifest;
    const manifestCreatedAt = !manifest ? "" : manifest.manifestCreatedAt;
    const manifestCreatedIn = !manifest ? "" : manifest.cabangAsal;
    const manifestCreatedBy = !manifest ? "" : manifest.manifestCreatedBy;
    const manifestReceivedAt = !manifest ? "" : manifest.manifestReceivedAt;
    const manifestReceivedBy = !manifest ? "" : manifest.manifestReceivedBy;
    const manifestReceivedIn = !manifest ? "" : manifest.coveranArea;
    const listSuratJalan = !suratJalan
      ? []
      : suratJalan.map((d) => ({
          noSuratJalan: d.noSuratJalan,
          namaDriver: d.namaDriver,
          nopolDriver: d.nopolDriver,
          suratJalanCreatedAt: d.suratJalanCreatedAt,
          suratJalanCreatedBy: d.suratJalanCreatedBy,
          suratJalanCreatedIn: d.cabangAsal,
          suratJalanReceivedIn: d.cabangTujuan,
          suratJalanReceivedAt: d.suratJalanReceivedAt,
          suratJalanReceivedBy: d.suratJalanReceivedBy,
        }));
    const listDelivery = !resi ? [] : resi.delivery;

    res.status(201).json({
      status: res.statusCode,
      message: "Data ditemukan",
      result: {
        noResi: noResiCheck,
        resiCreatedAt: resiCreatedAt,
        resiCreatedIn: resiCreatedIn,
        resiCreatedBy: resiCreatedBy,
        noManifest: noManifest,
        manifestCreatedAt: manifestCreatedAt,
        manifestCreatedIn: manifestCreatedIn,
        manifestCreatedBy: manifestCreatedBy,
        manifestReceivedAt: manifestReceivedAt,
        manifestReceivedIn: manifestReceivedIn,
        manifestReceivedBy: manifestReceivedBy,
        listSuratJalan: listSuratJalan,
        listDelivery: listDelivery,
      },
    });
    client.close();
  } else {
    res.status(404).json({ status: res.statusCode, message: "Request method tidak sesuai" });
    client.close();
  }
};

export default handler;
