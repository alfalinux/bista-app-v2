import { validityCheck } from "@/components/utils/use-validate";
import { connectToMongoDB, updateSuratJalan } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { filter, update } = req.body;

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

  if (req.method === "PATCH") {
    let result;
    try {
      result = await updateSuratJalan(client, "data-surat-jalan", filter, update);
    } catch (error) {
      res.status(500).json({ status: res.statusCode, message: "Gagal update surat jalan" });
      client.close();
      return;
    }

    res.status(201).json({ status: res.statusCode, message: "Surat jalan berhasil di update" });
    client.close();
  }
};

export default handler;
