import generatePdfLabel from "@/helpers/generatePdfLabel";
import generatePdfResi from "@/helpers/generatePdfResi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ReprintResiForm = (props) => {
  const router = useRouter();
  const [inputNoResi, setInputNoResi] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

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
    router.push(`${router.pathname}?noResi=${inputNoResi}`);
  };

  return (
    <div className="w-full px-4 ">
      <form
        type="submit"
        onSubmit={cariResiHandler}
        className="w-full p-4 bg-white rounded-md shadow-md flex items-center gap-4 "
      >
        <input
          type="text"
          id="reprintResi"
          name="reprintResi"
          onChange={changeHandler}
          onBlur={blurHandler}
          value={inputNoResi}
          className="w-full h-12 px-2 rounded-md border-[1px] focus:outline-transparent focus:ring focus:ring-zinc-500 text-sm font-semibold text-gray-500"
          autoComplete="off"
          spellCheck={false}
          placeholder="Ketik nomor resi..."
        />
        <button
          className={`w-fit sm:w-40 h-12 bg-red-500 px-2 flex items-center justify-center rounded-md text-sm font-semibold text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
          disabled={!isValid}
        >
          <MagnifyingGlassIcon className="h-6" />
          <p className="hidden sm:block">Cari Resi</p>
        </button>
      </form>

      {!isValid && isTouched ? (
        <p className="text-red-500 text-xs mt-2">* Ketik nomor resi yang valid</p>
      ) : null}

      {props.dataResi.noResi ? (
        <div className="w-full overflow-hidden mt-4 bg-white rounded-lg shadow-md">
          <div className="w-full flex flex-col items-start justify-center">
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-100 text-right p-2 bg-gray-800 ">
                Nomor Resi
              </h3>
              <p className="w-2/3 text-sm text-gray-800 text-left p-2">{props.dataResi.noResi}</p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-100 text-right p-2 bg-gray-800 ">
                Tgl Transaksi
              </h3>
              <p className="w-2/3 text-sm text-gray-800 text-left p-2">{props.dataResi.tglTransaksi}</p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-100 text-right p-2 bg-gray-800 ">
                Nama Pengirim
              </h3>
              <p className="w-2/3 text-sm text-gray-800 text-left p-2">{props.dataResi.namaPengirim}</p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-100 text-right p-2 bg-gray-800 ">
                Nama Penerima
              </h3>
              <p className="w-2/3 text-sm text-gray-800 text-left p-2">{props.dataResi.namaPenerima}</p>
            </div>
            <div className="w-full flex justify-start">
              <h3 className="w-1/3 font-semibold whitespace-nowrap text-sm text-gray-100 text-right p-2 bg-gray-800 ">
                Tujuan
              </h3>
              <p className="w-2/3 text-sm text-gray-800 text-left p-2">{props.dataResi.tujuan}</p>
            </div>
            <div className="w-full h-36 sm:h-14 flex items-center">
              <h3 className="w-1/3 h-full font-semibold whitespace-nowrap text-sm text-gray-100 text-right p-2 bg-gray-800">
                Actions
              </h3>
              <div className="w-2/3 h-full p-2 flex flex-col sm:flex-row gap-2 justify-start">
                <button
                  className="p-2 text-sm text-white bg-blue-500 rounded-md"
                  onClick={() => generatePdfResi(props.dataResi.data)}
                >
                  Reprint Resi
                </button>
                <button
                  className="p-2 text-sm text-white bg-green-500 rounded-md"
                  onClick={() => generatePdfLabel(props.dataResi.data)}
                >
                  Reprint Label
                </button>
                <button className="p-2 text-sm text-white bg-orange-500 rounded-md">Reprint Struk</button>
              </div>
            </div>
          </div>
        </div>
      ) : router.query.noResi ? (
        <p className="mt-2 text-xs text-red-500">* {props.dataResi.data.message}</p>
      ) : null}
    </div>
  );
};

export default ReprintResiForm;

{
  /* <table className="table-fixed border-collapse w-full">
            <thead>
              <tr className="text-center text-sm font-semibold whitespace-nowrap bg-gray-200">
                <th className="py-2 px-4 w-52">Nomor Resi</th>
                <th className="py-2 px-4">Tgl Transaksi</th>
                <th className="py-2 px-4">Nama Pengirim</th>
                <th className="py-2 px-4">Nama Penerima</th>
                <th className="py-2 px-4">Tujuan</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-sm">
                <td className="border py-2 px-4 whitespace-nowrap">{props.dataResi.noResi}</td>
                <td className="border py-2 px-4">{generateDate(props.dataResi.tglTransaksi)}</td>
                <td className="border py-2 px-4">Wandi</td>
                <td className="border py-2 px-4">Prawira</td>
                <td className="border py-2 px-4">Cengkareng - Jakarta Pusat - DKI Jakarta</td>
                <td className="border py-2 px-4 flex flex-col justify-center gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded">
                    Create
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table> */
}
