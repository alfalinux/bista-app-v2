import Layout from "@/components/Layout";
import DetailResi from "@/components/cek-resi/DetailResi";
import SearchForm from "@/components/cek-resi/SearchForm";
import TableTracker from "@/components/cek-resi/TableTracker";

const CekResiPage = (data) => {
  console.log(data);
  return (
    <Layout>
      <div className="w-full p-4 flex flex-col gap-4">
        <SearchForm dataResi={data} />
        {data.status == "201" ? <TableTracker dataResi={data} /> : null}
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
