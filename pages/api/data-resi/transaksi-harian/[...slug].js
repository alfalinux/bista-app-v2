import { connectToMongoDB, findResiCabangByDate } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const {
    slug: [cabang, tglTransaksi],
  } = req.query;

  // validasi input cabang
  if (!cabang || typeof cabang !== "string" || !/^[a-zA-Z0-9]+$/.test(cabang)) {
    res.status(400).json({
      status: res.statusCode,
      message: "Input cabang tidak valid. Harus terdiri dari huruf dan angka.",
      result: [],
    });
    return;
  }

  // validasi input tgl
  if (!tglTransaksi || typeof tglTransaksi !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(tglTransaksi)) {
    res.status(400).json({
      status: res.statusCode,
      message: "Input tgl transaksi tidak valid. Gunakan format YYYY-MM-DD.",
      result: [],
    });
    return;
  }

  let client;
  try {
    client = await connectToMongoDB({ ssl: true, sslValidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke database", result: [] });
    return;
  }

  let result;
  try {
    result = await findResiCabangByDate(client, "data-resi", cabang, tglTransaksi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: res.statusCode, message: "Data Resi tidak ditemukan", result: [] });
    return;
  } finally {
    client.close();
  }

  res.status(201).json({ status: res.statusCode, message: "Data ditemukan", result: result });
};

export default handler;
