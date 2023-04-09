import { useState, useEffect } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import CabangSelect from "./CabangSelect";
import CreateManifestFooter from "./CreateManifestFooter";
import CreateManifestTable from "./CreateManifestTable";

const CreateManifestForm = ({ dataResi, cabangAsal }) => {
  const [cabangTujuanSelected, setCabangTujuanSelected] = useState("");
  const [checkedResi, setCheckedResi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkedResiHandler = (checked, data) => {
    if (checked) {
      setCheckedResi((prevState) => [...prevState, data]);
    } else {
      setCheckedResi((prevState) => prevState.filter((d) => d.noResi !== data.noResi));
    }
  };

  const checkedAllResiHandler = (data) => {
    setCheckedResi(data);
  };

  const resetCheckedResiHandler = () => setCheckedResi([]);

  useEffect(() => {
    setIsLoading(false);
  }, [dataResi]);

  const loadingSpinnerHandler = (bool) => {
    setIsLoading(bool);
  };

  const cabangTujuan = dataResi.length > 0 ? [...new Set(dataResi.map((d) => d.tujuan.ibukota))] : null;

  const tujuanSelectedHandler = (e) => setCabangTujuanSelected(e);

  console.log(checkedResi);
  return (
    <div className="w-full overflow-scroll lg:overflow-hidden px-4">
      <CabangSelect
        tujuan={cabangTujuan}
        onSelectedTujuan={tujuanSelectedHandler}
        isLoading={loadingSpinnerHandler}
        onResetCheckedResi={resetCheckedResiHandler}
      />

      {isLoading ? (
        <div className="w-full my-4 flex justify-center">
          <LoadingSpinner size="md" color="gray" />
        </div>
      ) : (
        <CreateManifestTable
          dataResi={dataResi}
          tujuan={cabangTujuanSelected}
          onCheckedResi={checkedResiHandler}
          onCheckedAllResi={checkedAllResiHandler}
        />
      )}

      {cabangAsal && cabangTujuanSelected && checkedResi.length > 0 ? (
        <CreateManifestFooter
          cabangAsal={cabangAsal}
          tujuan={cabangTujuanSelected}
          checkedResi={checkedResi}
        />
      ) : null}
    </div>
  );
};

export default CreateManifestForm;
