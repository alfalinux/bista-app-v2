const DataTable = ({ dataTransaksi }) => {
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
            <th className="p-2 border border-gray-300">Cabang Coveran</th>
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
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (idx + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                {d.tujuan.cov}
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
                Transaksi Cabang Bengkulu
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
