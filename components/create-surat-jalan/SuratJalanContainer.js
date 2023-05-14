import { useEffect, useState } from "react";
import CreateSuratJalanButton from "./CreateSuratJalanButton";
import SuratJalanForm from "./SuratJalanForm";
import TableManifestOrigin from "./TableManifestOrigin";
import TableManifestTransit from "./TableManifestTransit";
import { useRouter } from "next/router";
import LoadingSpinner from "../utils/LoadingSpinner";

const SuratJalanContainer = ({ dataManifestOrigin, dataManifestTransit }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [initValues, setInitValues] = useState({
    cabangAsal: "",
    cabangTujuan: "",
    namaDriver: "",
    nopolDriver: "",
    checkedManifest: [],
    isValid: {
      cabangAsal: false,
      cabangTujuan: false,
      namaDriver: false,
      nopolDriver: false,
    },
  });

  useEffect(() => {
    setIsLoading(false);
  }, [router.query]);

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-6">
      <SuratJalanForm setInitValues={setInitValues} setIsLoading={setIsLoading} />
      {isLoading ? (
        <LoadingSpinner size="md" color="gray" />
      ) : (
        <>
          {router.query.cabangAsal ? (
            <TableManifestOrigin
              dataManifestOrigin={dataManifestOrigin}
              initValues={initValues}
              setInitValues={setInitValues}
            />
          ) : null}
          {router.query.cabangAsal ? (
            <TableManifestTransit
              dataManifestTransit={dataManifestTransit}
              initValues={initValues}
              setInitValues={setInitValues}
            />
          ) : null}
        </>
      )}

      <CreateSuratJalanButton initValues={initValues} />
    </div>
  );
};

export default SuratJalanContainer;
