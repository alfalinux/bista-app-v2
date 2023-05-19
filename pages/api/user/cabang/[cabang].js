import { connectToMongoDB, findUserCabang } from "../../../../helpers/mongodbConnection";

const handler = async (req, res) => {
  const { cabang } = req.query;

  if (!cabang || typeof cabang !== "string" || !/^[a-zA-Z0-9]+$/.test(cabang)) {
    res
      .status(400)
      .json({
        status: 400,
        message: "Input cabang tidak valid. Harus terdiri dari huruf dan angka.",
        result: [],
      });
    return;
  }

  let client;
  try {
    client = await connectToMongoDB();
  } catch (error) {
    res.status(500).json({ status: 500, message: "Gagal terhubung ke database" });
    return;
  }

  let result;
  try {
    result = await findUserCabang(client, "data-user", cabang);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Gagal terhubung ke client" });
    return;
  } finally {
    client.close();
  }

  const response =
    result.length > 0
      ? { status: "201", message: "Data user ditemukan", result: result }
      : { status: "404", message: "Data user tidak ditemukan", result: result };

  res.status(201).json(response);
};

export default handler;
