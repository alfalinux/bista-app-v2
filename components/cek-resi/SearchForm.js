import { CheckBadgeIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { validasiNoResi } from "../utils/use-validate";
import LoadingSpinner from "../utils/LoadingSpinner";

const SearchForm = ({ dataResi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [validateNoResi, setvalidateNoResi] = useState({ isValid: false, message: "tidak boleh kosong!" });
  const [inputedNoResi, setInputedNoResi] = useState("");

  const router = useRouter();

  const noResiChangeHandler = (e) => {
    setInputedNoResi(e.target.value.toUpperCase());
    setvalidateNoResi(validasiNoResi(e.target.value.toUpperCase()));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/monitoring/cek-resi?noResi=${inputedNoResi}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [dataResi]);

  return (
    <form
      className="w-full flex flex-col gap-2 sm:flex-row sm:flex-wrap items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border-[1px] border-gray-300 dark:border-gray-400"
      onSubmit={submitHandler}
    >
      <div className="w-full flex flex-col gap-2 sm:flex-row">
        <div className="w-full flex items-center relative">
          <input
            type="text"
            placeholder="Ketik Nomor Resi..."
            className={`w-full p-2 text-sm bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md uppercase ${
              isTouched && !validateNoResi.isValid
                ? "bg-red-100 dark:bg-red-800"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
            onBlur={() => setIsTouched(true)}
            onChange={noResiChangeHandler}
            value={inputedNoResi}
          />
          {isTouched && validateNoResi.isValid && dataResi.status == "201" ? (
            <CheckBadgeIcon className="h-6 text-sky-600 absolute right-1" />
          ) : isTouched && validateNoResi.isValid && dataResi.status != "201" ? (
            <XCircleIcon className="h-6 text-red-600 absolute right-1" />
          ) : null}
        </div>

        {isLoading ? (
          <div className="w-full sm:w-36  flex items-center justify-center">
            <LoadingSpinner size="md" color="gray" />
          </div>
        ) : (
          <button
            className={` w-full sm:w-36 items-center justify-center gap-1 font-semibold text-sm text-gray-100 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-900 dark:disabled:text-gray-700 ${
              isTouched && !validateNoResi.isValid ? "hidden sm:flex" : "flex"
            }`}
            disabled={!validateNoResi.isValid}
          >
            <MagnifyingGlassIcon className="h-5" />
            <p>Cek Resi</p>
          </button>
        )}
      </div>
      {isTouched && !validateNoResi.isValid ? (
        <p className="w-full text-xs text-left text-red-600 capitalize">{validateNoResi.message}</p>
      ) : null}
    </form>
  );
};

export default SearchForm;
