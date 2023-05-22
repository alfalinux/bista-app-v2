import Layout from "@/components/Layout";
import ReprintDeliveryForm from "@/components/reprint/ReprintDeliveryForm";

const ReprintDeliveryPage = (props) => {
  return (
    <Layout>
      <ReprintDeliveryForm dataDelivery={props.data} />
    </Layout>
  );
};

export default ReprintDeliveryPage;

export async function getServerSideProps(context) {
  const { noDelivery } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-delivery/${noDelivery}`);
  const data = await response.json();

  if (!context.query.noDelivery) {
    return { props: { data: { status: "400", message: "url pathname tidak valid!" } } };
  } else {
    return {
      props: { data },
    };
  }
}
