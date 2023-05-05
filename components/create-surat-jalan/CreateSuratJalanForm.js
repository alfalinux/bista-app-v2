import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const removeNonAlphaChar = (val) => val.replace(/[^0-9a-zA-Z\s@'_,.:&\/()\-]/g, "");

const CreateSuratJalanForm = ({ initValues, setInitValues, dataManifest, onLoading }) => {
  const { data } = useSession();
  const router = useRouter();
  const [cabangAsal, setCabangAsal] = useState("");
  const [cabangTujuan, setCabangTujuan] = useState("");
  const [namaDriver, setNamaDriver] = useState("");
  const [nopolDriver, setNopolDriver] = useState("");

  const cabangAsalChange = (e) => {
    onLoading(true);
    router.replace(`${router.pathname}?cabangAsal=${e.target.value}`);
    setCabangAsal(e.target.value);
    setCabangTujuan("");
    setNamaDriver("");
    setNopolDriver("");
    setInitValues((prevState) => ({
      ...prevState,
      cabangAsal: e.target.value,
      cabangTujuan: "",
      namaDriver: "",
      nopolDriver: "",
    }));
  };

  const cabangTujuanChange = (e) => {
    setCabangTujuan(e.target.value);
    setNamaDriver("");
    setNopolDriver("");
    setInitValues((prevState) => ({
      ...prevState,
      cabangTujuan: e.target.value,
      namaDriver: "",
      nopolDriver: "",
    }));
  };
  const namaDriverChange = (e) => {
    setNamaDriver(removeNonAlphaChar(e.target.value));
    setInitValues((prevState) => ({
      ...prevState,
      namaDriver: e.target.value,
    }));
  };
  const nopolDriverChange = (e) => {
    setNopolDriver(removeNonAlphaChar(e.target.value));
    setInitValues((prevState) => ({
      ...prevState,
      nopolDriver: e.target.value,
    }));
  };

  useEffect(() => {
    if (!router.query.cabangAsal) {
      setCabangAsal("");
    }
  }, [router]);

  return (
    <form className="w-full p-4 bg-white dark:bg-gray-800 flex flex-col gap-4 border-[1px] border-gray-300 shadow-md rounded-lg whitespace-nowrap">
      {/* Select Cabang Asal */}
      <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <label className="w-80 text-sm text-gray-800 dark:text-gray-200" htmlFor="cabangAsal">
          Cabang Asal
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
          name="cabangAsal"
          id="cabangAsal"
          value={cabangAsal}
          onChange={cabangAsalChange}
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

      {/* Select Cabang Tujuan */}
      <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <label className="w-80 text-sm text-gray-800 dark:text-gray-200" htmlFor="cabangTujuan">
          Cabang Coveran
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
          name="cabangTujuan"
          id="cabangTujuan"
          value={cabangTujuan}
          onChange={cabangTujuanChange}
        >
          <option value="">-- Pilih cabang coveran --</option>
          {dataManifest.length > 0 ? (
            [...new Set(dataManifest.map((d) => d.coveranArea))].map((data, index) => (
              <option key={index} value={data} className="capitalize">
                {data}
              </option>
            ))
          ) : (
            <option value="">Data tidak ditemukan</option>
          )}
        </select>
      </div>

      {/* Input Nama Driver */}
      <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <label className="w-80 text-sm text-gray-800 dark:text-gray-200" htmlFor="namaDriver">
          Nama Driver / Vendor
        </label>
        <input
          type="text"
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-md"
          name="namaDriver"
          id="namaDriver"
          value={namaDriver}
          onChange={namaDriverChange}
          placeholder="Ketik nama driver / vendor..."
          autoComplete="off"
        />
      </div>

      {/* Input Nopol Driver */}
      <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <label className="w-80 text-sm text-gray-800 dark:text-gray-200" htmlFor="nopolDriver">
          Nopol Driver / No AWB Vendor
        </label>
        <input
          type="text"
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-md"
          name="nopolDriver"
          id="nopolDriver"
          value={nopolDriver}
          onChange={nopolDriverChange}
          placeholder="Ketik nopol driver / no awb vendor..."
          autoComplete="off"
        />
      </div>
    </form>
  );
};

export default CreateSuratJalanForm;
