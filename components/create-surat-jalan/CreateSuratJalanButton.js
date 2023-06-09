import generateNoSuratJalan from "@/helpers/generateNoSuratJalan";
import generatePdfSuratJalan from "@/helpers/generatePdfSuratJalan";
import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const CreateSuratJalanButton = ({ initValues }) => {
  const { data } = useSession();
  const router = useRouter();
  const submitHandler = () => {
    const dataCabangAsal = listCabang().find((d) => d.cab == initValues.cabangAsal);
    const dataCabangTujuan = listCabang().find((d) => d.cab == initValues.cabangTujuan);
    Swal.fire({
      icon: "question",
      html: `<p><b>${initValues.cabangAsal.toUpperCase()} - ${initValues.cabangTujuan.toUpperCase()}</b></p><p><b>${initValues.namaDriver.toUpperCase()} | ${initValues.nopolDriver.toUpperCase()}</b></p> <p>
      ${initValues.checkedManifest.length} Manifest |
      ${initValues.checkedManifest
        .map((d) => d.jumlahBerat)
        .reduce((total, value) => total + Number(value), 0)
        .toLocaleString("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 5 })} Kg |
      ${initValues.checkedManifest
        .map((d) => d.jumlahVolume)
        .reduce((total, value) => total + Number(value), 0)
        .toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 5 })} CbM</p>`,
      confirmButtonText: "Create Surat Jalan",
      confirmButtonColor: "#2563eb",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const listManifest = initValues.checkedManifest.map((d) => d.noManifest);
        const submitData = {
          noSuratJalan: generateNoSuratJalan(dataCabangAsal.tlc, dataCabangTujuan.tlc),
          suratJalanCreatedAt: new Date().toISOString(),
          cabangAsal: dataCabangAsal.cab,
          cabangAsalTlc: dataCabangAsal.tlc,
          cabangTujuan: dataCabangTujuan.cab,
          cabangTujuanTlc: dataCabangTujuan.tlc,
          namaDriver: initValues.namaDriver,
          nopolDriver: initValues.nopolDriver,
          jumlahManifest: initValues.checkedManifest.length,
          jumlahBerat: initValues.checkedManifest
            .map((d) => d.jumlahBerat)
            .reduce((total, value) => total + Number(value), 0),
          jumlahVolume: initValues.checkedManifest
            .map((d) => d.jumlahVolume)
            .reduce((total, value) => total + Number(value), 0),
          jumlahPaket: initValues.checkedManifest
            .map((d) => (d.konsolidasi == "true" ? "1" : d.jumlahPaket))
            .reduce((total, value) => total + Number(value), 0),
          suratJalanCreatedBy: `${data.nama} - ${data.posisi}${data.cabang}${data.id}`,
          dataManifest: initValues.checkedManifest,
        };
        Swal.fire({
          allowOutsideClick: !Swal.isLoading,
          didOpen: () => {
            Swal.showLoading();
            fetch("/api/data-resi/post/update-many-resi-with-surat-jalan/", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filter: listManifest,
                update: {
                  noSuratJalan: submitData.noSuratJalan,
                  suratJalanCreatedAt: submitData.suratJalanCreatedAt,
                  suratJalanCreatedBy: submitData.suratJalanCreatedBy,
                  cabangAsal: submitData.cabangAsal,
                  cabangAsalTlc: submitData.cabangAsal,
                  cabangTujuan: submitData.cabangTujuan,
                  cabangTujuanTlc: submitData.cabangTujuanTlc,
                  namaDriver: submitData.namaDriver,
                  nopolDriver: submitData.nopolDriver,
                },
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status == "201") {
                  fetch("/api/data-manifest/post/update-many-manifest-with-surat-jalan/", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      filter: listManifest,
                      update: {
                        noSuratJalan: submitData.noSuratJalan,
                        suratJalanCreatedAt: submitData.suratJalanCreatedAt,
                        suratJalanCreatedBy: submitData.suratJalanCreatedBy,
                        cabangAsal: submitData.cabangAsal,
                        cabangAsalTlc: submitData.cabangAsal,
                        cabangTujuan: submitData.cabangTujuan,
                        cabangTujuanTlc: submitData.cabangTujuanTlc,
                        namaDriver: submitData.namaDriver,
                        nopolDriver: submitData.nopolDriver,
                      },
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.status == "201") {
                        fetch("/api/data-surat-jalan/post/create-surat-jalan/", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(submitData),
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.status == "201") {
                              Swal.hideLoading();
                              router.push("/outgoing/create-surat-jalan");
                              Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                text: data.status + "|" + data.message.toUpperCase(),
                                showConfirmButton: true,
                                confirmButtonColor: "red",
                                confirmButtonText: "Cetak Surat Jalan",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  generatePdfSuratJalan(submitData);
                                }
                              });
                            } else {
                              Swal.hideLoading();
                              Swal.showValidationMessage(
                                `Post Data Surat Jalan Failed: ${data.status} | ${data.message.toUpperCase()}`
                              );
                            }
                          });
                      } else {
                        Swal.hideLoading();
                        Swal.showValidationMessage(
                          `Push Data Surat Jalan To Manifest Failed: ${
                            data.status
                          } | ${data.message.toUpperCase()}`
                        );
                      }
                    });
                } else {
                  Swal.hideLoading();
                  Swal.showValidationMessage(
                    `Push Data Surat Jalan To Resi Failed: ${data.status} | ${data.message.toUpperCase()}`
                  );
                }
              });
          },
        });
      }
    });
  };

  return (
    <div className="w-full flex justify-end">
      <button
        className={`font-semibold text-sm text-gray-100 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 shadow-md shadow-gray-300 dark:shadow-gray-700 disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-700`}
        disabled={
          !Object.values(initValues.isValid).every((value) => value) ||
          initValues.checkedManifest.length === 0
        }
        onClick={submitHandler}
      >
        Create Surat Jalan
      </button>
    </div>
  );
};

export default CreateSuratJalanButton;
