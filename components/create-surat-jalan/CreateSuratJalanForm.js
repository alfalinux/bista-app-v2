import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { validasiSpecialChar } from "../utils/use-validate";

const CreateSuratJalanForm = ({ setInitValues, dataManifest, onLoading }) => {
  const { data } = useSession();
  const router = useRouter();
  const [cabangAsal, setCabangAsal] = useState("");
  const [cabangTujuan, setCabangTujuan] = useState("");
  const [namaDriver, setNamaDriver] = useState("");
  const [nopolDriver, setNopolDriver] = useState("");
  const [validasi, setValidasi] = useState({
    namaDriver: { isValid: false, message: "wajib diisi / tidak boleh kosong" },
    nopolDriver: { isValid: false, message: "wajib diisi / tidak boleh kosong" },
  });
  const [isTouched, setIsTouched] = useState({ namaDriver: false, nopolDriver: false });

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
    setNamaDriver(e.target.value);
    setInitValues((prevState) => ({
      ...prevState,
      namaDriver: validasiSpecialChar(e.target.value, 30).isValid ? e.target.value : "",
    }));
    setValidasi((prevState) => ({ ...prevState, namaDriver: validasiSpecialChar(e.target.value, 30) }));
  };
  const nopolDriverChange = (e) => {
    setNopolDriver(e.target.value);
    setInitValues((prevState) => ({
      ...prevState,
      nopolDriver: validasiSpecialChar(e.target.value, 30).isValid ? e.target.value : "",
    }));
    setValidasi((prevState) => ({ ...prevState, nopolDriver: validasiSpecialChar(e.target.value, 30) }));
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
      <div>
        <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <label className="w-80 text-sm text-gray-800 dark:text-gray-200" htmlFor="namaDriver">
            Nama Driver / Vendor
          </label>
          <input
            type="text"
            className={`w-full p-2 text-sm text-gray-800 dark:text-gray-200 rounded-md ${
              isTouched.namaDriver && !validasi.namaDriver.isValid
                ? "bg-red-800 dark:bg-red-800"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
            name="namaDriver"
            id="namaDriver"
            value={namaDriver}
            onChange={namaDriverChange}
            onBlur={() => {
              setIsTouched((prevState) => ({ ...prevState, namaDriver: true }));
            }}
            placeholder="Ketik nama driver / vendor..."
            autoComplete="off"
          />
        </div>
        {isTouched.namaDriver ? (
          <div className="w-full flex-row sm:flex">
            <section className="w-80 text-sm text-gray-800 dark:text-gray-200"></section>
            <section className="w-full px-2 text-[10px] text-red-600">
              {validasi.namaDriver.isValid ? "" : "* " + validasi.namaDriver.message}
            </section>
          </div>
        ) : null}
      </div>

      {/* Input Nopol Driver */}
      <div>
        <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <label className="w-80 text-sm text-gray-800 dark:text-gray-200" htmlFor="nopolDriver">
            Nopol Driver / No AWB Vendor
          </label>
          <input
            type="text"
            className={`w-full p-2 text-sm text-gray-800 dark:text-gray-200 rounded-md ${
              isTouched.nopolDriver && !validasi.nopolDriver.isValid
                ? "bg-red-800 dark:bg-red-800"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
            name="nopolDriver"
            id="nopolDriver"
            value={nopolDriver}
            onChange={nopolDriverChange}
            onBlur={() => {
              setIsTouched((prevState) => ({ ...prevState, nopolDriver: true }));
            }}
            placeholder="Ketik nopol driver / no awb vendor..."
            autoComplete="off"
          />
        </div>
        {isTouched.nopolDriver ? (
          <div className="w-full flex-row sm:flex">
            <section className="w-80 text-sm text-gray-800 dark:text-gray-200"></section>
            <section className="w-full px-2 text-[10px] text-red-600">
              {validasi.nopolDriver.isValid ? "" : "* " + validasi.nopolDriver.message}
            </section>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default CreateSuratJalanForm;
