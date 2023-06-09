import listCabang from "@/helpers/listCabang";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";

const SelectionForm = ({ isLoading, setIsLoading }) => {
  const { data } = useSession();
  const router = useRouter();
  const [cabang, setCabang] = useState("");
  const [tglTransaksi, setTglTransaksi] = useState("");
  const listCabangAsal = listCabang();

  const cabangChangeHandler = (e) => {
    setCabang(e.target.value);
  };

  const tglTransaksiChangeHandler = (e) => {
    setTglTransaksi(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/monitoring/transaksi-harian?cabang=${cabang}&tglTransaksi=${tglTransaksi}`);
  };

  return (
    <form
      className="w-full p-4 bg-white dark:bg-gray-800 flex flex-col gap-4 border-[1px] border-gray-300 shadow-md rounded-lg"
      onSubmit={submitHandler}
    >
      <div className="w-full flex gap-2 items-center">
        <label className="w-52 text-sm text-gray-800 dark:text-gray-200" htmlFor="cabang">
          Cabang
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md"
          name="cabang"
          id="cabang"
          value={cabang}
          onChange={cabangChangeHandler}
        >
          {data.posisiDesc === "direktur" ? (
            <>
              <option value="">-- Pilih Cabang --</option>
              {listCabangAsal.map((data, index) => (
                <option key={index} value={data.cab}>
                  {data.cab.toUpperCase()}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value="">-- Pilih Cabang --</option>
              <option value={data.cabangDesc}>{data.cabangDesc.toUpperCase()}</option>
            </>
          )}
        </select>
      </div>
      <div className="w-full flex gap-2 items-center">
        <label className="w-52 text-sm text-gray-800 dark:text-gray-200" htmlFor="tgl">
          Tanggal Transaksi
        </label>
        <input
          className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md"
          type="date"
          value={tglTransaksi}
          onChange={tglTransaksiChangeHandler}
        />
      </div>
      <div className="w-full">
        {isLoading ? (
          <div className="w-full flex justify-end items-center px-2 pt-2 pb-1">
            <LoadingSpinner size="md" color="gray" />
          </div>
        ) : (
          <button
            className="ml-auto bg-red-600 hover:bg-red-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 font-semibold text-sm text-center text-white disabled:text-gray-400 dark:disabled:text-gray-800 p-2 rounded-md flex items-center justify-center gap-1 disabled:cursor-not-allowed"
            disabled={!cabang || !tglTransaksi}
          >
            <ArrowDownCircleIcon className="h-5" />
            <p>Tampilkan Data</p>
          </button>
        )}
      </div>
    </form>
  );
};

export default SelectionForm;
