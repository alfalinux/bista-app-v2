import { connectToMongoDB, findManifest } from "../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { noManifest } = req.query;
  let client;
  try {
    client = await connectToMongoDB();
  } catch (error) {
    client.close();
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findManifest(client, "data-manifest", noManifest.toUpperCase());
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke client" });
    client.close();
    return;
  }

  const response = result
    ? { status: "201", message: "nomor manifest ditemukan", result: result }
    : { status: "404", message: "nomor manifest tidak ditemukan", result: result };

  res.status(201).json(response);
  client.close();
};

export default handler;
