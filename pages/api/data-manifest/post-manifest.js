import validityCheck from "@/helpers/validityCheck";
import { connectToMongoDB, insertDocument } from "../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  if (validityCheck(req.body).length > 0) {
    return res.status(406).json({
      status: res.statusCode,
      message: "Indikasi percobaan pembobolan keamanan",
      forbidden: validityCheck(req.body),
    });
  }

  let client;
  try {
    client = await connectToMongoDB();
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke database" });
    client.close();
    return;
  }

  if (req.method === "POST") {
    let result;
    try {
      result = await insertDocument(client, "data-manifest", req.body);
    } catch (error) {
      res.status(500).json({ status: res.statusCode, message: "Gagal menyimpan manifest ke database" });
      client.close();
      return;
    }

    res.status(201).json({ status: res.statusCode, message: "Data Manifiest berhasil di upload" });
    client.close();
  } else {
    res.status(404).json({ status: res.statusCode, message: "Halaman tidak ditemukan" });
    client.close();
  }
};

export default handler;
