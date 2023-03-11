import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import FieldDetailPaket from "./FieldDetailPaket";

const ContainerDetailPaket = (props) => {
  const { initialValues, setInitialValues, setValidFields } = props.meta;
  const [counterID, setCounterID] = useState(1);
  const [initPaket, setInitPaket] = useState([
    {
      id: 1,
      beratAktual: 1,
      volume: { panjang: 1, lebar: 1, tinggi: 1, konversi: 4000, berat: 1 },
      beratDikenakan: 1,
      keterangan: "",
      verified: false,
    },
  ]);

  const totalBeratAktual = initPaket
    .filter((d) => d.verified)
    .reduce((acc, val) => acc + Number(val.beratAktual), 0);

  const totalBeratDikenakan =
    initPaket.filter((d) => d.verified).reduce((acc, val) => acc + Number(val.beratDikenakan), 0) >= 10
      ? initPaket.filter((d) => d.verified).reduce((acc, val) => acc + Number(val.beratDikenakan), 0)
      : initPaket.filter((d) => d.verified).reduce((acc, val) => acc + Number(val.beratDikenakan), 0) == 0
      ? 0
      : 10;

  const addChangeHandler = () => {
    setInitPaket((prevInitPaket) => [
      ...prevInitPaket,
      {
        id: counterID + 1,
        beratAktual: 1,
        volume: { panjang: 1, lebar: 1, tinggi: 1, konversi: 4000, berat: 0 },
        beratDikenakan: 1,
        keterangan: "",
        verified: false,
      },
    ]);
    setCounterID(counterID + 1);
  };

  useEffect(() => {
    if (initPaket.every((data) => data.verified)) {
      setInitialValues((prevState) => ({
        ...prevState,
        paket: initPaket,
        subtotalOngkir: totalBeratDikenakan * initialValues.ongkirPerkilo,
        ongkirSetelahDiskon:
          totalBeratDikenakan * initialValues.ongkirPerkilo * (1 - initialValues.diskon / 100),
      }));
      setValidFields((prevState) => ({ ...prevState, paket: "valid" }));
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        paket: initPaket.filter((d) => d.verified),
        subtotalOngkir: totalBeratDikenakan * initialValues.ongkirPerkilo,
        ongkirSetelahDiskon:
          totalBeratDikenakan * initialValues.ongkirPerkilo * (1 - initialValues.diskon / 100),
      }));
      setValidFields((prevState) => ({ ...prevState, paket: "error" }));
    }
  }, [initPaket]);
  return (
    <div className="w-full flex flex-col gap-4">
      {initPaket.map((val, idx) => (
        <FieldDetailPaket key={idx} index={idx} id={val.id} setInitPaket={setInitPaket} />
      ))}
      <button
        className="w-40 px-4 py-2 flex items-center justify-center gap-1 bg-sky-500 font-semibold text-white rounded-md self-end hover:bg-sky-600 disabled:bg-zinc-300 disabled:text-zinc-100 disabled:cursor-not-allowed"
        onClick={addChangeHandler}
        disabled={!initPaket.every((data) => data.verified)}
      >
        <SquaresPlusIcon className="h-5" />
        <p>Tambah Paket</p>
      </button>
      <div className="w-full border-t-2 border-dashed border-zinc-300">
        <table className="table-auto border border-white/0 border-separate border-spacing-x-2">
          <tbody>
            <tr>
              <td>Total Paket</td>
              <td>:</td>
              <td className="font-semibold text-right">{initPaket.filter((d) => d.verified).length} Koli</td>
            </tr>
            <tr>
              <td>Total Berat Aktual</td>
              <td>:</td>
              <td className="font-semibold text-right">
                {totalBeratAktual.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                Kg
              </td>
            </tr>
            <tr>
              <td>Total Berat Dikenakan</td>
              <td>:</td>
              <td className="font-semibold text-right">
                {totalBeratDikenakan.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                Kg
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContainerDetailPaket;