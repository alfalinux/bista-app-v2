import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import ReceiveSuratJalanTable from "./ReceiveSuratJalanTable";

const ReceiveSuratJalanForm = ({ dataSuratJalan }) => {
  const [cabangTujuan, setCabangTujuan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const cabangTujuanChange = (e) => {
    setIsLoading(true);
    setCabangTujuan(e.target.value);
    router.replace(`${router.pathname}?cabangTujuan=${e.target.value}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [dataSuratJalan]);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div className="w-full p-4 bg-white dark:bg-gray-800  flex flex-col sm:flex-row gap-2 items-start sm:items-center border-[1px] border-gray-300 shadow-md rounded-lg whitespace-nowrap">
        <label htmlFor="cabangTujuan" className="w-80 text-sm text-gray-800 dark:text-gray-200">
          Cabang Tujuan
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
          name="cabangTujuan"
          id="cabangTujuan"
          value={cabangTujuan}
          onChange={cabangTujuanChange}
        >
          {data.posisiDesc === "direktur" ? (
            <>
              <option value="">-- Pilih cabang asal --</option>
              {listCabang().map((data, index) => (
                <option key={index} value={data.cab} className="capitalize">
                  {data.cab}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value="">-- Pilih cabang asal --</option>
              <option value={data.cabangDesc} className="capitalize">
                {data.cabangDesc}
              </option>
            </>
          )}
        </select>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <LoadingSpinner size="md" color="gray" />
        </div>
      ) : null}

      {isLoading ? null : router.query.cabangTujuan === undefined ? null : !router.query.cabangTujuan ? (
        <p className="w-full p-4 text-sm text-red-600 text-center">Cabang tujuan belum dipilih...</p>
      ) : dataSuratJalan.length > 0 ? (
        <ReceiveSuratJalanTable
          dataSuratJalan={dataSuratJalan}
          resetCabangTujuan={() => setCabangTujuan("")}
        />
      ) : (
        <p className="w-full p-4 text-sm text-red-600 text-center">Data tidak ditemukan...</p>
      )}
    </div>
  );
};

export default ReceiveSuratJalanForm;
