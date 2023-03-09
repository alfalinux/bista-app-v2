import fs from "fs";
import path from "path";

const handler = (req, res) => {
  const [cabangAsal, tujuan] = req.query.slug;

  const filePath = path.join(process.cwd(), "data", "ongkir", `${cabangAsal}.json`);
  let fileData;
  try {
    fileData = fs.readFileSync(filePath);
  } catch (error) {
    res.status(500).json({ message: "Data cabang asal tidak ditemukan" });
    return;
  }
  const data = JSON.parse(fileData);
  let dataOngkir;
  try {
    dataOngkir = data.filter((d) => d.kec.toLowerCase().includes(tujuan.toLowerCase()));
  } catch (error) {
    res.status(500).json({ message: "Data kecamatan tidak ditemukan" });
    return;
  }

  dataOngkir
    ? res.status(201).json({ kecamatan: dataOngkir })
    : res.status(204).json({ message: "Kecamatan tersebut belum tercover" });
};

export default handler;
