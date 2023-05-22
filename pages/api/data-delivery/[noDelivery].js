import { connectToMongoDB, findDelivery } from "../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { noDelivery } = req.query;

  // validasi input
  if (!noDelivery || typeof noDelivery !== "string" || !/^[a-zA-Z0-9]+$/.test(noDelivery)) {
    res.status(400).json({ status: res.statusCode, message: "Input nomor delivery tidak valid" });
    return;
  }

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
    result = await findDelivery(client, "data-resi", noDelivery.toUpperCase());
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke client" });
    client.close();
    return;
  }

  const response =
    result.length > 0
      ? { status: "201", message: "nomor delivery ditemukan", result: result }
      : { status: "404", message: "nomor delivery tidak ditemukan", result: result };

  res.status(201).json(response);
  client.close();
};

export default handler;
