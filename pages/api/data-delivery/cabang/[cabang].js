import { connectToMongoDB, findDeliveryByCabang } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { cabang } = req.query;

  // validasi input
  if (!cabang || typeof cabang !== "string" || !/^[a-zA-Z0-9]+$/.test(cabang)) {
    res.status(400).json({ status: res.statusCode, message: "Input nama cabang tidak valid" });
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
    result = await findDeliveryByCabang(client, "data-resi", cabang);
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke client" });
    client.close();
    return;
  }

  const response =
    result.length > 0
      ? { status: "201", message: "data delivery ditemukan", result: result }
      : { status: "404", message: "data delivery tidak ditemukan", result: result };

  res.status(201).json(response);
  client.close();
};

export default handler;
