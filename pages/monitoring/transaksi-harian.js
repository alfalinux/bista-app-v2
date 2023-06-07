import TransaksiHarianContainer from "@/components/transaksi-harian/TransaksiHarianContainer";

const TransaksiHarianPage = (props) => {
  return <TransaksiHarianContainer dataTransaksi={props.data} />;
};

export default TransaksiHarianPage;

export async function getServerSideProps(context) {
  const { cabang, tglTransaksi } = context.query;
  const hostName = context.req.headers.host;
  const response = await fetch(`http://${hostName}/api/data-resi/transaksi-harian/${cabang}/${tglTransaksi}`);
  const data = await response.json();

  return {
    props: { data },
  };
}
