import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

const FieldSelectLayanan = (props) => {
  const { id, name, label, options } = props;
  const { setInitialValues, setValidFields } = props.meta;
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const changeHandler = (e) => {
    setIsValid(true);
    setValidFields((prevState) => ({ ...prevState, [name]: "valid" }));
    setInitialValues((prevState) => ({ ...prevState, [name]: e.value }));
  };

  const blurHandler = (e) => setIsTouched(true);

  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#ffdada" }),
  };

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <Select
        options={options}
        instanceId={id}
        placeholder="-- Pilih Layanan --"
        onChange={changeHandler}
        onBlur={blurHandler}
        styles={isTouched && !isValid ? customStyles : ""}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: { ...theme.colors, primary25: "#ddd", primary: "#000" },
        })}
      />
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-500 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>Wajib pilih salah satu, tidak boleh kosong</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldSelectLayanan;
