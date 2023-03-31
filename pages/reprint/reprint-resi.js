import Layout from "@/components/Layout";
import ReprintResiForm from "@/components/reprint/ReprintResiForm";
import generateDate from "@/helpers/generateDate";

const ReprintResiPage = (props) => {
  return (
    <Layout>
      <ReprintResiForm dataResi={props} />
    </Layout>
  );
};

export default ReprintResiPage;

export async function getServerSideProps(context) {
  const { noResi } = context.query;
  const hostName = context.req.headers.host;

  const response = await fetch(`http://${hostName}/api/data-resi/${noResi}`);
  const data = await response.json();

  if (data.noResi) {
    return {
      props: {
        noResi: data.noResi,
        tglTransaksi: generateDate(data.tglTransaksi),
        namaPenerima: data.namaPenerima,
        namaPengirim: data.namaPengirim,
        tujuan: `${data.tujuan.kec} - ${data.tujuan.ibukota} - ${data.tujuan.prov}`,
        data: data,
      },
    };
  } else {
    return {
      props: { data },
    };
  }
}
