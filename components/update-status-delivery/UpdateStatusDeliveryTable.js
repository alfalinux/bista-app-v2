import generateDate from "@/helpers/generateDate";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateStatusDeliveryButton from "./UpdateStatusDeliveryButton";
import CloseDeliveryButton from "./CloseDeliveryButton";

const UpdateStatusDeliveryTable = ({
  listDelivery,
  dataResi,
  namaKurir,
  cabang,
  onChangeCabang,
  onChangeKurir,
}) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(
      listDelivery.map((delivery) => ({
        noDelivery: delivery.noDelivery,
        listResi: dataResi.filter((resi) =>
          resi.delivery.some((val) => val.noDelivery === delivery.noDelivery)
        ),
      }))
    );
  }, [listDelivery]);

  return (
    <div className="w-full lg:w-[730px] xl:w-full mt-4 mb-4 bg-transparent">
      {listData.map((d, idx) => {
        let noDelivery = d.noDelivery;
        return (
          <div key={idx} className="mb-8">
            <h1>
              {noDelivery} -{" "}
              {[
                ...new Set(
                  dataResi.flatMap((resi) =>
                    resi.delivery
                      .filter((delivery) => delivery.noDelivery === noDelivery)
                      .map((delivery) => delivery.dataKurir.nama)
                  )
                ),
              ].join(", ")}{" "}
              -{" "}
              {generateDate(
                [
                  ...new Set(
                    dataResi.flatMap((resi) =>
                      resi.delivery
                        .filter((delivery) => delivery.noDelivery === noDelivery)
                        .map((delivery) => delivery.deliveryCreatedAt)
                    )
                  ),
                ].join(", ")
              )}
            </h1>
            <table className="w-full table-auto shadow-md">
              <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
                <tr>
                  <th className="p-2 border border-gray-300">No</th>
                  <th className="p-2 border border-gray-300">No Resi</th>
                  <th className="p-2 border border-gray-300">Penerima</th>
                  <th className="p-2 border border-gray-300">Isi Paket</th>
                  <th className="p-2 border border-gray-300">Jlh Paket</th>
                  <th className="p-2 border border-gray-300">Berat Paket</th>
                  <th className="p-2 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {d.listResi.map((d, idx) => (
                  <tr key={idx}>
                    <td
                      className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      {idx + 1}
                    </td>
                    <td
                      className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      {d.noResi}
                    </td>
                    <td
                      className={`w-[240px] text-gray-900 dark:text-gray-200 text-xs border border-gray-300 px-2 py-1 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      <div className="text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]">
                        {d.namaPenerima}
                      </div>
                      <div className="text-left">{d.nohpPenerima}</div>
                      <div className="text-left text-[8px]">{d.alamatPenerima}</div>
                    </td>
                    <td
                      className={`w-[240px] text-gray-900 dark:text-gray-200 text-xs text-left border border-gray-300 px-2 py-1 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      {d.paket.map((d) => d.keterangan).join(", ")}
                    </td>
                    <td
                      className={`text-gray-900 dark:text-gray-200 text-xs text-center border border-gray-300 px-2 py-1 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      {d.paket.length} Koli
                    </td>
                    <td
                      className={`text-gray-900 dark:text-gray-200 text-xs text-center border border-gray-300 px-2 py-1 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      {d.paket
                        .map((d) => d.beratDikenakan)
                        .reduce((acc, val) => acc + Number(val), 0)
                        .toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                      Kg
                    </td>
                    <td
                      className={`text-gray-900 dark:text-gray-200 text-xs text-center border border-gray-300 px-2 py-1 ${
                        (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                      }`}
                    >
                      <UpdateStatusDeliveryButton
                        noResi={d.noResi}
                        dataResi={d}
                        noDelivery={noDelivery}
                        status={
                          d.delivery.filter((d) => d.noDelivery === noDelivery)[0].deliveryStatus.proses
                        }
                        cabang={cabang}
                        namaKurir={namaKurir}
                        onChangeCabang={onChangeCabang}
                        onChangeKurir={onChangeKurir}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" className="border border-gray-300 p-4">
                    <div className="w-full flex gap-4 align-middle justify-evenly">
                      <section className="bg-violet-600 rounded-md text-white w-32 p-2 flex flex-col items-center justify-center">
                        <p>Total Paket</p>
                        <p className="font-semibold text-base">
                          {d.listResi.map((d) => d.paket.length).reduce((acc, val) => acc + Number(val), 0)}{" "}
                          Koli
                        </p>
                      </section>
                      <section className="bg-lime-600 rounded-md text-white w-32 p-2 flex flex-col items-center justify-center">
                        <p>Total Berat</p>
                        <p className="font-semibold text-base">
                          {d.listResi
                            .map((d) => d.paket.reduce((acc, val) => acc + Number(val.beratDikenakan), 0))
                            .reduce((acc, val) => acc + Number(val), 0)
                            .toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                          Kg
                        </p>
                      </section>
                      <section className="bg-pink-600 rounded-md text-white w-32 p-2 flex flex-col items-center justify-center">
                        <p>Resi Dibawa</p>
                        <p className="font-semibold text-base">{d.listResi.length} Resi</p>
                      </section>
                      <section className="bg-sky-600 rounded-md text-white w-32 p-2 flex flex-col items-center justify-center">
                        <p>Telah Diterima</p>
                        <p className="font-semibold text-base">
                          {
                            d.listResi
                              .flatMap((d) => d.delivery.filter((d) => d.noDelivery === noDelivery))
                              .flatMap((d) => d.deliveryStatus)
                              .filter((d) => d.proses === "diterima").length
                          }{" "}
                          Resi
                        </p>
                      </section>
                      <section className="bg-red-600 rounded-md text-white w-32 p-2 flex flex-col items-center justify-center">
                        <p>Gagal Kirim</p>
                        <p className="font-semibold text-base">
                          {
                            d.listResi
                              .flatMap((d) => d.delivery.filter((d) => d.noDelivery === noDelivery))
                              .flatMap((d) => d.deliveryStatus)
                              .filter((d) => d.proses === "gagal").length
                          }{" "}
                          Resi
                        </p>
                      </section>
                      <section className="bg-orange-600 rounded-md text-white w-32 p-2 flex flex-col items-center justify-center">
                        <p>Pengantaran</p>
                        <p className="font-semibold text-base">
                          {
                            d.listResi
                              .flatMap((d) => d.delivery.filter((d) => d.noDelivery === noDelivery))
                              .flatMap((d) => d.deliveryStatus)
                              .filter((d) => d.proses === "pengantaran").length
                          }{" "}
                          Resi
                        </p>
                      </section>
                    </div>
                  </td>
                </tr>
                {d.listResi
                  .flatMap((d) => d.delivery.filter((d) => d.noDelivery === noDelivery))
                  .flatMap((d) => d.deliveryStatus)
                  .filter((d) => d.proses === "pengantaran").length === 0 ? (
                  <tr>
                    <td colSpan="7" className="w-full border border-gray-300  p-4">
                      <CloseDeliveryButton noDelivery={noDelivery} cabang={cabang} />
                    </td>
                  </tr>
                ) : null}
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default UpdateStatusDeliveryTable;
