import { connectToMongoDB, insertDocument } from "../../../../helpers/mongodbConnection";
import { validityCheck } from "@/components/utils/use-validate";

const handler = async (req, res) => {
  if (validityCheck(req.body).length > 0) {
    return res.status(406).json({
      status: res.status,
      message: "Indikasi percobaan pembobolan keamanan",
      forbidden: validityCheck(req.body),
    });
  }

  let client;
  try {
    client = await connectToMongoDB();
  } catch (error) {
    res.status(500).json({ status: res.status, message: "Gagal terhubung ke database" });
    client.close();
    return;
  }

  if (req.method === "POST") {
    let result;
    try {
      result = await insertDocument(client, "data-resi", req.body);
    } catch (error) {
      res.status(500).json({ status: res.status, message: "Gagal menyimpan ke database" });
      client.close();
      return;
    }

    res.status(201).json({ status: res.status, message: "Data berhasil di upload" });
    client.close();
  } else {
    res.status(404).json({ status: res.status, message: "Halaman tidak ditemukan" });
    client.close();
  }
};

export default handler;
