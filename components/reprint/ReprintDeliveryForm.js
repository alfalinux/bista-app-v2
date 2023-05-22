import generateDate from "@/helpers/generateDate";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import generatePdfDelivery from "@/helpers/generatePdfDelivery";

const ReprintDeliveryForm = (props) => {
  const [data, setData] = useState();
  const [dataDelivery, setDataDelivery] = useState();
  const router = useRouter();
  const [inputNoDelivery, setInputNoDelivery] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const removeNonNumChar = (val) => val.replace(/[^0-9a-zA-Z]/, "");

  const blurHandler = () => {
    setIsTouched(true);
  };

  const changeHandler = (e) => {
    setInputNoDelivery(removeNonNumChar(e.target.value));
    e.target.value.length >= 21 && e.target.value.length <= 22 ? setIsValid(true) : setIsValid(false);
  };

  const cariDeliveryHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`${router.pathname}?noDelivery=${inputNoDelivery}`);
  };

  useEffect(() => {
    setData(props.dataDelivery);
    if (props.dataDelivery.status == "201") {
      setDataDelivery(
        props.dataDelivery.result[0].delivery.filter((d) => d.noDelivery === router.query.noDelivery)[0]
      );
    } else {
      setDataDelivery({
        noDelivery: "",
        dataKurir: {},
        deliveryCreatedAt: "",
        deliveryCreatedBy: "",
        deliveryStatus: {},
      });
    }
    setIsLoading(false);
  }, [router.query]);

  return (
    <div className="w-full px-4 ">
      <form
        type="submit"
        onSubmit={cariDeliveryHandler}
        className="w-full p-4 bg-white dark:bg-gray-900 outline-none rounded-md shadow-md flex items-center gap-4 "
      >
        <input
          type="text"
          id="reprintDelivery"
          name="reprintDelivery"
          onChange={changeHandler}
          onBlur={blurHandler}
          value={inputNoDelivery}
          className={`w-full h-12 p-2 text-sm text-gray-700 dark:text-gray-400 font-semibold rounded-md border outline-none focus:ring-2 focus:border-transparent ${
            !isValid && isTouched
              ? "bg-red-100 dark:bg-red-800 ring-red-600 dark:ring-red-600 border-red-600 dark:border-red-600"
              : "bg-white dark:bg-gray-800 ring-gray-700 dark:ring-gray-400 border-gray-300 dark:border-gray-800"
          }`}
          autoComplete="off"
          spellCheck={false}
          placeholder="Ketik nomor delivery..."
        />
        <button
          className={`w-fit sm:w-40 h-12 bg-red-600 hover:bg-red-700 px-2 flex items-center justify-center rounded-md text-sm font-semibold text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
          disabled={!isValid}
        >
          <MagnifyingGlassIcon className="h-6" />
          <p className="hidden sm:block"> Temukan</p>
        </button>
      </form>

      {!isValid && isTouched ? (
        <p className="text-red-600 text-xs mt-2">* Nomor delivery tidak valid</p>
      ) : null}

      {isLoading ? (
        <div className="w-full flex items-center justify-center p-4">
          <LoadingSpinner color="gray" />
        </div>
      ) : null}
      {!isLoading && isValid && data.status == "201" ? (
        <div className="w-full overflow-hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-full flex flex-col items-start justify-center">
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Nomor Delivery
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {dataDelivery.noDelivery}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Tgl Delivery
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2">
                {generateDate(dataDelivery.deliveryCreatedAt)}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900">
                Nama Kurir
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2 capitalize">
                {dataDelivery.dataKurir.nama}
              </p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900 ">
                Cabang
              </h3>
              <p className="w-2/3 text-sm text-gray-800 dark:text-gray-200 text-left p-2 capitalize">
                {dataDelivery.dataKurir.cabangDesc}
              </p>
            </div>

            <div className="w-full h-36 sm:h-14 flex items-center">
              <h3 className="w-1/3 h-full font-semibold whitespace-nowrap text-sm text-gray-200 text-right p-2 bg-gray-800 dark:bg-gray-900"></h3>
              <div className="w-2/3 h-full p-2 flex flex-col sm:flex-row gap-2 justify-start">
                <button
                  className="p-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  onClick={() => generatePdfDelivery({ delivery: dataDelivery, dataResi: data.result })}
                >
                  Reprint Delivery Report
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : !isLoading && isValid && router.query.noDelivery ? (
        <p className="mt-2 text-xs text-red-600">* {data.message}</p>
      ) : null}
    </div>
  );
};

export default ReprintDeliveryForm;
