import {
  CubeIcon,
  DocumentDuplicateIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Swal from "sweetalert2";

const CreateManifestModal = ({ onCloseModal, dataResi, cabangAsal, tujuan }) => {
  const [isKonsol, setIsKonsol] = useState(false);
  const [konsolidasi, setKonsolidasi] = useState(1);

  const isKonsolSelectHandler = (e) => {
    setIsKonsol(e.target.value);
  };

  const konsolidasiChangeHandler = (e) => {
    setKonsolidasi(e.target.value);
  };

  const prosesButtonHandler = () => {
    onCloseModal();
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Manifest telah dicreate!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="w-full h-[100dvh] fixed top-0 left-0 flex items-center justify-center">
      <div className="w-full h-[100dvh] bg-black/50 z-10" onClick={onCloseModal}></div>
      <div
        className={`w-[90%] h-fit sm:w-96 px-2 py-6 gap-2 flex flex-col items-center justify-center absolute bg-white rounded-lg shadow-md z-20`}
      >
        <QuestionMarkCircleIcon className="h-20 text-red-200" />
        <h2 className="text-2xl font-semibold capitalize text-gray-600">
          {cabangAsal} - {tujuan}
        </h2>
        <div className="flex gap-2 text-gray-600 text-base">
          <div className="flex items-center gap-1">
            <DocumentDuplicateIcon className="h-5" />
            <p>{dataResi.length} Resi</p>
          </div>
          <div className="flex items-center gap-1">
            <ScaleIcon className="h-5" />
            <p>{dataResi.reduce((acc, total) => acc + total.beratPaketDikenakan, 0)} Kg</p>
          </div>
          <div className="flex items-center gap-1">
            <CubeIcon className="h-5" />
            <p>{dataResi.reduce((acc, total) => acc + total.paket.length, 0)} Koli</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center text-gray-600">
          <label htmlFor="isKonsol" className="text-base">
            Konsolidasi Paket?
          </label>
          <select name="isKonsol" id="isKonsol" className="p-2" onChange={isKonsolSelectHandler}>
            <option value="false">Tidak</option>
            <option value="true">Ya</option>
          </select>
        </div>
        {isKonsol == "true" ? (
          <div className="flex gap-2 items-center justify-center py-2 w-44 rounded-md border-2 border-blue-200">
            <input
              type="number"
              id="konsolidasi"
              value={konsolidasi}
              onChange={konsolidasiChangeHandler}
              className="w-10 bg-transparent text-gray-600 font-semibold text-base text-right focus:outline-none"
            />
            <label htmlFor="konsolidasi" className="w-10 text-gray-600">
              Koli
            </label>
          </div>
        ) : null}

        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <button
            className="bg-blue-500 text-white text-base w-24 py-2 rounded-md"
            onClick={prosesButtonHandler}
          >
            Proses
          </button>
          <button className="bg-gray-500 text-white text-base w-24 py-2 rounded-md" onClick={onCloseModal}>
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateManifestModal;
