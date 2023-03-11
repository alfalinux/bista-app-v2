import Swal from "sweetalert2";

const ModalCreateOrder = (props) => {
  const { data } = props;
  const detail = [
    { name: "Nama Pengirim", value: data.namaPengirim },
    { name: "No Telp/Hp Pengirim", value: data.nohpPengirim },
    { name: "Alamat Pengirim", value: data.alamatPengirim },
    { name: "Nama Penerima", value: data.namaPenerima },
    { name: "No Telp/Hp Penerima", value: data.nohpPenerima },
    { name: "Alamat Penerima", value: data.alamatPenerima },
    { name: "Jenis Layanan", value: data.layanan.toUpperCase() },
    { name: "Cabang Asal", value: data.cabangAsal.toUpperCase() },
    { name: "Tujuan", value: `${data.tujuan.kec} - ${data.tujuan.ibukota} - ${data.tujuan.prov}` },
    { name: "Cabang Coveran", value: data.cabangAsal.toUpperCase() },
    { name: "Metode Pembayaran", value: data.pembayaran.toUpperCase() },
    { name: "Jumlah Paket", value: `${data.paket.length} Koli` },
    {
      name: "Total Berat Aktual",
      value: `${data.paket
        .reduce((a, b) => a + Number(b.beratAktual), 0)
        .toLocaleString("id-ID", { maximumFractionDigits: 5 })} Kg`,
    },
    {
      name: "Total Berat Dikenakan",
      value: `${data.paket
        .reduce((a, b) => a + Number(b.beratDikenakan), 0)
        .toLocaleString("id-ID", { maximumFractionDigits: 5 })} Kg`,
    },
    { name: "Keterangan Paket", value: data.paket.map((d) => d.keterangan).join(", ") },
    {
      name: "Ongkir per-Kilo",
      value: `Rp. ${Number(data.ongkirPerkilo).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-`,
    },
    {
      name: "Subtotal Ongkir",
      value: `Rp. ${Number(data.subtotalOngkir).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-`,
    },
    {
      name: "Diskon",
      value: `${Number(data.diskon).toLocaleString("id-ID", { maximumFractionDigits: 5 })} %`,
    },
    {
      name: "Ongkir Setelah Diskon",
      value: `Rp. ${Number(data.ongkirSetelahDiskon).toLocaleString("id-ID", {
        maximumFractionDigits: 0,
      })} ,-`,
    },
    {
      name: "Biaya Packing",
      value: `Rp. ${Number(data.biayaPacking).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-`,
    },
    {
      name: "Biaya Surat",
      value: `Rp. ${Number(data.biayaSurat).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-`,
    },
    {
      name: "Biaya Asuransi",
      value: `Rp. ${Number(data.biayaAsuransi).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-`,
    },
    {
      name: "Total Ongkir",
      value: `Rp. ${Number(data.grandTotal).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-`,
    },
  ];

  const createResiHandler = () => {
    Swal.fire({
      title: "Pastikan data sudah sesuai",
      text: "Resi yang sudah di create tidak dapat dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Create Resi!",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="w-full h-screen fixed inset-0 p-4 z-20 bg-black/80 flex items-start justify-center">
      <div className="w-96 max-h-[90%] mx-auto p-4 rounded-md bg-zinc-100 overflow-y-scroll scrollbar overflow-x-hidden text-sm">
        <table className="table-auto border-separate border-spacing-y-1">
          <tbody>
            {detail.map((item, index) => (
              <tr key={index}>
                <td className="border border-transparent whitespace-nowrap align-top">{item.name}</td>
                <td className="border border-transparent align-top">:</td>
                <td className="border border-transparent align-top text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">
                <div className="flex gap-4 mt-4">
                  <button
                    className="w-full px-4 py-2 rounded-md shadow-md bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                    onClick={createResiHandler}
                  >
                    Create Resi
                  </button>
                  <button
                    className="w-full px-4 py-2 rounded-md shadow-md bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                    onClick={props.closeModal}
                  >
                    Edit Data
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ModalCreateOrder;
