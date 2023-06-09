import Layout from "@/components/Layout";
import SearchForm from "@/components/cek-resi/SearchForm";
import TableTracker from "@/components/cek-resi/TableTracker";
import resiTrackerData from "@/helpers/resiTrackerData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CekResiPage = (data) => {
  const router = useRouter();
  const [dataResi, setDataResi] = useState([]);

  useEffect(() => {
    if (data.status == "201") {
      setDataResi(() => resiTrackerData(data));
    }
  }, [data]);

  return (
    <Layout>
      <div className="w-full p-4 flex flex-col gap-4">
        <SearchForm dataResi={data} />
        {data.status == "201" ? <TableTracker dataResi={dataResi} /> : null}
        {data.status != "201" && router.query.noResi ? (
          <p className="bg-red-300 dark:bg-red-800 text-sm text-center text-red-600 dark:text-red-300 p-2 shadow-md">
            {data.message}
          </p>
        ) : null}
      </div>
    </Layout>
  );
};

export default CekResiPage;

export async function getServerSideProps(context) {
  const { noResi } = context.query;
  const hostName = context.req.headers.host;

  const result = await fetch(`http://${hostName}/api/cek-resi/${noResi}`);
  const data = await result.json();

  return {
    props: data,
  };
}
