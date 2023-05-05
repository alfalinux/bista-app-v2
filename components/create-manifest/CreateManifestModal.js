import generateNoManifest from "@/helpers/generateNoManifest";
import generatePdfManifest from "@/helpers/generatePdfManifest";
import {
  CubeIcon,
  DocumentDuplicateIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CreateManifestModal = ({ onCloseModal, dataResi, cabangAsal, tujuan }) => {
  const router = useRouter();
  const { data } = useSession();
  const [isKonsol, setIsKonsol] = useState(false);
  const [dataCabangAsal, setDataCabangAsal] = useState({});

  useEffect(() => {
    fetch("/api/data-cabang")
      .then((response) => response.json())
      .then((data) => setDataCabangAsal(data.find((obj) => obj.cab === cabangAsal)));
  }, [cabangAsal]);

  const isKonsolSelectHandler = (e) => {
    setIsKonsol(e.target.value);
  };

  const prosesButtonHandler = () => {
    const dataCabang = {
      asal: dataCabangAsal.cab,
      asalTlc: dataCabangAsal.tlc,
      coveran: dataResi[0].tujuan.cov,
      coveranTlc: dataResi[0].tujuan.covTlc,
      tujuan: dataResi[0].tujuan.ibukota,
      tujuanTlc: dataResi[0].tujuan.tlc,
    };
    const noManifest = generateNoManifest(dataCabang.asalTlc, dataCabang.tujuanTlc);
    const tgl = new Date().toISOString();
    const listNoResi = dataResi.map((d) => d.noResi);

    const submitManifest = {
      noManifest: noManifest,
      tglManifest: tgl,
      cabangAsal: dataCabang.asal,
      cabangAsalTlc: dataCabang.asalTlc,
      cabangTujuan: dataCabang.tujuan,
      cabangTujuanTlc: dataCabang.tujuanTlc,
      coveranArea: dataCabang.coveran,
      coveranAreaTlc: dataCabang.coveranTlc,
      jumlahResi: dataResi.length,
      jumlahPaket: dataResi.map((d) => d.paket.length).reduce((total, obj) => total + Number(obj), 0),
      jumlahBerat: dataResi
        .map((d) => d.paket.map((d) => d.beratAktual).reduce((a, b) => a + Number(b), 0))
        .reduce((a, b) => a + Number(b), 0),
      jumlahVolume: dataResi
        .map((d) =>
          d.paket
            .map((d) => d.volume)
            .map((d) => (Number(d.panjang) * Number(d.lebar) * Number(d.tinggi)) / 1000000)
            .reduce((total, obj) => total + Number(obj), 0)
        )
        .reduce((total, obj) => total + Number(obj), 0),
      konsolidasi: isKonsol,
      petugasInput: data.nama,
      dataResi: dataResi,
    };
    onCloseModal();

    Swal.fire({
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        Swal.showLoading();
        fetch("/api/data-resi/post/update-many-resi-by-manifest", {
          method: "PATCH",
          body: JSON.stringify({
            filter: listNoResi,
            update: { noManifest: noManifest, tglManifest: tgl, creatorManifest: data.nama },
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            return fetch("/api/data-manifest/post/create-manifest", {
              method: "POST",
              body: JSON.stringify(submitManifest),
              headers: { "Content-Type": "application/json" },
            });
          })
          .then((response) => {
            Swal.hideLoading();
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            if (data.status == "201") {
              router.push("/outgoing/create-manifest");
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: data.status + "|" + data.message.toUpperCase(),
                showConfirmButton: true,
                confirmButtonColor: "red",
                confirmButtonText: "Cetak Manifest",
              }).then((result) => {
                if (result.isConfirmed) {
                  generatePdfManifest(submitManifest);
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Gagal",
                text: data.status + "|" + data.message.toUpperCase(),
              });
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Update resi failed: ${error}`);
          });
      },
    });
  };

  return (
    <div className="w-full h-[100dvh] fixed top-0 left-0 flex items-center justify-center">
      <div className="w-full h-[100dvh] bg-black/50 z-10" onClick={onCloseModal}></div>
      <div
        className={`w-[90%] h-fit sm:w-96 px-2 py-6 gap-2 flex flex-col items-center justify-center absolute bg-white rounded-lg shadow-md z-20`}
      >
        <QuestionMarkCircleIcon className="h-20 text-red-200" />
        <h2 className="text-2xl font-semibold capitalize text-gray-600">
          {cabangAsal} - {tujuan}
        </h2>
        <div className="flex gap-2 text-gray-600 text-base">
          <div className="flex items-center gap-1">
            <DocumentDuplicateIcon className="h-5" />
            <p>{dataResi.length.toLocaleString("id-ID")} Resi</p>
          </div>
          <div className="flex items-center gap-1">
            <CubeIcon className="h-5" />
            <p>{dataResi.reduce((acc, total) => acc + total.paket.length, 0).toLocaleString("id-ID")} Koli</p>
          </div>
          <div className="flex items-center gap-1">
            <ScaleIcon className="h-5" />
            <p>
              {dataResi
                .map((d) => d.paket.map((d) => d.beratAktual).reduce((total, obj) => total + Number(obj), 0))
                .reduce((total, obj) => total + Number(obj), 0)
                .toLocaleString("id-ID", { maximumFractionDigits: 3 })}{" "}
              Kg
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ArchiveBoxIcon className="h-5" />
            <p>
              {dataResi
                .map((d) =>
                  d.paket
                    .map((d) => d.volume)
                    .map((d) => (Number(d.panjang) * Number(d.lebar) * Number(d.tinggi)) / 1000000)
                    .reduce((total, obj) => total + Number(obj), 0)
                )
                .reduce((total, obj) => total + Number(obj), 0)
                .toLocaleString("id-Id", { maximumFractionDigits: 3, minimumFractionDigits: 3 })}{" "}
              CbM
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center text-gray-600">
          <label htmlFor="isKonsol" className="text-base">
            Konsolidasi Paket?
          </label>
          <select
            name="isKonsol"
            id="isKonsol"
            className="p-2 dark:text-gray-200"
            onChange={isKonsolSelectHandler}
          >
            <option value="false">Tidak</option>
            <option value="true">Ya</option>
          </select>
        </div>

        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-base w-24 py-2 rounded-md"
            onClick={prosesButtonHandler}
          >
            Proses
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-base w-24 py-2 rounded-md"
            onClick={onCloseModal}
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateManifestModal;
