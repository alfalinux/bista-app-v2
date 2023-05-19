import { connectToMongoDB, findResiBelumDelivery } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { cabang } = req.query;

  // validasi input
  if (!cabang || typeof cabang !== "string" || !/^[a-zA-Z0-9]+$/.test(cabang)) {
    res.status(400).json({
      status: 400,
      message: "Input cabang tidak valid. Harus terdiri dari huruf dan angka.",
      result: [],
    });
    return;
  }

  let client;
  try {
    client = await connectToMongoDB({ ssl: true, sslValidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Gagal terhubung ke database", result: [] });
    return;
  }

  let result;
  try {
    result = await findResiBelumDelivery(client, "data-resi", cabang);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Data cabang tidak ditemukan", result: [] });
    return;
  } finally {
    client.close();
  }

  const response =
    result.length > 0
      ? { status: "201", message: "Data cabang ditemukan", result: result }
      : { status: "404", message: "Data cabang tidak ditemukan", result: result };

  res.status(201).json(response);
};

export default handler;
