import CreateDeliveryForm from "@/components/create-delivery/CreateDeliveryForm";
import Layout from "@/components/Layout";

const CreateDeliveryPage = (props) => {
  return (
    <Layout>
      <CreateDeliveryForm dataResi={props.dataResi} dataKurir={props.dataKurir} dataCabang={props.cabang} />
    </Layout>
  );
};

export default CreateDeliveryPage;

export async function getServerSideProps(context) {
  const { cabang } = context.query;
  const hostName = context.req.headers.host;

  const responseDataResi = await fetch(`http://${hostName}/api/data-resi/belum-delivery/${cabang}`);
  const dataResi = await responseDataResi.json();

  const responseDataKurir = await fetch(`http://${hostName}/api/user/cabang/${cabang}`);
  const dataKurir = await responseDataKurir.json();

  return {
    props: { dataResi, dataKurir: dataKurir, cabang: cabang ? cabang : "" },
  };
}
