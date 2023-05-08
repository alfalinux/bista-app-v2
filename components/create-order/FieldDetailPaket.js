import { useEffect, useState } from "react";
import {
  XMarkIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckBadgeIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { validasiSpecialChar } from "../utils/use-validate";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const FieldDetailPaket = (props) => {
  const { id, index, setInitPaket } = props;
  const [showDetail, setShowDetail] = useState(true);
  const [verified, setVerified] = useState(false);
  const [detailPaket, setDetailPaket] = useState({
    id: id,
    beratAktual: 1,
    volume: { panjang: 1, lebar: 1, tinggi: 1, konversi: 4000, berat: 0 },
    beratDikenakan: 1,
    keterangan: "",
    verified: verified,
  });

  const [touchedFields, setTouchedFields] = useState({
    beratAktual: false,
    panjang: false,
    lebar: false,
    tinggi: false,
    keterangan: false,
  });

  const validasi = {
    beratAktual: Number(detailPaket.beratAktual) > 0,
    panjang: Number(detailPaket.volume.panjang) > 0,
    lebar: Number(detailPaket.volume.lebar) > 0,
    tinggi: Number(detailPaket.volume.tinggi) > 0,
    keterangan: validasiSpecialChar(detailPaket.keterangan, 30).isValid,
  };

  const handleChange = (e) => {
    setDetailPaket((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouchedFields((prevState) => ({ ...prevState, [e.target.name]: true }));
  };

  const handleVolumeChange = (e) => {
    setDetailPaket((prevState) => ({
      ...prevState,
      volume: { ...prevState.volume, [e.target.name]: e.target.value },
    }));
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!verified) {
      setVerified(true);
      setShowDetail(false);
      setDetailPaket((prevState) => ({ ...prevState, verified: true }));
    } else {
      setVerified(false);
      setDetailPaket((prevState) => ({ ...prevState, verified: false }));
    }
  };

  const handleHapus = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Paket#${index + 1} | ID-${id}`,
      text: `yakin mau dihapus?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        setInitPaket((prevState) => prevState.filter((d) => d.id !== id));
        Swal.fire({
          title: "Terhapus!",
          text: `Paket#${index + 1} | ID-${id} sudah dihapus!`,
          icon: "success",
          confirmButtonColor: "#22c55e",
        });
      }
    });
  };

  useEffect(() => {
    setDetailPaket((prevState) => ({
      ...prevState,
      volume: {
        ...prevState.volume,
        berat:
          (prevState.volume.panjang * prevState.volume.lebar * prevState.volume.tinggi) /
          prevState.volume.konversi,
      },
    }));
  }, [
    detailPaket.volume.panjang,
    detailPaket.volume.lebar,
    detailPaket.volume.tinggi,
    detailPaket.volume.konversi,
  ]);

  useEffect(() => {
    setDetailPaket((prevState) => ({
      ...prevState,
      beratDikenakan:
        prevState.beratAktual > prevState.volume.berat ? prevState.beratAktual : prevState.volume.berat,
    }));
  }, [detailPaket.beratAktual, detailPaket.volume.berat]);

  useEffect(() => {
    setInitPaket((prevState) => [...prevState.filter((d) => d.id !== detailPaket.id), detailPaket]);
  }, [verified]);

  return (
    <div>
      <header
        className={`w-full bg-gray-500 dark:bg-gray-700 px-4 py-2 flex gap-4 items-center justify-start font-semibold text-white ${
          showDetail ? "rounded-t-md" : "rounded-lg"
        }`}
      >
        <p>
          Paket # {index + 1} | ID-{id}
        </p>
        {verified ? (
          <div className="flex gap-1 items-center text-green-400">
            <p>Status</p>
            <CheckCircleIcon className="h-5" />
          </div>
        ) : (
          <div className="flex gap-1 items-center text-yellow-400">
            <p>Status</p>
            <ExclamationCircleIcon className="h-5" />
          </div>
        )}
        <ChevronDownIcon
          className={`h-4 hover:bg-gray-600 hover:cursor-pointer ml-auto transition-all duration-200 ${
            showDetail ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setShowDetail(!showDetail)}
        />
      </header>
      {showDetail ? (
        <main className="w-full flex flex-col gap-4 p-4 border-[1px] border-gray-300 dark:border-gray-700 rounded-b-md">
          <section className="w-full flex flex-col">
            <label htmlFor="beratAktual" className="font-semibold text-sm">
              Berat Aktual (Kg)
            </label>
            <input
              type="number"
              id="beratAktual"
              name="beratAktual"
              placeholder="Input berat aktual paket (Kg)"
              value={detailPaket.beratAktual}
              onChange={handleChange}
              onBlur={handleBlur}
              onWheel={(e) => e.target.blur()}
              className={`px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 dark:focus:ring-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-400 ${
                validasi.beratAktual
                  ? "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-700 focus:ring-black"
                  : "bg-red-100 dark:bg-red-800 border-red-600 dark:border-red-600 focus:ring-red-600 dark:focus:ring-red-600"
              }`}
              disabled={verified}
            />
            {validasi.beratAktual ? null : (
              <p className="text-[10px] text-red-600">wajib diisi dengan nilai lebih besar dari nol</p>
            )}
          </section>
          <section className="w-full">
            <label htmlFor="beratAktual" className="font-semibold text-sm">
              Volume (Cm)
            </label>
            <div className="w-full flex items-start justify-between">
              <div className="w-[30%]">
                <input
                  type="number"
                  id="panjang"
                  name="panjang"
                  placeholder="Panjang"
                  value={detailPaket.volume.panjang}
                  onChange={handleVolumeChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  className={`w-full px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 dark:focus:ring-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-400 ${
                    validasi.panjang
                      ? "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-700 focus:ring-black"
                      : "bg-red-100 dark:bg-red-800 border-red-600 dark:border-red-600 focus:ring-red-600 dark:focus:ring-red-600"
                  }`}
                  disabled={verified}
                />
                {validasi.panjang ? null : (
                  <p className="text-[10px] text-red-600">wajib diisi dengan nilai lebih besar dari nol</p>
                )}
              </div>
              <XMarkIcon className="h-4 mt-2 text-gray-500" />
              <div className="w-[30%]">
                <input
                  type="number"
                  id="lebar"
                  name="lebar"
                  placeholder="Lebar"
                  value={detailPaket.volume.lebar}
                  onChange={handleVolumeChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  className={`w-full px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 dark:focus:ring-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-400 ${
                    validasi.lebar
                      ? "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-700 focus:ring-black"
                      : "bg-red-100 dark:bg-red-800 border-red-600 dark:border-red-600 focus:ring-red-600 dark:focus:ring-red-600"
                  }`}
                  disabled={verified}
                />
                {validasi.lebar ? null : (
                  <p className="text-[10px] text-red-600">wajib diisi dengan nilai lebih besar dari nol</p>
                )}
              </div>
              <XMarkIcon className="h-4 mt-2 text-gray-500" />
              <div className="w-[30%]">
                <input
                  type="number"
                  id="tinggi"
                  name="tinggi"
                  placeholder="Tinggi"
                  value={detailPaket.volume.tinggi}
                  onChange={handleVolumeChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  className={`w-full px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 dark:focus:ring-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-400 ${
                    validasi.tinggi
                      ? "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-700 focus:ring-black"
                      : "bg-red-100 dark:bg-red-800 border-red-600 dark:border-red-600 focus:ring-red-600 dark:focus:ring-red-600"
                  }`}
                  disabled={verified}
                />
                {validasi.tinggi ? null : (
                  <p className="text-[10px] text-red-600">wajib diisi dengan nilai lebih besar dari nol</p>
                )}
              </div>
            </div>
          </section>
          <section className="w-full flex gap-4 items-center">
            <select
              name="konversi"
              id="konversi"
              value={detailPaket.volume.konversi}
              onChange={handleVolumeChange}
              className="bg-white dark:bg-gray-600 border-[1px] border-gray-300 dark:border-gray-700 p-2 rounded-md disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-400"
              disabled={verified}
            >
              <option value="4000">Konversi 4000</option>
              <option value="5000">Konversi 5000</option>
              <option value="6000">Konversi 6000</option>
            </select>
            <ArrowsRightLeftIcon className="h-5" />
            <p
              className={`w-fit h-10 flex self-center items-center px-2 text-sm rounded-md cursor-not-allowed capitalize border-gray-300 border-[1px] dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-400`}
            >
              {detailPaket.volume.berat.toLocaleString("id-ID", { maximumFractionDigits: 2 })} Kg
            </p>
          </section>
          <section className="w-full flex flex-col">
            <div className="w-full flex flex-col">
              <h3 className="font-semibold text-sm">Berat Dikenakan</h3>
              <p
                className={`w-full h-10 flex items-center px-2 text-sm rounded-md bg-black/10 cursor-not-allowed capitalize border-gray-300 border-[1px] dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-400`}
              >
                {detailPaket.beratDikenakan.toLocaleString("id-ID", { maximumFractionDigits: 2 })} Kg
              </p>
            </div>
          </section>
          <section className="w-full flex flex-col">
            <label htmlFor="keterangan" className="font-semibold text-sm">
              Keterangan
            </label>
            <input
              type="text"
              id="keterangan"
              name="keterangan"
              value={detailPaket.keterangan}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 dark:focus:ring-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-400 ${
                touchedFields.keterangan
                  ? validasi.keterangan
                    ? "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-700 focus:ring-black"
                    : "bg-red-100 dark:bg-red-800 border-red-600 dark:border-red-600 focus:ring-red-600 dark:focus:ring-red-600"
                  : "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-700 focus:ring-black"
              }`}
              placeholder="Ketik isi paket / jenis barang"
              autoComplete="off"
              disabled={verified}
            />
            {touchedFields.keterangan ? (
              validasi.keterangan ? null : (
                <p className="text-[10px] text-red-600">
                  {validasiSpecialChar(detailPaket.keterangan, 30).message}
                </p>
              )
            ) : null}
          </section>
          <div className="w-full flex flex-wrap gap-2 items-center justify-between sm:justify-end">
            <button
              className={`w-[30%] sm:w-28 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 font-semibold text-white px-4 py-2 rounded-md  disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-100 dark:disabled:text-gray-600 disabled:cursor-not-allowed`}
              disabled={!verified}
              onClick={handleSimpan}
            >
              <PencilSquareIcon className="h-5 hidden sm:block" />
              <p>Edit</p>
            </button>
            <button
              className={`w-[30%] sm:w-28 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-md  disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-100 dark:disabled:text-gray-600 disabled:cursor-not-allowed`}
              onClick={handleHapus}
            >
              <TrashIcon className=" h-5 hidden sm:block" />
              <p>Hapus</p>
            </button>
            <button
              className={`w-[30%] sm:w-28 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600
              } font-semibold text-white px-4 py-2 rounded-md disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-100 dark:disabled:text-gray-600 disabled:cursor-not-allowed`}
              onClick={handleSimpan}
              disabled={!Object.values(validasi).every((value) => value) || verified}
            >
              <CheckBadgeIcon className="h-5 hidden sm:block" />
              <p>Simpan</p>
            </button>
          </div>
        </main>
      ) : null}
    </div>
  );
};

export default FieldDetailPaket;
