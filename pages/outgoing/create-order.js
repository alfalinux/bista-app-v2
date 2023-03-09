import CreateOrderForm from "@/components/create-order/CreateOrderForm";
import Layout from "@/components/Layout";

const CreateOrderPage = () => {
  const initialValues = {
    noResi: "",
    tglTransaksi: "",
    nohpPengirim: "",
    namaPengirim: "",
    alamatPengirim: "",
    nohpPenerima: "",
    namaPenerima: "",
    alamatPenerima: "",
    layanan: "",
    cabangAsal: "",
    tujuan: "",
    cabangTujuan: "",
    cabangCoveran: "",
    pembayaran: "",
    paket: [],
    ongkirPerkilo: "",
    subtotalOngkir: "",
    diskon: "0",
    ongkirSetelahDiskon: "",
    biayaPacking: "",
    biayaSurat: "",
    biayaAsuransi: "",
    grandTotal: "",
    petugasInput: "",
  };

  const validation = {
    nohpPengirim: "error",
    namaPengirim: "error",
    alamatPengirim: "error",
    nohpPenerima: "error",
    namaPenerima: "error",
    alamatPenerima: "error",
    layanan: "error",
    cabangAsal: "error",
    tujuan: "error",
    pembayaran: "error",
    paket: "error",
    diskon: "error",
    biayaPacking: "error",
    biayaSurat: "error",
    biayaAsuransi: "error",
  };

  const listLayanan = [
    { key: "Cargo", value: "cargo" },
    { key: "Express", value: "express" },
  ];
  const listCabangAsal = [
    { key: "Jakarta", value: "jakarta" },
    { key: "Surabaya", value: "surabaya" },
  ];

  return (
    <Layout>
      <CreateOrderForm
        initialValues={initialValues}
        validation={validation}
        listLayanan={listLayanan}
        listCabangAsal={listCabangAsal}
      />
    </Layout>
  );
};

export default CreateOrderPage;
