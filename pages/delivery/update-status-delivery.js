import Layout from "@/components/Layout";
import UpdateStatusDeliveryContainer from "@/components/update-status-delivery/UpdateStatusDeliveryContainer";

const UpdateStatusDeliveryPage = (props) => {
  return (
    <Layout>
      <UpdateStatusDeliveryContainer dataDelivery={props.dataDelivery} />
    </Layout>
  );
};

export default UpdateStatusDeliveryPage;

export async function getServerSideProps(context) {
  const { cabang } = context.query;
  const hostName = context.req.headers.host;

  const responseDataDelivery = await fetch(`http://${hostName}/api/data-delivery/cabang/${cabang}`);
  const dataDelivery = await responseDataDelivery.json();

  return {
    props: { dataDelivery },
  };
}
