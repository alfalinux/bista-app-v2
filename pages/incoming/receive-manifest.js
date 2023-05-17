import Layout from "@/components/Layout";
import ReceiveManifestForm from "@/components/receive-manifest/ReceiveManifestForm";

const ReceiveManifestPage = (props) => {
  return (
    <Layout>
      <ReceiveManifestForm dataManifest={props.data} />
    </Layout>
  );
};

export default ReceiveManifestPage;

export async function getServerSideProps(context) {
  const { cabangTujuan } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-manifest/belum-receive/${cabangTujuan}`);
  const data = await response.json();

  return {
    props: { data: data },
  };
}
