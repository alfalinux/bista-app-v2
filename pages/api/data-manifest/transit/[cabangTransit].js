import { connectToMongoDB, findManifestTransit } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { cabangTransit } = req.query;

  // validasi input
  if (!cabangTransit || typeof cabangTransit !== "string" || !/^[a-zA-Z0-9]+$/.test(cabangTransit)) {
    res
      .status(400)
      .json({ message: "Input cabang transit tidak valid. Harus terdiri dari huruf dan angka." });
    return;
  }

  let client;
  try {
    client = await connectToMongoDB({ ssl: true, sslValidate: true });
  } catch (error) {
    res.status(500).json({ message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findManifestTransit(client, "data-manifest", cabangTransit);
  } catch (error) {
    res.status(500).json({ message: "Data cabang tidak ditemukan" });
    return;
  } finally {
    client.close();
  }

  res.status(201).json(result);
};

export default handler;
