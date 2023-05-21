import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CreateDeliveryTable from "./CreateDeliveryTable";
import LoadingSpinner from "../utils/LoadingSpinner";

const CreateDeliveryForm = ({ dataResi, dataKurir }) => {
  const { data } = useSession();
  const router = useRouter();
  const [cabang, setCabang] = useState("");
  const [namaKurir, setNamaKurir] = useState("");
  const [dataKurirSelected, setDataKurirSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const cabangChangeHandler = (e) => {
    setIsLoading(true);
    setCabang(e.target.value);
    router.push(`/delivery/create-delivery?cabang=${e.target.value}`);
  };

  const namaKurirChangeHandler = (e) => {
    setNamaKurir(e.target.value);
    if (e.target.value === "") {
      setDataKurirSelected({});
    } else {
      setDataKurirSelected(dataKurir.result.filter((d) => d.email === e.target.value)[0]);
    }
  };

  const resetInput = () => {
    setCabang("");
    setNamaKurir("");
    setDataKurirSelected({});
  };

  useEffect(() => {
    setIsLoading(false);
  }, [dataResi]);

  return (
    <div className="w-full p-4 text-sm flex flex-col gap-2 items-center">
      <form className="w-full p-4 bg-white dark:bg-gray-800  flex flex-col gap-2 items-start border-[1px] border-gray-300 shadow-md rounded-lg">
        <section className="w-full flex gap-2 items-center">
          <label className="w-32 text-gray-800 dark:text-gray-200" htmlFor="cabang">
            Cabang
          </label>
          <select
            className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
            name="cabang"
            id="cabang"
            value={cabang}
            onChange={cabangChangeHandler}
          >
            {data.posisiDesc === "direktur" ? (
              <>
                <option value="">-- Pilih cabang --</option>
                {listCabang().map((data, index) => (
                  <option key={index} value={data.cab} className="capitalize">
                    {data.cab}
                  </option>
                ))}
              </>
            ) : (
              <>
                <option value="">-- Pilih cabang tujuan --</option>
                <option value={data.cabangDesc} className="capitalize">
                  {data.cabangDesc}
                </option>
              </>
            )}
          </select>
        </section>
        <section className="w-full flex gap-2 items-center">
          <label className="w-32 text-gray-800 dark:text-gray-200" htmlFor="namaKurir">
            Nama Kurir
          </label>
          <select
            className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
            name="namaKurir"
            id="namaKurir"
            value={namaKurir}
            onChange={namaKurirChangeHandler}
          >
            <option value="">-- Pilih Kurir --</option>
            {dataKurir.result.length > 0
              ? dataKurir.result.map((data, index) => (
                  <option key={index} value={data.email} className="">
                    {data.nama} - {data.posisi + data.cabang + data.id}
                  </option>
                ))
              : null}
          </select>
        </section>
      </form>
      {isLoading ? (
        <div className="w-full flex justify-center items-center mt-2">
          <LoadingSpinner size="md" color="gray" />
        </div>
      ) : null}

      {isLoading ? null : router.query.cabang === undefined ? null : !router.query.cabang ? (
        <p className="w-full p-4 text-sm text-red-600 text-center">Cabang belum dipilih...</p>
      ) : dataResi.result.length > 0 ? (
        <CreateDeliveryTable
          dataResi={dataResi.result}
          dataKurir={dataKurirSelected}
          onResetInput={resetInput}
        />
      ) : (
        <p className="w-full p-4 text-sm text-red-600 text-center">{dataResi.message}</p>
      )}
    </div>
  );
};

export default CreateDeliveryForm;
