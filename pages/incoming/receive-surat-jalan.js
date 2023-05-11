import Layout from "@/components/Layout";
import ReceiveSuratJalanForm from "@/components/receive-surat-jalan/ReceiveSuratJalanForm";

const receiveSuratJalanPage = (props) => {
  return (
    <Layout>
      <ReceiveSuratJalanForm dataSuratJalan={props.data} />
    </Layout>
  );
};

export default receiveSuratJalanPage;

export async function getServerSideProps(context) {
  const { cabangTujuan } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-surat-jalan/belum-receive/${cabangTujuan}`);
  const data = await response.json();

  return {
    props: { data: data },
  };
}
