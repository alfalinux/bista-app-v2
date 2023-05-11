import generateDate from "@/helpers/generateDate";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReceiveSuratJalanButton from "./ReceiveSuratJalanButton";

const ReceiveSuratJalanTable = ({ dataSuratJalan, resetCabangTujuan }) => {
  const [checkedSuratJalan, setCheckedSuratJalan] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const checkbox = document.querySelectorAll("#checkbox");

  const checkedHandler = (checked, checkedData) => {
    if (checked) {
      setCheckedSuratJalan((prevState) => [...prevState, checkedData]);
    } else {
      setCheckedSuratJalan((prevState) =>
        prevState.filter((d) => d.noSuratJalan !== checkedData.noSuratJalan)
      );
    }
  };

  const checkedAllHandler = () => {
    if (checkedAll) {
      setCheckedAll(false);
      setCheckedSuratJalan([]);
      for (let item of checkbox) {
        item.checked = false;
      }
    } else {
      setCheckedAll(true);
      setCheckedSuratJalan(dataSuratJalan);
      for (let item of checkbox) {
        item.checked = true;
      }
    }
  };

  useEffect(() => {
    if (checkedSuratJalan.length === dataSuratJalan.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkedSuratJalan]);

  useEffect(() => {
    setCheckedAll(false);
    setCheckedSuratJalan([]);
  }, [dataSuratJalan]);

  return (
    <div className="w-full mt-4 mb-4 bg-transparent">
      <table className="w-full table-auto shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
          <tr>
            <th className="p-2 border border-gray-300">No</th>
            <th className="p-2 border border-gray-300">No Surat Jalan</th>
            <th className="p-2 border border-gray-300">Asal</th>
            <th className="p-2 border border-gray-300">Tujuan</th>
            <th className="p-2 border border-gray-300">Tgl Berangkat</th>
            <th className="p-2 border border-gray-300">Driver / Vendor</th>
            <th className="p-2 border border-gray-300">Nopol / No AWB</th>
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
          {dataSuratJalan.map((data, index) => (
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
                {data.noSuratJalan}
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
                }`}
              >
                {generateDate(data.suratJalanCreatedAt)}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {data.namaDriver}
              </td>

              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {data.nopolDriver}
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
                  //   disabled={cabangTujuan ? false : true}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full mt-8 flex justify-end items-center">
        <ReceiveSuratJalanButton dataSuratJalan={checkedSuratJalan} resetCabangTujuan={resetCabangTujuan} />
      </div>
    </div>
  );
};

export default ReceiveSuratJalanTable;
