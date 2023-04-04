const CreateManifestTable = ({ dataResi, coveran, tujuan }) => {
  const filteredData =
    dataResi.length > 0
      ? coveran
        ? dataResi.filter((d) => d.tujuan.cov === coveran)
        : tujuan
        ? dataResi.filter((d) => d.tujuan.ibukota === tujuan)
        : dataResi
      : [];

  return (
    <div className="mt-4 mb-4">
      {dataResi.length > 0 && (
        <table className="w-full table-auto">
          <thead className="bg-gray-900 text-gray-100 text-sm">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">No Resi</th>
              <th className="p-2">Asal</th>
              <th className="p-2">Coveran</th>
              <th className="p-2">Tujuan</th>
              <th className="p-2">Pilih</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td
                  className={`text-gray-900 text-sm text-center border border-gray-300 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </td>
                <td
                  className={`text-gray-900 text-sm text-center border border-gray-300 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {data.noResi}
                </td>
                <td
                  className={`text-gray-900 text-sm text-center border border-gray-300 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {data.cabangAsal.toUpperCase()}
                </td>
                <td
                  className={`text-gray-900 text-sm text-center border border-gray-300 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {data.tujuan.cov.toUpperCase()}
                </td>
                <td
                  className={`text-gray-900 text-sm text-center border border-gray-300 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {data.tujuan.ibukota.toUpperCase()}
                </td>
                <td
                  className={`text-gray-900 text-sm text-center border border-gray-300 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  <input type="checkbox" className="hover:cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateManifestTable;
