import { connectToMongoDB, findResiBelumManifest } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { cabangAsal } = req.query;

  // validasi input
  if (!cabangAsal || typeof cabangAsal !== "string" || !/^[a-zA-Z0-9]+$/.test(cabangAsal)) {
    res.status(400).json({ message: "Input cabangAsal tidak valid. Harus terdiri dari huruf dan angka." });
    return;
  }

  let client;
  try {
    client = await connectToMongoDB({ ssl: true, sslValidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findResiBelumManifest(client, "data-resi", cabangAsal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Data cabang tidak ditemukan" });
    return;
  } finally {
    client.close();
  }

  res.status(201).json(result);
};

export default handler;
