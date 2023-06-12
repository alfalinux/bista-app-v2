import generateDate from "@/helpers/generateDate";
import resiTrackerData from "@/helpers/resiTrackerData";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const toHtml = (val) => {
  const htmlArray = val.map(
    (item) => `
    <li class="flex items-center justify-start gap-2">
      <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="11" />
        <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
      </svg>
      <div class="flex flex-col items-start justify-center">
        <div class="flex gap-2 text-sm text-gray-500">
          <p class="uppercase font-semibold text-sm text-left whitespace-nowrap">${item.is}</p>
          <p class="text-sm text-left">${item.ket}</p>
        </div>
        <div class="flex gap-2 text-sm text-gray-500">
          <p class="capitalize">${item.in}</p>
          <p class="uppercase">${generateDate(item.at)}</p>
        </div>
      </div>
    </li>
    `
  );
  const htmlString = `<div class="w-full flex items-center justify-center"><ul class="space-y-2 w-fit">${htmlArray.join(
    ""
  )}</ul></div>`;
  return htmlString;
};

const DataTable = ({ dataTransaksi }) => {
  const cekResiHandler = (noResi) => {
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`/api/cek-resi/${noResi}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == "201") {
              const dataResi = resiTrackerData(data);
              Swal.hideLoading();
              Swal.fire({
                title: noResi,
                html: `${toHtml(dataResi)}`,
                showConfirmButton: false,
                showCancelButton: false,
              });
            }
          });
      },
    });
  };
  return (
    <div className="w-full mt-4 mb-4 bg-transparent overflow-x-scroll">
      <table className="w-full table-auto shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
          <tr>
            <th className="p-2 border border-gray-300">No</th>
            <th className="p-2 border border-gray-300">Nomor Resi</th>
            <th className="p-2 border border-gray-300">Pengirim</th>
            <th className="p-2 border border-gray-300">Penerima</th>
            <th className="p-2 border border-gray-300">Cabang Asal</th>
            <th className="p-2 border border-gray-300">Tujuan</th>
            <th className="p-2 border border-gray-300">Nilai Transaksi</th>
            <th className="p-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataTransaksi.result.map((d, idx) => (
            <tr key={idx}>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {idx + 1}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {d.noResi}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-left whitespace-nowrap border border-gray-300 px-2 py-1 overflow-hidden text-ellipsis max-w-[220px] ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {d.namaPengirim}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-left whitespace-nowrap border border-gray-300 px-2 py-1 overflow-hidden text-ellipsis max-w-[220px] ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {d.namaPenerima}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                {d.cabangAsal}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } capitalize`}
              >
                {d.tujuan.kec} - {d.tujuan.ibukota}
              </td>

              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-right whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="">Rp</p>
                  <p className="">{d.grandTotal.toLocaleString("id-ID")},-</p>
                </div>
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                <button
                  className="flex gap-1 items-center justify-center px-2 py-1 bg-red-600 hover:bg-red-700 rounded-full"
                  onClick={() => cekResiHandler(d.noResi)}
                >
                  <MagnifyingGlassCircleIcon className="h-5" />
                  <p className="font-semibold text-xs">Cek Resi</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
