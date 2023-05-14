import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const TableManifestTransit = ({ dataManifestTransit, initValues, setInitValues }) => {
  const [checkedManifest, setCheckedManifest] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const checkbox = document.querySelectorAll("#checkboxtransit");

  const checkedHandler = (checked, checkedData) => {
    if (checked) {
      setCheckedManifest((prevState) => [...prevState, checkedData]);
      setInitValues((prevState) => ({
        ...prevState,
        checkedManifest: [...prevState.checkedManifest, checkedData],
      }));
    } else {
      setCheckedManifest((prevState) => prevState.filter((d) => d.noManifest !== checkedData.noManifest));
      setInitValues((prevState) => ({
        ...prevState,
        checkedManifest: prevState.checkedManifest.filter((d) => d.noManifest !== checkedData.noManifest),
      }));
    }
  };

  const checkedAllHandler = () => {
    if (checkedAll) {
      setCheckedAll(false);
      setCheckedManifest([]);
      for (let item of checkbox) {
        item.checked = false;
      }
      setInitValues((prevState) => ({
        ...prevState,
        checkedManifest: prevState.checkedManifest.filter(
          (d) => !dataManifestTransit.map((d) => d.noManifest).includes(d.noManifest)
        ),
      }));
    } else {
      setCheckedAll(true);
      setCheckedManifest(dataManifestTransit);
      for (let item of checkbox) {
        item.checked = true;
      }
      setInitValues((prevState) => ({
        ...prevState,
        checkedManifest: [...prevState.checkedManifest, ...dataManifestTransit],
      }));
    }
  };

  useEffect(() => {
    if (initValues.checkedManifest.length === 0) {
      for (let item of checkbox) {
        item.checked = false;
      }
      setCheckedAll(false);
    } else if (checkedManifest.length === dataManifestTransit.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkedManifest, initValues.checkedManifest]);

  useEffect(() => {
    setCheckedAll(false);
    setCheckedManifest([]);
  }, [dataManifestTransit]);

  return (
    <div className="w-full">
      <h2 className="font-semibold text-gray-800 text-sm dark:text-gray-100">Manifest Transit</h2>
      {dataManifestTransit.length > 0 ? (
        <table className="w-full table-auto shadow-md">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
            <tr>
              <th className="p-2 border border-gray-300">No</th>
              <th className="p-2 border border-gray-300">No Manifest</th>
              <th className="p-2 border border-gray-300">Asal</th>
              <th className="p-2 border border-gray-300">Tujuan</th>
              <th className="p-2 border border-gray-300">Coveran</th>
              <th className="p-2 border border-gray-300 flex items-center justify-center gap-1">
                <p>Pilih</p>
                <ClipboardDocumentCheckIcon
                  className="h-5 hover:animate-pulse hover:text-red-600 cursor-pointer"
                  onClick={checkedAllHandler}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {dataManifestTransit.map((data, index) => (
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
                    id="checkboxtransit"
                    onChange={(e) => checkedHandler(e.target.checked, data)}
                    className="hover:cursor-pointer"
                    // disabled={cabangTujuan ? false : true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="w-full p-2 text-sm text-center text-red-600 dark:text-red-100 bg-red-100 dark:bg-red-800">
          Tidak ada data...
        </p>
      )}
    </div>
  );
};

export default TableManifestTransit;
