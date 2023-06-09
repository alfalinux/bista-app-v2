const resiTrackerData = (data) => {
  return [
    data.result.noResi
      ? {
          at: data.result.resiCreatedAt,
          in: data.result.resiCreatedIn,
          by: data.result.resiCreatedBy,
          is: `create resi`,
          ket: data.result.noResi,
        }
      : null,

    data.result.manifestCreatedAt
      ? {
          at: data.result.manifestCreatedAt,
          in: data.result.manifestCreatedIn,
          by: data.result.manifestCreatedBy,
          is: `create manifest`,
          ket: data.result.noManifest,
        }
      : null,

    data.result.listSuratJalan?.length > 0
      ? data.result.listSuratJalan.map((d) => [
          {
            at: d.suratJalanCreatedAt,
            in: d.suratJalanCreatedIn,
            by: `${d.namaDriver} - ${d.nopolDriver}`,
            is: `create surat jalan`,
            ket: d.noSuratJalan,
          },
          d.suratJalanReceivedAt
            ? {
                at: d.suratJalanReceivedAt,
                in: d.suratJalanReceivedIn,
                by: d.suratJalanReceivedBy,
                is: `receive surat jalan`,
                ket: "",
              }
            : null,
        ])
      : null,

    data.result.manifestReceivedAt
      ? {
          at: data.result.manifestReceivedAt,
          in: data.result.manifestReceivedIn,
          by: data.result.manifestReceivedBy,
          is: `receive manifest`,
          ket: "",
        }
      : null,

    data.result.listDelivery?.length > 0
      ? data.result.listDelivery.map((d) => [
          {
            at: d.deliveryCreatedAt,
            in: d.dataKurir.cabangDesc,
            by: `${d.dataKurir.nama} - ${d.dataKurir.posisi}${d.dataKurir.cabang}${d.dataKurir.id}`,
            is: `create delivery`,
            ket: d.noDelivery,
          },
          d.deliveryStatus.prosesAt
            ? {
                at: d.deliveryStatus.prosesAt,
                in: d.deliveryStatus.prosesIn,
                by: d.deliveryStatus.prosesBy,
                is: d.deliveryStatus.proses,
                ket: d.deliveryStatus.keterangan,
              }
            : null,
        ])
      : null,
  ]
    .flat(Infinity)
    .filter((val) => val !== null)
    .sort((a, b) => new Date(a.at) - new Date(b.at));
};

export default resiTrackerData;
