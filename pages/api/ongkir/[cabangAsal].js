import fs from "fs";
import path from "path";

const handler = (req, res) => {
  const { cabangAsal } = req.query;
  const filePath = path.join(process.cwd(), "data", "ongkir", `${cabangAsal}.json`);
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  res.status(201).json({ kecamatan: data });
};

export default handler;
