import Layout from "@/components/Layout";
import ReprintSuratJalanForm from "@/components/reprint/ReprintSuratJalanForm";

const ReprintManifestPage = (props) => {
  return (
    <Layout>
      <ReprintSuratJalanForm dataSuratJalan={props.data} />
    </Layout>
  );
};

export default ReprintManifestPage;

export async function getServerSideProps(context) {
  const { noSuratJalan } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-surat-jalan/${noSuratJalan}`);
  const data = await response.json();

  return {
    props: { data },
  };
}
