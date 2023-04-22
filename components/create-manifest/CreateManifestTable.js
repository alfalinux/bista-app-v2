import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const CreateManifestTable = ({ dataResi, tujuan, onCheckedResi, onCheckedAllResi }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const checkbox = document.querySelectorAll("#checkbox");

  const selectAllHandler = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  useEffect(() => {
    for (let item of checkbox) {
      item.checked = isCheckedAll;
    }
    isCheckedAll ? onCheckedAllResi(filteredData) : onCheckedAllResi([]);
  }, [isCheckedAll]);

  useEffect(() => {
    setFilteredData(
      dataResi.length > 0 ? (tujuan ? dataResi.filter((d) => d.tujuan.ibukota === tujuan) : dataResi) : []
    );
    for (let item of checkbox) {
      item.checked = false;
    }
    setIsCheckedAll(false);
  }, [tujuan, dataResi]);

  return (
    <div className="w-full mt-4 mb-4 shadow-md">
      {filteredData.length > 0 && (
        <table className="w-full table-auto">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
            <tr>
              <th className="p-2 border border-gray-300">No</th>
              <th className="p-2 border border-gray-300">No Resi</th>
              <th className="p-2 border border-gray-300">Asal</th>
              <th className="p-2 border border-gray-300">Coveran</th>
              <th className="p-2 border border-gray-300">Tujuan</th>
              <th className="p-2 border border-gray-300 flex items-center justify-center gap-1">
                <p>Pilih</p>
                {tujuan ? (
                  <ClipboardDocumentCheckIcon
                    className="h-5 hover:animate-pulse hover:text-red-600 cursor-pointer"
                    onClick={selectAllHandler}
                  />
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td
                  className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                  }`}
                >
                  {index + 1}
                </td>
                <td
                  className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                  }`}
                >
                  {data.noResi}
                </td>
                <td
                  className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                  }`}
                >
                  {data.cabangAsal.toUpperCase()}
                </td>
                <td
                  className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                  }`}
                >
                  {data.tujuan.cov.toUpperCase()}
                </td>
                <td
                  className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                  }`}
                >
                  {data.tujuan.ibukota.toUpperCase()}
                </td>
                <td
                  className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                    (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={(e) => onCheckedResi(e.target.checked, data)}
                    className="hover:cursor-pointer"
                    disabled={tujuan ? false : true}
                  />
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
