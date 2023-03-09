import React from "react";

const ModalCreateOrder = (props) => {
  const { data } = props;
  const detail = [
    { name: "Nama Pengirim", value: data.namaPengirim },
    { name: "No Telp/Hp Pengirim", value: data.nohpPengirim },
    { name: "Alamat Pengirim", value: data.alamatPengirim },
    { name: "Nama Penerima", value: data.namaPenerima },
    { name: "No Telp/Hp Penerima", value: data.nohpPenerima },
    { name: "Alamat Penerima", value: data.alamatPenerima },
    { name: "Jenis Layanan", value: data.layanan },
    { name: "Cabang Asal", value: data.cabangAsal },
    { name: "Tujuan", value: `${data.tujuan.kec} - ${data.tujuan.ibukota} - ${data.tujuan.prov}` },
    { name: "Cabang Coveran", value: data.cabangAsal },
    { name: "Metode Pembayaran", value: data.pembayaran },
    { name: "Jumlah Paket", value: `${data.paket.length} Koli` },
    { name: "Total Berat Aktual", value: `${data.paket.reduce((a, b) => a + Number(b.beratAktual), 0)} Kg` },
    {
      name: "Total Berat Dikenakan",
      value: `${data.paket.reduce((a, b) => a + Number(b.beratDikenakan), 0)} Kg`,
    },
    { name: "Keterangan Paket", value: data.paket.map((d) => d.keterangan).join(", ") },
    { name: "Ongkir per-Kilo", value: data.ongkirPerkilo },
    { name: "Subtotal Ongkir", value: data.subtotalOngkir },
    { name: "Diskon", value: `${data.diskon} %` },
    { name: "Ongkir Setelah Diskon", value: data.ongkirSetelahDiskon },
    { name: "Biaya Packing", value: data.biayaPacking },
    { name: "Biaya Surat", value: data.biayaSurat },
    { name: "Biaya Asuransi", value: data.biayaAsuransi },
    { name: "Total Ongkir", value: data.grandTotal },
  ];

  return (
    <div>
      <div className="w-full h-screen fixed inset-0 bg-black/80 z-10" onClick={props.closeModal}></div>

      <div className="w-full h-screen fixed inset-0 z-20">
        <div className="w-full p-4 bg-red-500">
          <p className="text-white">
            Pastikan sebelum klik tombol "Create Resi" data sudah sesuai karena transaksi tidak dapat
            dibatalkan
          </p>
        </div>
        <div className="w-96 h-[70%] mt-4 px-4 py-2 mx-auto bg-zinc-100 overflow-y-scroll overflow-x-hidden border-separate border-y-0 text-sm">
          <table className="">
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
              <tr className="flex gap-4">
                <td colSpan="3">
                  <button className="px-4 py-2 bg-sky-500 text-white font-semibold">Create Resi</button>
                  <button className="px-4 py-2 bg-yellow-500 text-white font-semibold">Edit Data</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateOrder;
