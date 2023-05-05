import Layout from "@/components/Layout";
import CreateSuratJalanContainer from "@/components/create-surat-jalan/CreateSuratJalanContainer";

const createSuratJalanPage = (props) => {
  return (
    <Layout>
      <CreateSuratJalanContainer dataManifest={props.data} />
    </Layout>
  );
};

export default createSuratJalanPage;

export async function getServerSideProps(context) {
  const { cabangAsal } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-manifest/belum-surat-jalan/${cabangAsal}`);
  const data = await response.json();

  return {
    props: { data: data },
  };
}
