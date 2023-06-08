import generateDate from "@/helpers/generateDate";

const TableTracker = ({ dataResi }) => {
  return (
    <table className="w-full table-auto shadow-md">
      <thead className="bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
        <tr>
          <th className="p-2 border border-gray-300 text-center">No</th>
          <th className="p-2 border border-gray-300 text-center">Tanggal</th>
          <th className="p-2 border border-gray-300 text-center">Proses</th>
          <th className="p-2 border border-gray-300 text-center">Cabang</th>
          <th className="p-2 border border-gray-300 text-center">Petugas</th>
          <th className="p-2 border border-gray-300 text-center">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        {dataResi.map((d, idx) => (
          <tr
            key={idx}
            className={`${
              (idx + 1) % 2 === 0
                ? "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700"
                : "bg-white dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <td
              className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3 `}
            >
              {idx + 1}
            </td>
            <td
              className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3 `}
            >
              {generateDate(d.at)}
            </td>
            <td
              className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3  uppercase`}
            >
              {d.is}
            </td>
            <td
              className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3  uppercase`}
            >
              {d.in}
            </td>
            <td
              className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3 `}
            >
              {d.by}
            </td>
            <td
              className={`text-gray-900 dark:text-gray-200 text-xs text-center  border border-gray-300 px-2 py-1 row-span-3 `}
            >
              {d.ket}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTracker;
