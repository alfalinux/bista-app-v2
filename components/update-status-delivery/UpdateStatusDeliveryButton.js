import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdateStatusDeliveryButton = ({
  noResi,
  dataResi,
  noDelivery,
  status,
  cabang,
  namaKurir,
  onChangeCabang,
  onChangeKurir,
}) => {
  const { data } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [statusSelected, setStatusSelected] = useState("");
  const [inputKeterangan, setInputKeterangan] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");

  const updateModalHandleChange = () => {
    setModalOpen(!modalOpen);
    setStatusSelected("");
    setInputKeterangan("");
    setNamaPenerima("");
  };
  const statusSelectedChangeHandler = (e) => {
    setStatusSelected(e.target.value);
    setInputKeterangan("");
    setNamaPenerima("");
  };
  const inputKeteranganChangeHandler = (e) => {
    setInputKeterangan(e.target.value);
  };
  const namaPenerimaChangeHandler = (e) => {
    setNamaPenerima(e.target.value);
  };
  const updateStatusHandler = () => {
    const tgl = new Date().toISOString();
    const reason = namaPenerima ? `${namaPenerima} / ${inputKeterangan}` : inputKeterangan;
    const user = `${data.nama} - ${data.posisi}${data.cabang}${data.id}`;
    const cabangProses = cabang;
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch("/api/data-resi/post/update-delivery-status/", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filter: { noResi: noResi, noDelivery: noDelivery },
            update: {
              proses: statusSelected,
              keterangan: reason,
              prosesAt: tgl,
              prosesBy: user,
              prosesIn: cabangProses,
            },
          }),
        }).then((response) =>
          response.json().then((data) => {
            if (data.status == "201") {
              Swal.hideLoading();
              updateModalHandleChange();
              Swal.fire({
                icon: "success",
                title: "Berhasil Update Status Delivery",
                timer: 2000,
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: false,
              });
              onChangeCabang({ target: { value: cabang } });
              onChangeKurir({ target: { value: namaKurir } });
            } else {
              Swal.hideLoading();
              updateModalHandleChange();
              Swal.showValidationMessage(
                `Update Status Delivery Failed: ${data.status} | ${data.message.toUpperCase()}`
              );
            }
          })
        );
      },
    });
  };

  return (
    <>
      <div>
        <button
          onClick={updateModalHandleChange}
          className={`w-full p-2 rounded-md text-xs text-white font-semibold uppercase ${
            status === "diterima"
              ? "bg-sky-600 hover:bg-sky-700"
              : status === "gagal"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {status}
        </button>
      </div>
      {/* buka modal untuk status pengantaran */}
      {modalOpen && status === "pengantaran" ? (
        <div className="absolute left-0 top-0 w-[100dvw] h-[100dvh] flex items-center justify-center">
          <div
            className="absolute left-0 top-0 w-[100dvw] h-[100dvh] bg-black/50"
            onClick={updateModalHandleChange}
          ></div>
          <div className="w-96 border p-4 bg-white text-gray-900 z-10 flex flex-col items-center justify-center gap-2">
            <ExclamationCircleIcon className="h-10 text-orange-600" />
            <h1 className="">Update Status Delivery</h1>
            <h2 className="text-sm font-semibold">{noResi}</h2>
            <div className="w-full bg-gray-300 p-2 flex gap-2 items-center justify-center">
              <label htmlFor="status" className="whitespace-nowrap">
                Status :
              </label>
              <select
                name="status"
                id="status"
                className="w-full p-2 bg-white"
                onClick={statusSelectedChangeHandler}
              >
                <option value="">--Pilih status delivery--</option>
                <option value="diterima">Diterima</option>
                <option value="gagal">Gagal</option>
              </select>
            </div>
            {statusSelected === "gagal" ? (
              <div className="w-full bg-gray-300 p-2 flex gap-2 items-center justify-start flex-wrap">
                <label htmlFor="keterangan" className="whitespace-nowrap">
                  Keterangan :
                </label>
                <select
                  name="keterangan"
                  id="keterangan"
                  className="p-2 capitalize w-full bg-white"
                  onClick={inputKeteranganChangeHandler}
                >
                  <option className="capitalize" value="">
                    --Pilih reason--
                  </option>
                  <option className="capitalize" value="penerima tidak ditempat">
                    penerima tidak ditempat
                  </option>
                  <option className="capitalize" value="alamat tidak ditemukan">
                    alamat tidak ditemukan
                  </option>
                  <option className="capitalize" value="no telp tidak aktif / tidak respon">
                    no telp tidak aktif / tidak respon
                  </option>
                  <option className="capitalize" value="penerima minta reschedule">
                    penerima minta reschedule
                  </option>
                  <option className="capitalize" value="tidak cukup waktu, diantar kembali besok">
                    tidak cukup waktu, diantar kembali besok
                  </option>
                </select>
              </div>
            ) : null}

            {statusSelected === "diterima" ? (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-gray-300 p-2 flex gap-2 items-center justify-start">
                  <label htmlFor="namaPenerima" className="whitespace-nowrap">
                    Oleh :
                  </label>
                  <input
                    type="text"
                    name="namaPenerima"
                    id="namaPenerima"
                    className="p-2 w-full bg-white"
                    placeholder="ketik nama penerima"
                    value={namaPenerima}
                    onChange={namaPenerimaChangeHandler}
                    autoComplete="off"
                  />
                </div>
                <div className="w-full bg-gray-300 p-2 flex gap-2 items-center justify-start flex-wrap">
                  <label htmlFor="keterangan" className="whitespace-nowrap">
                    Keterangan :
                  </label>
                  <select
                    name="keterangan"
                    id="keterangan"
                    className="p-2 capitalize w-full bg-white"
                    onClick={inputKeteranganChangeHandler}
                  >
                    <option className="capitalize" value="">
                      --Pilih reason--
                    </option>
                    <option className="capitalize" value="yang bersangkutan">
                      yang bersangkutan
                    </option>
                    <option className="capitalize" value="suami / istri">
                      suami / istri
                    </option>
                    <option className="capitalize" value="keluarga (ayah/ibu/anak/adik/kakak/saudara)">
                      keluarga (ayah/ibu/anak/adik/kakak/saudara)
                    </option>
                    <option className="capitalize" value="tetangga">
                      tetangga
                    </option>
                    <option className="capitalize" value="rekan kerja">
                      rekan kerja
                    </option>
                    <option className="capitalize" value="security / satpam">
                      security / satpam
                    </option>
                  </select>
                </div>
              </div>
            ) : null}
            <button
              disabled={
                !statusSelected || !inputKeterangan || (statusSelected === "diterima" && !namaPenerima)
              }
              className="p-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md w-full disabled:bg-gray-300 disabled:text-gray-400"
              onClick={updateStatusHandler}
            >
              UPDATE STATUS
            </button>
          </div>
        </div>
      ) : null}

      {/* buka modal untuk status gagal */}
      {modalOpen && status !== "pengantaran" ? (
        <div className="absolute left-0 top-0 w-[100dvw] h-[100dvh] flex items-center justify-center">
          <div
            className="absolute left-0 top-0 w-[100dvw] h-[100dvh] bg-black/50"
            onClick={updateModalHandleChange}
          ></div>
          <div className="w-96 border p-4 bg-white text-gray-900 z-10 flex flex-col items-center justify-center gap-2">
            {status === "gagal" ? (
              <XCircleIcon className="h-20 text-red-600" />
            ) : status === "diterima" ? (
              <CheckCircleIcon className="h-20 text-sky-600" />
            ) : null}
            <h1 className="font-semibold text-base">{noResi}</h1>
            <h1 className="uppercase text-base">
              {dataResi.delivery.find((d) => d.noDelivery === noDelivery).deliveryStatus.proses}
            </h1>
            <h1 className="capitalize">
              {dataResi.delivery.find((d) => d.noDelivery === noDelivery).deliveryStatus.keterangan}
            </h1>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpdateStatusDeliveryButton;
