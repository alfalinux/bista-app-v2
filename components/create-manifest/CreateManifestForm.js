import { useState } from "react";
import CabangSelect from "./CabangSelect";
import CreateManifestTable from "./CreateManifestTable";

const CreateManifestForm = ({ dataResi }) => {
  const [cabangCoveranSelected, setCabangCoveranSelected] = useState("");
  const [cabangTujuanSelected, setCabangTujuanSelected] = useState("");

  const cabangCoveran = dataResi.length > 0 ? [...new Set(dataResi.map((d) => d.tujuan.cov))] : null;
  const cabangTujuan = dataResi.length > 0 ? [...new Set(dataResi.map((d) => d.tujuan.ibukota))] : null;

  const coveranSelectedHandler = (e) => setCabangCoveranSelected(e);
  const tujuanSelectedHandler = (e) => setCabangTujuanSelected(e);

  return (
    <div className="w-full lg:overflow-hidden px-4">
      <CabangSelect
        coveran={cabangCoveran}
        tujuan={cabangTujuan}
        coveranSelected={coveranSelectedHandler}
        tujuanSelected={tujuanSelectedHandler}
      />
      <CreateManifestTable
        dataResi={dataResi}
        coveran={cabangCoveranSelected}
        tujuan={cabangTujuanSelected}
      />
    </div>
  );
};

export default CreateManifestForm;
