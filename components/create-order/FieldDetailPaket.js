import { useEffect, useState } from "react";
import {
  XMarkIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckBadgeIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { validasiKeterangan } from "../utils/use-validate";
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

  const isValid = {
    beratAktual: Number(detailPaket.beratAktual) > 0,
    panjang: Number(detailPaket.volume.panjang) > 0,
    lebar: Number(detailPaket.volume.lebar) > 0,
    tinggi: Number(detailPaket.volume.tinggi) > 0,
    keterangan: validasiKeterangan(detailPaket.keterangan),
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
        className={`w-full bg-zinc-500 px-4 py-2 flex gap-4 items-center justify-start font-semibold text-white ${
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
          className={`h-4 hover:bg-zinc-600 hover:cursor-pointer ml-auto transition-all duration-200 ${
            showDetail ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setShowDetail(!showDetail)}
        />
      </header>
      {showDetail ? (
        <main className="w-full flex flex-col gap-4 p-4 border-[1px] border-zinc-300 rounded-b-md">
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
              className={`px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 disabled:bg-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-400 ${
                isValid.beratAktual
                  ? "bg-white border-zinc-300 focus:ring-black"
                  : "bg-red-100 border-red-300 focus:ring-red-300"
              }`}
              disabled={verified}
            />
            {isValid.beratAktual ? null : (
              <p className="text-[10px] text-red-500">wajib diisi dengan nilai lebih besar dari nol</p>
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
                  className={`w-full px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 disabled:bg-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-400 ${
                    isValid.panjang
                      ? "bg-white border-zinc-300 focus:ring-black"
                      : "bg-red-100 border-red-300 focus:ring-red-300"
                  }`}
                  disabled={verified}
                />
                {isValid.panjang ? null : (
                  <p className="text-[10px] text-red-500">wajib diisi dengan nilai lebih besar dari nol</p>
                )}
              </div>
              <XMarkIcon className="h-4 mt-2 text-zinc-500" />
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
                  className={`w-full px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 disabled:bg-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-400 ${
                    isValid.lebar
                      ? "bg-white border-zinc-300 focus:ring-black"
                      : "bg-red-100 border-red-300 focus:ring-red-300"
                  }`}
                  disabled={verified}
                />
                {isValid.lebar ? null : (
                  <p className="text-[10px] text-red-500">wajib diisi dengan nilai lebih besar dari nol</p>
                )}
              </div>
              <XMarkIcon className="h-4 mt-2 text-zinc-500" />
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
                  className={`w-full px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 disabled:bg-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-400 ${
                    isValid.tinggi
                      ? "bg-white border-zinc-300 focus:ring-black"
                      : "bg-red-100 border-red-300 focus:ring-red-300"
                  }`}
                  disabled={verified}
                />
                {isValid.tinggi ? null : (
                  <p className="text-[10px] text-red-500">wajib diisi dengan nilai lebih besar dari nol</p>
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
              className="bg-white border-[1px] border-zinc-300 p-2 rounded-md disabled:bg-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-400"
              disabled={verified}
            >
              <option value="4000">Konversi 4000</option>
              <option value="5000">Konversi 5000</option>
              <option value="6000">Konversi 6000</option>
            </select>
            <ArrowsRightLeftIcon className="h-5" />
            <p
              className={`w-fit h-10 flex self-center items-center px-2 text-sm rounded-md border-[1px] bg-black/10 capitalize ${
                verified ? "text-zinc-400" : "text-zinc-900"
              }`}
            >
              {detailPaket.volume.berat.toLocaleString("id-ID", { maximumFractionDigits: 2 })} Kg
            </p>
          </section>
          <section className="w-full flex flex-col">
            <div className="w-full flex flex-col">
              <h3 className="font-semibold text-sm">Berat Dikenakan</h3>
              <p
                className={`w-full h-10 flex items-center px-2 text-sm rounded-md border-[1px] bg-black/10 capitalize ${
                  verified ? "text-zinc-400" : "text-zinc-900"
                }`}
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
              className={`px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none focus:ring-1 disabled:bg-zinc-200 disabled:cursor-not-allowed disabled:text-zinc-400 first-letter:${
                touchedFields.keterangan
                  ? isValid.keterangan
                    ? "bg-white border-zinc-300 focus:ring-black"
                    : "bg-red-100 border-red-300 focus:ring-red-300"
                  : "bg-white border-zinc-300 focus:ring-black"
              }`}
              placeholder="Ketik isi paket / jenis barang"
              autoComplete="off"
              disabled={verified}
            />
            {touchedFields.keterangan ? (
              isValid.keterangan ? null : (
                <p className="text-[10px] text-red-500">
                  wajib diisi, tidak boleh kosong (maksimal 30 karakter)
                </p>
              )
            ) : null}
          </section>
          <div className="w-full flex flex-wrap gap-2 items-center justify-between sm:justify-end">
            <button
              className={`w-[30%] sm:w-28 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 font-semibold text-white px-4 py-2 rounded-md  disabled:bg-zinc-300 disabled:text-zinc-100 disabled:cursor-not-allowed`}
              disabled={!verified}
              onClick={handleSimpan}
            >
              <PencilSquareIcon className="h-5 hidden sm:block" />
              <p>Edit</p>
            </button>
            <button
              className={`w-[30%] sm:w-28 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 font-semibold text-white px-4 py-2 rounded-md  disabled:bg-zinc-300 disabled:text-zinc-100 disabled:cursor-not-allowed`}
              onClick={handleHapus}
            >
              <TrashIcon className=" h-5 hidden sm:block" />
              <p>Hapus</p>
            </button>
            <button
              className={`w-[30%] sm:w-28 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600
              } font-semibold text-white px-4 py-2 rounded-md  disabled:bg-zinc-300 disabled:text-zinc-100 disabled:cursor-not-allowed`}
              onClick={handleSimpan}
              disabled={!Object.values(isValid).every((value) => value) || verified}
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
