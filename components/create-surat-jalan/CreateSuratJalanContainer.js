import { useEffect, useState } from "react";
import CreateSuratJalanForm from "./CreateSuratJalanForm";
import CreateSuratJalanTable from "./CreateSuratJalanTable";
import { useRouter } from "next/router";
import LoadingSpinner from "../utils/LoadingSpinner";
import Swal from "sweetalert2";
import listCabang from "@/helpers/listCabang";
import generateNoSuratJalan from "@/helpers/generateNoSuratJalan";
import { useSession } from "next-auth/react";
import generatePdfSuratJalan from "@/helpers/generatePdfSuratJalan";

const CreateSuratJalanContainer = (props) => {
  const { data, status } = useSession();
  const [initValues, setInitValues] = useState({
    cabangAsal: "",
    cabangTujuan: "",
    namaDriver: "",
    nopolDriver: "",
    checkedManifest: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const checkedManifestHandler = (checked, data) => {
    if (checked) {
      setInitValues((prevState) => ({
        ...prevState,
        checkedManifest: [...prevState.checkedManifest, data],
      }));
    } else {
      setInitValues((prevState) => ({
        ...prevState,
        checkedManifest: prevState.checkedManifest.filter((d) => d.noManifest !== data.noManifest),
      }));
    }
  };

  const checkedAllResiHandler = (data) => {
    setInitValues((prevState) => ({ ...prevState, checkedManifest: data }));
  };

  const resetInitValues = () =>
    setInitValues({ cabangAsal: "", cabangTujuan: "", namaDriver: "", nopolDriver: "", checkedManifest: [] });

  const submitSuratJalanHandler = () => {
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
          suratJalanCreatedBy: data.nama,
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
                  fetch("/api/data-manifest/post/update-many-manifest-by-surat-jalan/", {
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
                              resetInitValues();
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

  const loadingSpinnerHandler = (bool) => {
    setIsLoading(bool);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [props.dataManifest]);

  console.log(initValues);
  return (
    <div className="w-full overflow-x-scroll md:overflow-x-hidden overflow-y-hidden px-4">
      <CreateSuratJalanForm
        dataManifest={props.dataManifest}
        setInitValues={setInitValues}
        onLoading={loadingSpinnerHandler}
      />
      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-4">
          <LoadingSpinner size="md" color="gray" />
        </div>
      ) : router.query.cabangAsal === undefined ? null : router.query.cabangAsal === "" ? (
        <p className="text-center text-red-600 mt-4">Cabang Asal Belum Dipilih...</p>
      ) : (
        <CreateSuratJalanTable
          dataManifest={props.dataManifest}
          cabangTujuan={initValues.cabangTujuan}
          onCheckedResi={checkedManifestHandler}
          onCheckedAllResi={checkedAllResiHandler}
        />
      )}
      <div className="w-full flex justify-end py-2">
        <button
          className={`font-semibold text-sm text-gray-100 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 shadow-sm shadow-gray-400 dark:shadow-gray-800 disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-700`}
          disabled={
            !initValues.cabangAsal ||
            !initValues.cabangTujuan ||
            !initValues.namaDriver ||
            !initValues.nopolDriver ||
            initValues.checkedManifest.length === 0
          }
          onClick={submitSuratJalanHandler}
        >
          Create Surat Jalan
        </button>
      </div>
    </div>
  );
};

export default CreateSuratJalanContainer;
