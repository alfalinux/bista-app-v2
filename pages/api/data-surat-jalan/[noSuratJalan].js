import { connectToMongoDB, findSuratJalan } from "../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { noSuratJalan } = req.query;
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
    result = await findSuratJalan(client, "data-surat-jalan", noSuratJalan.toUpperCase());
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke client" });
    client.close();
    return;
  }

  const response = result
    ? { status: "201", message: "nomor surat jalan ditemukan", result: result }
    : { status: "404", message: "nomor surat jalan tidak ditemukan", result: result };

  res.status(201).json(response);
  client.close();
};

export default handler;
