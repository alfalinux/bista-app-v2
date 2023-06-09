import { useRouter } from "next/router";
import Layout from "../Layout";
import DataTable from "./DataTable";
import SelectionForm from "./SelectionForm";
import { useEffect, useState } from "react";

const TransaksiHarianContainer = ({ dataTransaksi }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [dataTransaksi]);

  return (
    <Layout>
      <div className="w-full lg:w-[765px] xl:w-[960px] 2xl:w-[1216px] p-4 flex flex-col gap-4">
        <SelectionForm isLoading={isLoading} setIsLoading={setIsLoading} />

        {router.query.cabang && router.query.tglTransaksi && dataTransaksi.result.length > 0 ? (
          <DataTable dataTransaksi={dataTransaksi} />
        ) : null}

        {router.query.cabang && router.query.tglTransaksi ? (
          dataTransaksi.status == "201" ? (
            dataTransaksi.result.length === 0 ? (
              <p className="bg-red-300 dark:bg-red-800 text-sm text-center text-red-600 dark:text-red-300 p-2 shadow-md">
                Tidak ada transaksi pada cabang dan tanggal tersebut...
              </p>
            ) : null
          ) : (
            <p className="bg-red-300 dark:bg-red-800 text-sm text-center text-red-600 dark:text-red-300 p-2 shadow-md">
              {dataTransaksi.message}
            </p>
          )
        ) : null}
      </div>
    </Layout>
  );
};

export default TransaksiHarianContainer;
