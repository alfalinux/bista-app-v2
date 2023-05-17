import { connectToMongoDB, findManifestBelumReceive } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { cabangTujuan } = req.query;

  // validasi input
  if (!cabangTujuan || typeof cabangTujuan !== "string" || !/^[a-zA-Z0-9\s]+$/.test(cabangTujuan)) {
    res.status(400).json({
      status: res.statusCode,
      message: "Cabang tujuan tidak valid!",
    });
    return;
  }

  let client;
  try {
    client = await connectToMongoDB({ ssl: true, sslValidate: true });
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findManifestBelumReceive(client, "data-manifest", cabangTujuan);
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Data cabang tidak ditemukan" });
    return;
  } finally {
    client.close();
  }

  res.status(201).json(result);
};

export default handler;
