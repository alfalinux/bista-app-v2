import { validityCheck } from "@/components/utils/use-validate";
import { connectToMongoDB, pushManySuratJalan } from "../../../../helpers/mongodbConnection";

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
    res.status(500).json({ status: res.statusCode, message: "Gagal terhubung ke database resi" });
    client.close();
    return;
  }

  if (req.method === "PATCH") {
    let result;
    try {
      result = await pushManySuratJalan(client, "data-resi", filter, update);
    } catch (error) {
      res.status(500).json({ status: res.statusCode, message: "Gagal update Resi" });
      client.close();
      return;
    }

    res.status(201).json({ status: res.statusCode, message: "Resi berhasil di update" });
    client.close();
  }
};

export default handler;
