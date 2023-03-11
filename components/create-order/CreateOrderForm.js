import { useEffect, useState } from "react";
import { cabangOptions, layananOptions, tujuanOptions } from "../utils/use-option";
import ContainerDetailPaket from "./ContainerDetailPaket";
import FieldDisplayRupiah from "./FieldDisplayRupiah";
import FieldDisplayText from "./FieldDisplayText";
import FieldInputAlamat from "./FieldInputAlamat";
import FieldInputBiaya from "./FieldInputBiaya";
import FieldInputDiskon from "./FieldInputDiskon";
import FieldInputName from "./FieldInputName";
import FieldInputPhone from "./FieldInputPhone";
import FieldRadio from "./FieldRadio";
import FieldSelectAsal from "./FieldSelectAsal";
import FieldSelectKecamatan from "./FieldSelectKecamatan";
import FieldSelectLayanan from "./FieldSelectLayanan";
import ModalCreateOrder from "./ModalCreateOrder";

const CreateOrderContainer = (props) => {
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const [validFields, setValidFields] = useState(props.validation);
  const [allFieldsIsValid, setAllFieldIsValid] = useState(false);
  const [showResi, setShowResi] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setShowResi(true);
  };

  useEffect(() => {
    Object.values(validFields).every((value) => value === "valid")
      ? setAllFieldIsValid(true)
      : setAllFieldIsValid(false);
  }, [validFields]);

  useEffect(() => {
    setInitialValues((prevState) => ({
      ...prevState,
      grandTotal:
        Number(prevState.ongkirSetelahDiskon) +
        Number(prevState.biayaPacking) +
        Number(prevState.biayaAsuransi) +
        Number(prevState.biayaSurat),
    }));
  }, [
    initialValues.subtotalOngkir,
    initialValues.ongkirSetelahDiskon,
    initialValues.biayaPacking,
    initialValues.biayaAsuransi,
    initialValues.biayaSurat,
  ]);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full lg:overflow-hidden px-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:flex lg:flex-col xl:grid xl:grid-cols-2"
      >
        {/* --DETAIL PENGIRIM-- */}
        <fieldset className="bg-white border-[1px] border-zinc-300 shadow-lg shadow-black/10 rounded-md p-4 text-sm text-zinc-600 flex flex-col gap-4">
          <legend className="font-bold bg-black rounded-md px-2 py-1 text-white">Data Pengirim</legend>

          <FieldInputPhone
            id="nohpPengirim"
            name="nohpPengirim"
            label="No Telp/Hp Pengirim"
            meta={{ setInitialValues, setValidFields }}
          />

          <FieldInputName
            id="namaPengirim"
            name="namaPengirim"
            label="Nama Pengirim"
            meta={{
              setInitialValues,
              setValidFields,
            }}
          />

          <FieldInputAlamat
            id="alamatPengirim"
            name="alamatPengirim"
            label="Alamat Pengirim"
            meta={{
              setInitialValues,
              setValidFields,
            }}
          />
        </fieldset>

        {/* --DETAIL PENERIMA-- */}
        <fieldset className="bg-white border-[1px] border-zinc-300 shadow-lg shadow-black/10 rounded-md p-4 text-sm text-zinc-600 flex flex-col gap-4">
          <legend className="font-bold bg-black rounded-md px-2 py-1 text-white">Data Penerima</legend>

          <FieldInputPhone
            id="nohpPenerima"
            name="nohpPenerima"
            label="No Telp/Hp Penerima"
            meta={{ setInitialValues, setValidFields }}
          />

          <FieldInputName
            id="namaPenerima"
            name="namaPenerima"
            label="Nama Penerima"
            meta={{
              setInitialValues,
              setValidFields,
            }}
          />

          <FieldInputAlamat
            id="alamatPenerima"
            name="alamatPenerima"
            label="Alamat Penerima"
            meta={{
              setInitialValues,
              setValidFields,
            }}
          />
        </fieldset>

        {/* --DETAIL LAYANAN-- */}
        <fieldset className="bg-white border-[1px] border-zinc-300 shadow-lg shadow-black/10 rounded-md p-4 text-sm text-zinc-600 flex flex-col gap-4 md:col-span-2 md:grid md:grid-cols-2 lg:flex lg:flex-col xl:col-span-2 xl:grid xl:grid-cols-2">
          <legend className="font-bold bg-black rounded-md px-2 py-1 text-white">Detail Layanan</legend>

          <FieldSelectLayanan
            id="layanan"
            name="layanan"
            label="Layanan"
            options={layananOptions()}
            meta={{ setInitialValues, setValidFields }}
          />

          <FieldSelectAsal
            id="cabangAsal"
            name="cabangAsal"
            label="Cabang Asal"
            options={cabangOptions()}
            meta={{ initialValues, setInitialValues, setValidFields }}
          />

          <FieldSelectKecamatan
            id="tujuan"
            name="tujuan"
            label="Tujuan"
            options={tujuanOptions}
            meta={{ setInitialValues, initialValues, setValidFields }}
          />

          <FieldDisplayText value={initialValues.cabangCoveran} label="Cabang Coveran" />

          <FieldRadio
            name="pembayaran"
            label="Metode Pembayaran"
            meta={{
              initialValues,
              setInitialValues,
              setValidFields,
            }}
          />
        </fieldset>

        {/* --DETAIL PAKET-- */}
        <fieldset className="w-full bg-white border-[1px] border-zinc-300 shadow-lg shadow-black/10 rounded-md p-4 text-sm text-zinc-600 flex flex-col gap-4 md:col-span-2 xl:col-span-2">
          <legend className="font-bold bg-black rounded-md px-2 py-1 text-white">Detail Paket</legend>

          <ContainerDetailPaket
            meta={{
              initialValues,
              setInitialValues,
              setValidFields,
            }}
          />
        </fieldset>

        {/* --DETAIL BIAYA-- */}
        <fieldset className="bg-white border-[1px] border-zinc-300 shadow-lg shadow-black/10 rounded-md p-4 text-sm text-zinc-600 flex flex-col gap-4 md:grid md:grid-cols-2 md:col-span-2 lg:flex lg:flex-col xl:grid xl:grid-cols-2 xl:col-span-2">
          <legend className="font-bold bg-black rounded-md px-2 py-1 text-white">Detail Biaya</legend>
          <FieldDisplayRupiah
            value={initialValues.ongkirPerkilo}
            label="Ongkir per-Kg"
            className="md:row-start-1 xl:row-start-1"
          />
          <FieldDisplayRupiah
            value={initialValues.subtotalOngkir}
            label="Subtotal Ongkir"
            className="md:row-start-2 xl:row-start-2"
          />
          <FieldInputDiskon
            meta={{ initialValues, setInitialValues, setValidFields }}
            className="xl:row-start-3 md:row-start-3"
          />
          <FieldDisplayRupiah
            value={initialValues.ongkirSetelahDiskon}
            label="Ongkir Setelah Diskon"
            className="md:row-start-4 xl:row-start-4"
          />
          <FieldInputBiaya
            label="Biaya Packing"
            id="biayaPacking"
            name="biayaPacking"
            meta={{ setInitialValues, setValidFields }}
          />
          <FieldInputBiaya
            label="Biaya Asuransi"
            id="biayaAsuransi"
            name="biayaAsuransi"
            meta={{ setInitialValues, setValidFields }}
          />
          <FieldInputBiaya
            label="Biaya Surat"
            id="biayaSurat"
            name="biayaSurat"
            meta={{ setInitialValues, setValidFields }}
          />
          <FieldDisplayRupiah value={initialValues.grandTotal} label="Grand Total Ongkir" />
        </fieldset>

        <button
          type="submit"
          disabled={!allFieldsIsValid}
          className="bg-black px-4 py-2 md:mb-4 font-semibold text-sm text-white rounded-lg border-[1px] border-zinc-300 shadow-lg shadow-black/10 hover:bg-red-500 focus:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-400 md:col-span-2 xl:col-span-2"
        >
          Create Order
        </button>
      </form>
      {showResi ? <ModalCreateOrder data={initialValues} closeModal={() => setShowResi(false)} /> : null}
    </>
  );
};

export default CreateOrderContainer;
