import CreateManifestForm from "@/components/create-manifest/CreateManifestForm";
import Layout from "@/components/Layout";

const CreateManifestPage = (props) => {
  return (
    <Layout>
      <CreateManifestForm dataResi={props.data} cabangAsal={props.cabangAsal ? props.cabangAsal : ""} />
    </Layout>
  );
};

export default CreateManifestPage;

export async function getServerSideProps(context) {
  const { cabangAsal } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-resi/belum-manifest/${cabangAsal}`);
  const data = await response.json();

  return {
    props: { data: data, cabangAsal: cabangAsal ? cabangAsal : "" },
  };
}
