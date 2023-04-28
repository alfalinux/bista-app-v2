import Layout from "@/components/Layout";
import ReprintManifestForm from "@/components/reprint/ReprintManifestForm";
import ReprintResiForm from "@/components/reprint/ReprintResiForm";
import generateDate from "@/helpers/generateDate";

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

  //   if (data.noManifest) {
  //     return {
  //       props: {
  //         noManifest: data.noManifest,
  //         tglTransaksi: generateDate(data.tglTransaksi),
  //         namaPenerima: data.namaPenerima,
  //         namaPengirim: data.namaPengirim,
  //         tujuan: `${data.tujuan.kec} - ${data.tujuan.ibukota} - ${data.tujuan.prov}`,
  //         data: data,
  //       },
  //     };
  //   } else {
  //     return {
  //       props: { data },
  //     };
  //   }
}
