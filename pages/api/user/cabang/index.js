const handler = async (req, res) => {
  res.status(201).json({ status: "404", message: "Data cabang tidak ditemukan", result: [] });
};

export default handler;
