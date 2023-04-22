import { ArchiveBoxIcon, CubeIcon, DocumentDuplicateIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CreateManifestModal from "./CreateManifestModal";

const CreateManifestFooter = ({ cabangAsal, tujuan, checkedResi }) => {
  const [konsolidasi, setKonsolidasi] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  useEffect(() => {
    setKonsolidasi(checkedResi.reduce((acc, total) => acc + total.paket.length, 0));
  }, [checkedResi]);

  return (
    <div className="w-full rounded-lg shadow-md bg-gray-900 text-gray-100 text-sm flex flex-col gap-y-4 items-center justify-between p-4 lg:flex-row">
      <p>{cabangAsal.toUpperCase() + " - " + tujuan.toUpperCase()}</p>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <DocumentDuplicateIcon className="h-5" />
          <p>{checkedResi.length.toLocaleString("id-ID")} Resi</p>
        </div>
        <div className="flex items-center gap-1">
          <CubeIcon className="h-5" />
          <p>
            {checkedResi.reduce((acc, total) => acc + total.paket.length, 0).toLocaleString("id-ID")} Koli
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ScaleIcon className="h-5" />
          <p>
            {checkedResi
              .map((d) => d.paket.map((d) => d.beratAktual).reduce((total, obj) => total + Number(obj), 0))
              .reduce((total, obj) => total + Number(obj), 0)
              .toLocaleString("id-ID", { maximumFractionDigits: 3 })}{" "}
            Kg
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ArchiveBoxIcon className="h-5" />
          <p>
            {checkedResi
              .map((d) =>
                d.paket
                  .map((d) => d.volume)
                  .map((d) => (Number(d.panjang) * Number(d.lebar) * Number(d.tinggi)) / 1000000)
                  .reduce((total, obj) => total + Number(obj), 0)
              )
              .reduce((total, obj) => total + Number(obj), 0)
              .toLocaleString("id-Id", { maximumFractionDigits: 3, minimumFractionDigits: 3 })}{" "}
            CbM
          </p>
        </div>
      </div>
      <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700" onClick={showModalHandler}>
        Create Manifest
      </button>
      {showModal ? (
        <CreateManifestModal
          onCloseModal={hideModalHandler}
          dataResi={checkedResi}
          cabangAsal={cabangAsal}
          tujuan={tujuan}
        />
      ) : null}
    </div>
  );
};

export default CreateManifestFooter;
