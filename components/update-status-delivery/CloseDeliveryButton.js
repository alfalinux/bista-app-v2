import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const CloseDeliveryButton = ({ noDelivery, cabang }) => {
  const { data } = useSession();
  const router = useRouter();
  const closeDeliveryHandler = () => {
    Swal.fire({
      html: `<p>Apakah proses delivery</p> </n> <p><b>${noDelivery}</b></p> </n> <p>akan diselesaikan?</p>`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#0284c7",
      confirmButtonText: "Proses",
      cancelButtonColor: "#dc2626",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        const user = `${data.nama} - ${data.posisi}${data.cabang}${data.id}`;
        const tgl = new Date().toISOString();
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch("/api/data-resi/post/set-delivery-closed/", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                filter: noDelivery,
                update: { deliveryClosedAt: tgl, deliveryClosedBy: user },
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status == "201") {
                  Swal.hideLoading();
                  Swal.fire({
                    icon: "success",
                    title: "Berhasil Close Delivery",
                    timer: 2000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    showCloseButton: false,
                  });
                  router.replace(`/delivery/update-status-delivery?cabang=${cabang}`);
                } else {
                  Swal.hideLoading();
                  Swal.showValidationMessage(
                    `Close Delivery Failed: ${data.status} | ${data.message.toUpperCase()}`
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
      className="w-full bg-gray-900 hover:bg-black rounded-md text-white font-semibold p-2 uppercase"
      onClick={closeDeliveryHandler}
    >
      Close Delivery
    </button>
  );
};

export default CloseDeliveryButton;
