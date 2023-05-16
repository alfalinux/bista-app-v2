import React from "react";

const DetailResi = ({ dataResi }) => {
  return (
    <div className="w-full flex flex-col gap-2 sm:flex-row sm:flex-wrap items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border-[1px] border-gray-300 dark:border-gray-400 text-sm text-left">
      <div className="w-full">
        {/* Tabel Detail Pengirim */}
        <table className="table-fixed border-separate border-spacing-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md w-full mb-4 p-2">
          <tbody className="">
            <tr className="">
              <td className="w-32 align-top">Nama Pengirim</td>
              <td className="w-2 align-top">:</td>
              <td className="w-full align-top ">{dataResi.result.namaPengirim}</td>
            </tr>
            <tr>
              <td className="align-top">No Telp Pengirim</td>
              <td className="align-top">:</td>
              <td className="align-top ">{dataResi.result.nohpPengirim}</td>
            </tr>
            <tr>
              <td className="align-top">Alamat Pengirim</td>
              <td className="align-top">:</td>
              <td className="align-top ">{dataResi.result.alamatPengirim}</td>
            </tr>
          </tbody>
        </table>

        {/* Tabel Detail Penerima */}
        <table className="table-fixed border-separate border-spacing-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md w-full mb-4 p-2">
          <tbody>
            <tr>
              <td className="w-32 align-top">Nama Penerima</td>
              <td className="w-2 align-top">:</td>
              <td className="w-full align-top">{dataResi.result.namaPenerima}</td>
            </tr>
            <tr>
              <td className="align-top">No Telp Penerima</td>
              <td className="align-top">:</td>
              <td className="align-top">{dataResi.result.nohpPenerima}</td>
            </tr>
            <tr>
              <td className="align-top">Alamat Penerima</td>
              <td className="align-top">:</td>
              <td className="align-top">{dataResi.result.alamatPenerima}</td>
            </tr>
          </tbody>
        </table>

        {/* Tabel Detail Paket */}
        <table className="table-fixed border-separate border-spacing-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md w-full mb-4 p-2">
          <tbody>
            <tr>
              <td className="w-32 align-top">Layanan</td>
              <td className="w-2 align-top">:</td>
              <td className="w-full align-top uppercase">{dataResi.result.layanan}</td>
            </tr>
            <tr>
              <td className="align-top">Pembayaran</td>
              <td className="align-top">:</td>
              <td className="align-top uppercase">{dataResi.result.pembayaran}</td>
            </tr>
            <tr>
              <td className="align-top">Jumlah Paket</td>
              <td className="align-top">:</td>
              <td className="align-top">
                {dataResi.result.paket.length.toLocaleString("id-ID", { maximumFractionDigits: 0 })} Koli
              </td>
            </tr>
            <tr>
              <td className="align-top">Berat Paket</td>
              <td className="align-top">:</td>
              <td className="align-top">
                {dataResi.result.paket
                  .map((d) => d.beratDikenakan)
                  .reduce((acc, val) => acc + Number(val), 0)
                  .toLocaleString("id-ID", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}{" "}
                Kg
              </td>
            </tr>
            <tr>
              <td className="align-top">Keterangan Paket</td>
              <td className="align-top">:</td>
              <td className="align-top">{dataResi.result.paket.map((d) => d.keterangan).join(", ")}</td>
            </tr>
          </tbody>
        </table>

        {/* Tabel Detail Biaya */}
        <table className="table-fixed border-separate border-spacing-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md w-full p-2">
          <tbody>
            <tr>
              <td className="w-32 align-top">Berat Dikenakan</td>
              <td className="w-2 align-top">:</td>
              <td className="w-full align-top">
                {dataResi.result.beratPaketDikenakan.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                Kg
              </td>
            </tr>
            <tr>
              <td className="align-top">Ongkir Perkilo</td>
              <td className="align-top">:</td>
              <td className="align-top">
                Rp {dataResi.result.ongkirPerkilo.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-
              </td>
            </tr>
            <tr>
              <td className="align-top">Diskon</td>
              <td className="align-top">:</td>
              <td className="align-top">{dataResi.result.diskon}</td>
            </tr>
            <tr>
              <td className="align-top">Biaya Packing</td>
              <td className="align-top">:</td>
              <td className="align-top">
                Rp {dataResi.result.biayaPacking.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-
              </td>
            </tr>
            <tr>
              <td className="align-top">Biaya Surat</td>
              <td className="align-top">:</td>
              <td className="align-top">
                Rp {dataResi.result.biayaSurat.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-
              </td>
            </tr>
            <tr>
              <td className="align-top">Biaya Asuransi</td>
              <td className="align-top">:</td>
              <td className="align-top">
                Rp {dataResi.result.biayaAsuransi.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-
              </td>
            </tr>
            <tr>
              <td className="align-top">Total Ongkir</td>
              <td className="align-top">:</td>
              <td className="align-top">
                Rp {dataResi.result.grandTotal.toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailResi;
