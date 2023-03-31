import { DocumentCheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import generateNoResi from "../../helpers/generateNoResi";

const ModalCreateOrder = (props) => {
  const router = useRouter();
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
      value: `${
        data.paket.reduce((a, b) => a + Number(b.beratDikenakan), 0) < 10
          ? 10
          : data.paket
              .reduce((a, b) => a + Number(b.beratDikenakan), 0)
              .toLocaleString("id-ID", { maximumFractionDigits: 5 })
      } Kg`,
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
    const tglTransaksi = new Date().toISOString();
    const noResi = generateNoResi("BKU", "CSO");
    fetch("/api/data-resi/post-resi", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        tglTransaksi: tglTransaksi,
        noResi: noResi,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${noResi}`,
          text: `${data.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
        router.replace(`/reprint/reprint-resi?noResi=${noResi}`);
      });
  };

  return (
    <div className="w-full h-[100dvh] fixed inset-0 p-4 z-20 bg-black/80 flex items-start justify-center">
      <div className="w-96 h-full mx-auto p-4 rounded-md bg-zinc-100 overflow-y-scroll sm:scrollbar overflow-x-hidden text-sm">
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
                    className="w-full px-4 py-3 rounded-md shadow-md bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center justify-center gap-1"
                    onClick={createResiHandler}
                  >
                    <DocumentCheckIcon className="h-5" />
                    <p>Create Resi</p>
                  </button>
                  <button
                    className="w-full px-4 py-3 rounded-md shadow-md bg-yellow-500 hover:bg-yellow-600 text-white font-semibold flex items-center justify-center gap-1"
                    onClick={props.closeModal}
                  >
                    <PencilSquareIcon className="h-5" />
                    <p>Edit Data</p>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <p className="text-xs text-red-500">
                  Cek dan konfirmasi kembali data inputan, karena setelah klik tombol "Create Resi" data akan
                  diproses dan tidak dapat dibatalkan!
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ModalCreateOrder;

// const createResiHandler = () => {
//   Swal.fire({
//     title: "Pastikan data sudah sesuai",
//     text: "Resi yang sudah di create tidak dapat dibatalkan!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Create Resi!",
//     cancelButtonText: "Batalkan",
//     showLoaderOnConfirm: true,
//     preConfirm: () => {
//       const tglTransaksi = new Date().toISOString();
//       const noResi = generateNoResi("BKU", "CSO");
//       return fetch("/api/data-resi/post-resi", {
//         method: "POST",
//         body: JSON.stringify({
//           ...data,
//           tglTransaksi: tglTransaksi,
//           noResi: noResi,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(response.statusText);
//           }
//           return response.json();
//         })
//         .then((data) => setPostedData(noResi))
//         .catch((error) => {
//           Swal.showValidationMessage(`Request failed: ${error}`);
//         });
//     },
//     allowOutsideClick: () => !Swal.isLoading(),
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Sukses",
//         text: `Resi berhasil di create dengan nomor ${postedData}`,
//         icon: "success",
//         showCancelButton: false,
//         showConfirmButton: true,
//         showCloseButton: false,
//       });
//       router.replace(`/reprint/reprint-resi?noResi=${postedData}`);
//     }
//   });
// };
