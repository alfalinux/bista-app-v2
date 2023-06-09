import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const ReceiveManifestButton = ({ dataManifest, resetCabangTujuan }) => {
  const { data } = useSession();
  const router = useRouter();
  const submitHandler = () => {
    Swal.fire({
      icon: "question",
      title: "Anda yakin",
      text: `akan memproses received ${dataManifest.length} manifest`,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Proses",
      cancelButtonColor: "#dc2626",
      cancelButtonText: "Batalkan",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updateData = {
          manifestReceivedAt: new Date().toISOString(),
          manifestReceivedBy: `${data.nama} - ${data.posisi}${data.cabang}${data.id}`,
        };
        const filterResi = dataManifest.flatMap((d) => d.dataResi).map((d) => d.noResi);
        const filterManifest = dataManifest.map((d) => d.noManifest);
        Swal.fire({
          allowOutsideClick: !Swal.isLoading,
          didOpen: () => {
            Swal.showLoading();
            fetch("/api/data-resi/post/update-many-resi-with-manifest/", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filter: filterResi,
                update: updateData,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status == "201") {
                  fetch("/api/data-manifest/post/update-many-manifest/", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      filter: filterManifest,
                      update: updateData,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.status == "201") {
                        Swal.hideLoading();
                        Swal.fire({
                          icon: "success",
                          title: "Berhasil Receive Manifest",
                          timer: 2000,
                          showConfirmButton: false,
                          showCancelButton: false,
                          showCloseButton: false,
                        });
                        resetCabangTujuan();
                        router.push("/incoming/receive-manifest/");
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
      disabled={dataManifest.length === 0}
      onClick={submitHandler}
    >
      Receive Surat Jalan
    </button>
  );
};

export default ReceiveManifestButton;
