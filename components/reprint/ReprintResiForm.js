import generateDate from "@/helpers/generateDate";
import generatePdfLabel from "@/helpers/generatePdfLabel";
import generatePdfResi from "@/helpers/generatePdfResi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";

const ReprintResiForm = (props) => {
  const [data, setData] = useState(props.dataResi.data);
  const router = useRouter();
  const [inputNoResi, setInputNoResi] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const removeNonNumChar = (val) => val.replace(/[^0-9a-zA-Z]/, "");

  const blurHandler = () => {
    setIsTouched(true);
  };

  const changeHandler = (e) => {
    setInputNoResi(removeNonNumChar(e.target.value));
    e.target.value.length >= 18 && e.target.value.length <= 20 ? setIsValid(true) : setIsValid(false);
  };

  const cariResiHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`${router.pathname}?noResi=${inputNoResi}`);
  };

  useEffect(() => {
    setData(props.dataResi.data);
    setIsLoading(false);
  }, [router.query]);

  return (
    <div className="w-full px-4 ">
      <form
        type="submit"
        onSubmit={cariResiHandler}
        className="w-full p-4 bg-white dark:bg-gray-900 outline-none rounded-md shadow-md flex items-center gap-4 "
      >
        <input
          type="text"
          id="reprintResi"
          name="reprintResi"
          onChange={changeHandler}
          onBlur={blurHandler}
          value={inputNoResi}
          className={`w-full h-12 p-2 text-sm text-gray-700 dark:text-gray-400 font-semibold rounded-md border outline-none focus:ring-2 focus:border-transparent ${
            !isValid && isTouched
              ? "bg-red-100 dark:bg-red-800 ring-red-600 dark:ring-red-600 border-red-600 dark:border-red-600"
              : "bg-white dark:bg-gray-800 ring-gray-700 dark:ring-gray-400 border-gray-300 dark:border-gray-800"
          }`}
          autoComplete="off"
          spellCheck={false}
          placeholder="Ketik nomor resi..."
        />
        <button
          className={`w-fit sm:w-40 h-12 bg-red-600 hover:bg-red-700 px-2 flex items-center justify-center rounded-md text-sm font-semibold text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
          disabled={!isValid}
        >
          <MagnifyingGlassIcon className="h-6" />
          <p className="hidden sm:block">Cari Resi</p>
        </button>
      </form>

      {!isValid && isTouched ? (
        <p className="text-red-600 text-xs mt-2">* Ketik nomor resi yang valid</p>
      ) : null}

      {isLoading ? (
        <div className="w-full flex items-center justify-center p-4">
          <LoadingSpinner color="gray" />
        </div>
      ) : null}
      {!isLoading && isValid && data.result ? (
        <div className="w-full overflow-hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-full flex flex-col items-start justify-center">
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Nomor Resi
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {data.result.noResi}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Tgl Transaksi
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {generateDate(data.result.tglTransaksi)}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Nama Pengirim
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {data.result.namaPengirim}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Nama Penerima
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {data.result.namaPenerima}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Tujuan
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {data.result.tujuan.kec} - {data.result.tujuan.ibukota} - {data.result.tujuan.prov}
              </p>
            </div>
            <div className="w-full h-36 sm:h-14 flex items-center">
              <h3 className="w-1/3 h-full font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900">
                Actions
              </h3>
              <div className="w-2/3 h-full p-2 flex flex-col sm:flex-row gap-2 justify-start">
                <button
                  className="p-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  onClick={() => generatePdfResi(data.result)}
                >
                  Reprint Resi
                </button>
                <button
                  className="p-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md"
                  onClick={() => generatePdfLabel(data.result)}
                >
                  Reprint Label
                </button>
                <button className="p-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-md">
                  Reprint Struk
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : !isLoading && isValid && router.query.noResi ? (
        <p className="mt-2 text-xs text-red-600">* {data.message}</p>
      ) : null}
    </div>
  );
};

export default ReprintResiForm;
