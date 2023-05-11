import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const CreateSuratJalanTable = ({ dataManifest, cabangTujuan, onCheckedResi, onCheckedAllResi }) => {
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
    setFilteredData(dataManifest.length > 0 ? dataManifest : []);
    for (let item of checkbox) {
      item.checked = false;
    }
    setIsCheckedAll(false);
  }, [cabangTujuan, dataManifest]);

  return (
    <>
      {filteredData.length > 0 ? (
        <div className="w-full mt-4 mb-4 shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
              <tr>
                <th className="p-2 border border-gray-300">No</th>
                <th className="p-2 border border-gray-300">No Manifest</th>
                <th className="p-2 border border-gray-300">Asal</th>
                <th className="p-2 border border-gray-300">Tujuan</th>
                <th className="p-2 border border-gray-300">Coveran</th>
                <th className="p-2 border border-gray-300 flex items-center justify-center gap-1">
                  <p>Pilih</p>
                  {cabangTujuan ? (
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
                    {data.noManifest}
                  </td>
                  <td
                    className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 capitalize ${
                      (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                    }`}
                  >
                    {data.cabangAsal}
                  </td>
                  <td
                    className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 capitalize ${
                      (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                    }`}
                  >
                    {data.cabangTujuan}
                  </td>
                  <td
                    className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 capitalize ${
                      (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                    }`}
                  >
                    {data.coveranArea}
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
                      disabled={cabangTujuan ? false : true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-600 mt-4">Data Tidak Ditemukan...</p>
      )}
    </>
  );
};

export default CreateSuratJalanTable;
