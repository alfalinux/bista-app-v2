import Layout from "@/components/Layout";

import SuratJalanContainer from "@/components/create-surat-jalan/SuratJalanContainer";

const createSuratJalanPage = (props) => {
  return (
    <Layout>
      <SuratJalanContainer
        dataManifestOrigin={props.manifestOrigin}
        dataManifestTransit={props.manifestTransit}
      />
    </Layout>
  );
};

export default createSuratJalanPage;

export async function getServerSideProps(context) {
  const { cabangAsal } = context.query;
  const hostName = context.req.headers.host;

  const resOrigin = await fetch(`http://${hostName}/api/data-manifest/belum-surat-jalan/${cabangAsal}`);
  const dataOrigin = await resOrigin.json();

  const resTransit = await fetch(`http://${hostName}/api/data-manifest/transit/${cabangAsal}`);
  const dataTransit = await resTransit.json();

  return {
    props: { manifestOrigin: dataOrigin, manifestTransit: dataTransit },
  };
}
