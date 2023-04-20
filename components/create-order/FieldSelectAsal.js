import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { useTheme } from "next-themes";

const FieldSelectAsal = (props) => {
  const { theme: modeTheme } = useTheme();
  const { id, name, label, options } = props;
  const { initialValues, setInitialValues, setValidFields } = props.meta;
  const [selectedOption, setSelectedOption] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const changeHandler = (e) => {
    setSelectedOption(e);
    setIsValid(true);
    setValidFields((prevState) => ({ ...prevState, [name]: "valid" }));
    setInitialValues((prevState) => ({ ...prevState, [name]: e.value }));
  };

  const blurHandler = (e) => setIsTouched(true);

  useEffect(() => {
    setSelectedOption(null);
    setIsValid(false);
    setValidFields((prevState) => ({ ...prevState, [name]: "error" }));
    setInitialValues((prevState) => ({ ...prevState, [name]: "" }));
  }, [initialValues.layanan]);

  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: `${
        isTouched && !isValid
          ? modeTheme === "dark"
            ? "#7f1d1d"
            : "#fee2e2"
          : modeTheme === "dark"
          ? "#374151"
          : "#fff"
      }`,
      borderColor: state.isFocused
        ? `transparent`
        : `${isTouched && !isValid ? "#dc2626" : modeTheme === "dark" ? "#374151" : "#cbd5e1"}`,
      boxShadow: state.isFocused
        ? `${
            isTouched && !isValid
              ? "0 0 0 2px #dc2626"
              : modeTheme === "dark"
              ? "0 0 0 2px #cbd5e1"
              : "0 0 0 2px #000"
          }`
        : "none",
      ":hover": { borderColor: state.isFocused ? "transparent" : "#94a3b8" },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: `${modeTheme === "dark" ? "#374151" : "#fff"}`,
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused ? `${modeTheme === "dark" ? "#64748b" : "#e2e8f0"}` : "transparent",
      color: modeTheme === "dark" ? (state.isFocused ? "#e2e8f0" : "#64748b") : "#64748b",
      ":hover":
        modeTheme === "dark"
          ? { backgroundColor: "#64748b", color: "#e2e8f0", cursor: "pointer" }
          : { backgroundColor: "#e2e8f0", color: "#64748b", cursor: "pointer" },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: `${modeTheme === "dark" ? "#e2e8f0" : "#1e293b"}`,
    }),
    input: (styles) => ({
      ...styles,
      color: `${modeTheme === "dark" ? "#e2e8f0" : "#1e293b"}`,
    }),
  };

  return (
    <div className="w-full flex flex-col md:col-start-1 md:row-start-2 xl:col-start-1 xl:row-start-2">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <Select
        options={options}
        instanceId={id}
        placeholder="-- Pilih Cabang Asal --"
        value={selectedOption}
        onChange={initialValues.layanan && changeHandler}
        onBlur={blurHandler}
        styles={customStyles}
      />
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-600 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>Wajib pilih salah satu, tidak boleh kosong</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldSelectAsal;
