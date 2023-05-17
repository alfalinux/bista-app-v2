import generateDate from "@/helpers/generateDate";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReceiveManifestButton from "./ReceiveManifestButton";

const ReceiveManifestTable = ({ dataManifest, resetCabangTujuan }) => {
  const [checkedManifest, setCheckedManifest] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const checkbox = document.querySelectorAll("#checkbox");

  const checkedHandler = (checked, checkedData) => {
    if (checked) {
      setCheckedManifest((prevState) => [...prevState, checkedData]);
    } else {
      setCheckedManifest((prevState) => prevState.filter((d) => d.noSuratJalan !== checkedData.noSuratJalan));
    }
  };

  const checkedAllHandler = () => {
    if (checkedAll) {
      setCheckedAll(false);
      setCheckedManifest([]);
      for (let item of checkbox) {
        item.checked = false;
      }
    } else {
      setCheckedAll(true);
      setCheckedManifest(dataManifest);
      for (let item of checkbox) {
        item.checked = true;
      }
    }
  };

  useEffect(() => {
    if (checkedManifest.length === dataManifest.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkedManifest]);

  useEffect(() => {
    setCheckedAll(false);
    setCheckedManifest([]);
  }, [dataManifest]);

  return (
    <div className="w-full mt-4 mb-4 bg-transparent">
      <table className="w-full table-auto shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
          <tr>
            <th className="p-2 border border-gray-300">No</th>
            <th className="p-2 border border-gray-300">No Manifest</th>
            <th className="p-2 border border-gray-300">Tgl Manifest</th>
            <th className="p-2 border border-gray-300">Asal</th>
            <th className="p-2 border border-gray-300">Tujuan</th>
            <th className="p-2 border border-gray-300">Coveran</th>
            <th className="p-2 border border-gray-300 flex flex-wrap items-center justify-center gap-1">
              <p>Pilih</p>
              <ClipboardDocumentCheckIcon
                className="h-5 hover:animate-pulse hover:text-red-600 cursor-pointer"
                onClick={checkedAllHandler}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {dataManifest.map((data, index) => (
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
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                {generateDate(data.manifestCreatedAt)}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                {data.cabangAsal}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                {data.cabangTujuan}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
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
                  onChange={(e) => checkedHandler(e.target.checked, data)}
                  className="hover:cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full mt-8 flex justify-end items-center">
        <ReceiveManifestButton dataManifest={checkedManifest} resetCabangTujuan={resetCabangTujuan} />
      </div>
    </div>
  );
};

export default ReceiveManifestTable;
