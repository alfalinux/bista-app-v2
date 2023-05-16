import generateDate from "@/helpers/generateDate";

const TableTracker = ({ dataResi }) => {
  return (
    <div className="w-full flex flex-col gap-2 sm:flex-row sm:flex-wrap items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border-[1px] border-gray-300 dark:border-gray-400 text-sm text-left">
      <table className="table-auto w-full border border-spacing-1">
        <thead>
          <tr className="bg-red-600 text-white font-semibold text-center">
            <td className="border p-2 whitespace-nowrap">Tanggal</td>
            <td className="border p-2 whitespace-nowrap">Keterangan</td>
            <td className="border p-2 whitespace-nowrap">Petugas</td>
            <td className="border p-2 whitespace-nowrap">Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border text-center whitespace-nowrap">
              {generateDate(dataResi.result.tglTransaksi)}
            </td>
            <td className="border text-center whitespace-nowrap">{dataResi.result.noResi}</td>
            <td className="border text-center whitespace-nowrap">{dataResi.result.petugas}</td>
            <td className="border text-center capitalize">Transaksi Cabang {dataResi.result.cabangAsal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableTracker;
