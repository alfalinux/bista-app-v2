import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CreateDeliveryButton from "./CreateDeliveryButton";

const CreateDeliveryTable = ({ dataResi, dataKurir, onResetInput }) => {
  const [listDataResi, setListDataResi] = useState(dataResi);
  const [checkedResi, setCheckedResi] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const checkbox = document.querySelectorAll("#checkbox");

  const checkedResiHandler = (checked, data) => {
    if (checked) {
      setCheckedResi((prevState) => [...prevState, data]);
    } else {
      setCheckedResi((prevState) => prevState.filter((d) => d.noResi !== data.noResi));
    }
  };

  const checkedAllHandler = () => {
    if (checkedAll) {
      setCheckedAll(false);
      setCheckedResi([]);
      for (let item of checkbox) {
        item.checked = false;
      }
    } else {
      setCheckedAll(true);
      setCheckedResi(listDataResi);
      for (let item of checkbox) {
        item.checked = true;
      }
    }
  };

  useEffect(() => {
    if (checkedResi.length === listDataResi.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkedResi]);

  useEffect(() => {
    setCheckedAll(false);
    setCheckedResi([]);
  }, [listDataResi]);

  return (
    <div className="w-full mt-4 mb-4 bg-transparent">
      <table className="w-full table-auto shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300">
          <tr>
            <th className="p-2 border border-gray-300">No</th>
            <th className="p-2 border border-gray-300">No Resi</th>
            <th className="p-2 border border-gray-300">Asal</th>
            <th className="p-2 border border-gray-300">Kota Tujuan</th>
            <th className="p-2 border border-gray-300">Kecamatan Tujuan</th>
            <th className="p-2 border border-gray-300">Jlh Paket</th>
            <th className="p-2 border border-gray-300">Berat Paket</th>
            <th className="p-2 flex flex-wrap items-center justify-center gap-1">
              <p>Pilih</p>
              <ClipboardDocumentCheckIcon
                className="h-5 hover:animate-pulse hover:text-red-600 cursor-pointer"
                onClick={checkedAllHandler}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {listDataResi.map((data, index) => (
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
                } uppercase`}
              >
                {data.cabangAsal}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                } uppercase`}
              >
                {data.tujuan.ibukota}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {data.tujuan.kec}
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {data.paket.length} Koli
              </td>

              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                {data.paket
                  .map((d) => d.beratDikenakan)
                  .reduce((acc, val) => acc + Number(val), 0)
                  .toLocaleString("id-ID", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}{" "}
                Kg
              </td>
              <td
                className={`text-gray-900 dark:text-gray-200 text-sm text-center whitespace-nowrap border border-gray-300 px-2 py-1 ${
                  (index + 1) % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : "bg-white dark:bg-gray-500"
                }`}
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={(e) => checkedResiHandler(e.target.checked, data)}
                  className="hover:cursor-pointer"
                  disabled={!dataKurir}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full mt-8 flex justify-end items-center">
        <CreateDeliveryButton dataResi={checkedResi} dataKurir={dataKurir} onResetInput={onResetInput} />
      </div>
    </div>
  );
};

export default CreateDeliveryTable;
