import Layout from "@/components/Layout";
import ReprintManifestForm from "@/components/reprint/ReprintManifestForm";

const ReprintManifestPage = (props) => {
  return (
    <Layout>
      <ReprintManifestForm dataManifest={props.data} />
    </Layout>
  );
};

export default ReprintManifestPage;

export async function getServerSideProps(context) {
  const { noManifest } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-manifest/${noManifest}`);
  const data = await response.json();

  return {
    props: { data },
  };
}
