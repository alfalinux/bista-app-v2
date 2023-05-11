import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const ReceiveSuratJalanButton = ({ dataSuratJalan, resetCabangTujuan }) => {
  const { data } = useSession();
  const router = useRouter();
  const submitHandler = () => {
    Swal.fire({
      icon: "question",
      title: "Anda yakin",
      text: `akan memproses received ${dataSuratJalan.length} surat jalan`,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Proses",
      cancelButtonColor: "#dc2626",
      cancelButtonText: "Batalkan",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updateData = {
          suratJalanReceivedAt: new Date().toISOString(),
          suratJalanReceivedBy: data.nama,
        };
        const filterData = dataSuratJalan.map((d) => d.noSuratJalan);
        Swal.fire({
          allowOutsideClick: !Swal.isLoading,
          didOpen: () => {
            Swal.showLoading();
            fetch("/api/data-resi/post/update-many-field-surat-jalan/", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filter: filterData,
                update: updateData,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status == "201") {
                  fetch("/api/data-manifest/post/update-many-field-surat-jalan/", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      filter: filterData,
                      update: updateData,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.status == "201") {
                        fetch("/api/data-surat-jalan/post/update-many-surat-jalan/", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            filter: filterData,
                            update: updateData,
                          }),
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.status == "201") {
                              Swal.hideLoading();
                              Swal.fire({
                                icon: "success",
                                title: "Berhasil Receive Surat Jalan",
                                timer: 2000,
                                showConfirmButton: false,
                                showCancelButton: false,
                                showCloseButton: false,
                              });
                              resetCabangTujuan();
                              router.push("/incoming/receive-surat-jalan/");
                            } else {
                              Swal.hideLoading();
                              Swal.showValidationMessage(
                                `Update Data Surat Jalan Failed: ${
                                  data.status
                                } | ${data.message.toUpperCase()}`
                              );
                            }
                          });
                      } else {
                        Swal.hideLoading();
                        Swal.showValidationMessage(
                          `Update Data Manifest Failed: ${data.status} | ${data.message.toUpperCase()}`
                        );
                      }
                    });
                } else {
                  Swal.hideLoading();
                  Swal.showValidationMessage(
                    `Update Data Resi Failed: ${data.status} | ${data.message.toUpperCase()}`
                  );
                }
              });
          },
        });
      }
    });
  };
  return (
    <button
      className={`font-semibold text-sm text-gray-100 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 shadow-sm shadow-gray-400 dark:shadow-gray-800 disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-700`}
      disabled={dataSuratJalan.length === 0}
      onClick={submitHandler}
    >
      Receive Surat Jalan
    </button>
  );
};

export default ReceiveSuratJalanButton;

// .then((response) => response.json())
//             .then((data) => {
//                 if (data.status == "201") {
//                 Swal.hideLoading();
//                 Swal.showValidationMessage(
//                     `Update Data Surat Jalan Succed: ${data.status} | ${data.message.toUpperCase()}`
//                 );
//                 router.push("/incoming/receive-surat-jalan/");
//                 } else {
//                 Swal.hideLoading();
//                 Swal.showValidationMessage(
//                     `Update Data Surat Jalan Failed: ${data.status} | ${data.message.toUpperCase()}`
//                 );
//                 }
//             }),
