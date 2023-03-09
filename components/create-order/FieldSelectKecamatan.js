import { useEffect, useState } from "react";
import Select from "react-select";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const FieldSelectKecamatan = (props) => {
  const { id, name, label } = props;
  const { setInitialValues, initialValues, setValidFields } = props.meta;
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if ((initialValues.layanan, initialValues.cabangAsal)) {
      if (selectedOption?.value[initialValues.layanan]) {
        setIsValid(true);
        setErrorMessage("");
        setValidFields((prevState) => ({ ...prevState, [name]: "valid" }));
      } else {
        setIsValid(false);
        setErrorMessage(`Tujuan kecamatan tesebut belum tercover oleh layanan ${initialValues.layanan}`);
        setValidFields((prevState) => ({ ...prevState, [name]: "error" }));
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    setSelectedOption(null);
    setInitialValues((prevState) => ({
      ...prevState,
      tujuan: "",
      cabangCoveran: "",
      ongkirPerkilo: "",
      subtotalOngkir: "",
      diskon: 0,
      ongkirSetelahDiskon: "",
    }));
  }, [initialValues.cabangAsal]);

  useEffect(() => {
    setSelectedOption(null);
    setInitialValues((prevState) => ({
      ...prevState,
      tujuan: "",
      cabangAsal: "",
      cabangCoveran: "",
      ongkirPerkilo: "",
      subtotalOngkir: "",
      diskon: 0,
      ongkirSetelahDiskon: "",
    }));
  }, [initialValues.layanan]);

  const loadOptions = (searchValue) => {
    if (initialValues.cabangAsal && searchValue.length > 2) {
      fetch(`/api/ongkir/${initialValues.cabangAsal}/${searchValue}`)
        .then((res) => {
          if (!res.ok) {
            console.log("404: DATA TIDAK DITEMUKAN!");
            return;
          } else {
            return res.json();
          }
        })
        .then((data) =>
          setFilteredOptions(
            data.kecamatan.map((d) => ({
              label: `${d.kec} - ${d.ibukota} - ${d.prov}`,
              value: d,
            }))
          )
        );
    }
  };

  const blurHandler = (e) => setIsTouched(true);

  const changeHandler = (e) => {
    setSelectedOption(e);
    setFilteredOptions([]);

    const newInitialValues = {
      ...initialValues,
      cabangCoveran: e.value.cov,
      tujuan: e.value,
      ongkirPerkilo:
        initialValues.layanan === "cargo"
          ? e.value.cargo
          : initialValues.layanan === "express"
          ? e.value.express
          : "",
      subtotalOngkir:
        initialValues.layanan === "cargo" && initialValues.paket
          ? e.value.cargo *
            (initialValues.paket.filter((d) => d.verified).length > 0
              ? initialValues.paket
                  .filter((d) => d.verified)
                  .reduce((acc, val) => acc + Number(val.beratDikenakan), 0) >= 10
                ? initialValues.paket
                    .filter((d) => d.verified)
                    .reduce((acc, val) => acc + Number(val.beratDikenakan), 0)
                : 10
              : 0)
          : initialValues.layanan === "express" && initialValues.paket
          ? e.value.express *
            initialValues.paket
              .filter((d) => d.verified)
              .reduce((acc, val) => acc + Number(val.beratDikenakan), 0)
          : "",
    };

    setInitialValues(newInitialValues);
  };

  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#ffdada" }),
  };

  return (
    <div className="w-full flex flex-col md:col-start-1 md:row-start-3 xl:col-start-1 xl:row-start-3">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <Select
        instanceId={id}
        placeholder="-- Pilih Kecamatan Tujuan --"
        options={filteredOptions}
        value={selectedOption}
        onInputChange={loadOptions}
        onChange={changeHandler}
        onBlur={blurHandler}
        styles={isTouched && !isValid ? customStyles : ""}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: "#ddd",
            primary: "#000",
          },
        })}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          NoOptionsMessage: () => (
            <p style={{ fontSize: "12px", color: "#555", textAlign: "Center" }}>
              Ketik 3 huruf pertama kecamatan tujuan
            </p>
          ),
        }}
      />
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-500 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>{errorMessage ? errorMessage : "Wajib diisi, tidak boleh kosong"}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldSelectKecamatan;
