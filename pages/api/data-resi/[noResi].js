import { connectToMongoDB, findResi } from "../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { noResi } = req.query;
  let client;
  try {
    client = await connectToMongoDB();
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findResi(client, "data-resi", noResi.toUpperCase());
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Nomor Resi tidak ditemukan" });
    return;
  }

  const response = result ? result : { message: "Nomor Resi tidak ditemukan" };
  res.status(201).json(response);
};

export default handler;
