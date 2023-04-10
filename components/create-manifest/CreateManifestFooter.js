import { CubeIcon, DocumentDuplicateIcon, ScaleIcon } from "@heroicons/react/24/outline";
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
          <p>{checkedResi.length} Resi</p>
        </div>
        <div className="flex items-center gap-1">
          <ScaleIcon className="h-5" />
          <p>{checkedResi.reduce((acc, total) => acc + total.beratPaketDikenakan, 0)} Kg</p>
        </div>
        <div className="flex items-center gap-1">
          <CubeIcon className="h-5" />
          <p>{checkedResi.reduce((acc, total) => acc + total.paket.length, 0)} Koli</p>
        </div>
      </div>
      {/* <div className="flex items-center gap-1">
        <label htmlFor="konsolidasi">Konsolidasi</label>
        <input
          type="number"
          id="konsolidasi"
          name="konsolidasi"
          value={konsolidasi}
          placeholder="Jumlah konsol..."
          className="bg-transparent border-[1px] border-gray-200 rounded-lg px-2 py-1 w-32"
          onChange={(e) => setKonsolidasi(e.target.value)}
        />
      </div> */}
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
