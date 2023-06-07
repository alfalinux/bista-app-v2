import Layout from "@/components/Layout";
import SearchForm from "@/components/cek-resi/SearchForm";
import TableTracker from "@/components/cek-resi/TableTracker";
import { useEffect, useState } from "react";

const CekResiPage = (data) => {
  const [dataResi, setDataResi] = useState([]);

  useEffect(() => {
    setDataResi(
      [
        { at: data.result.resiCreatedAt, in: data.result.resiCreatedIn, is: `create resi` },

        data.result.manifestCreatedAt
          ? { at: data.result.manifestCreatedAt, in: data.result.manifestCreatedIn, is: `create manifest` }
          : null,

        data.result.listSuratJalan.length > 0
          ? data.result.listSuratJalan.map((d) => [
              { at: d.suratJalanCreatedAt, in: d.suratJalanCreatedIn, is: `create surat jalan` },
              d.suratJalanReceivedAt
                ? { at: d.suratJalanReceivedAt, in: d.suratJalanReceivedIn, is: `receive surat jalan` }
                : null,
            ])
          : null,

        data.result.manifestReceivedAt
          ? { at: data.result.manifestReceivedAt, in: data.result.manifestReceivedIn, is: `receive manifest` }
          : null,

        data.result.listDelivery.length > 0
          ? data.result.listDelivery.map((d) => [
              {
                at: d.deliveryCreatedAt,
                by: d.dataKurir.nama + " - " + d.dataKurir.posisi + d.dataKurir.cabang + d.dataKurir.id,
                is: `create delivery`,
              },
              d.deliveryStatus.prosesAt
                ? {
                    at: d.deliveryStatus.prosesAt,
                    is: `${d.deliveryStatus.proses.toUpperCase()} - ${d.deliveryStatus.keterangan}`,
                  }
                : null,
            ])
          : null,
      ]
        .flat(Infinity)
        .filter((val) => val !== null)
        .sort((a, b) => new Date(a.at) - new Date(b.at))
    );
  }, [data]);

  console.log(dataResi);
  return (
    <Layout>
      <div className="w-full p-4 flex flex-col gap-4">
        <SearchForm dataResi={data} />
        {data.status == "201" ? <TableTracker dataResi={dataResi} /> : null}
      </div>
    </Layout>
  );
};

export default CekResiPage;

export async function getServerSideProps(context) {
  const { noResi } = context.query;
  const hostName = context.req.headers.host;

  const result = await fetch(`http://${hostName}/api/cek-resi/${noResi}`);
  const data = await result.json();

  return {
    props: data,
  };
}
