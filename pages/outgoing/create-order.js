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
    cabangCoveran: "",
    pembayaran: "",
    paket: [],
    beratPaketDikenakan: "",
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

  return (
    <Layout>
      <CreateOrderForm initialValues={initialValues} validation={validation} />
    </Layout>
  );
};

export default CreateOrderPage;
