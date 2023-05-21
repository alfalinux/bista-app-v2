import generateNoDelivery from "@/helpers/generateNoDelivery";
import generatePdfDelivery from "@/helpers/generatePdfDelivery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const CreateDeliveryButton = ({ dataResi, dataKurir, onResetInput }) => {
  const { data } = useSession();
  const router = useRouter();
  const submitHandler = () => {
    Swal.fire({
      icon: "question",
      title: "Create Delivery",
      text: `${dataResi.length} Resi atas nama ${dataKurir.nama}`,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Proses",
      cancelButtonColor: "#dc2626",
      cancelButtonText: "Batalkan",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const submitData = {
          noDelivery: generateNoDelivery(dataKurir),
          dataKurir: dataKurir,
          deliveryCreatedAt: new Date().toISOString(),
          deliveryCreatedBy: data.nama,
          deliveryStatus: {
            proses: "pengantaran",
            keterangan: "",
            prosesAt: "",
          },
        };
        const filterData = dataResi.map((d) => d.noResi);
        Swal.fire({
          allowOutsideClick: !Swal.isLoading,
          didOpen: () => {
            Swal.showLoading();
            fetch("/api/data-resi/post/update-many-field-with-delivery/", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filter: filterData,
                update: submitData,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status == "201") {
                  Swal.hideLoading();
                  Swal.fire({
                    icon: "success",
                    title: "Berhasil Create Delivery",
                    confirmButtonText: "Cetak Delivery Report",
                    confirmButtonColor: "#3b82f6",
                    showCancelButton: false,
                    showCloseButton: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      generatePdfDelivery({ delivery: submitData, dataResi: dataResi });
                    }
                  });
                  onResetInput();
                  router.push("/delivery/create-delivery/");
                } else {
                  Swal.hideLoading();
                  Swal.showValidationMessage(
                    `Create Delivery Failed: ${data.status} | ${data.message.toUpperCase()}`
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
      disabled={dataResi.length === 0 || Object.keys(dataKurir).length === 0}
      onClick={submitHandler}
    >
      Create Delivery
    </button>
  );
};

export default CreateDeliveryButton;
