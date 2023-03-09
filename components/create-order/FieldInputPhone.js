import { useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const FieldInputPhone = (props) => {
  const { id, name, label } = props;
  const { setInitialValues, setValidFields } = props.meta;
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleChange = (e) => {
    setValue(removeNonNumeric(e.target.value));
    e.target.value.length >= 5 && e.target.value.length <= 15 ? setIsValid(true) : setIsValid(false);
  };

  const handleBlur = (e) => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (isValid) {
      setInitialValues((prevState) => ({ ...prevState, [name]: value }));
      setValidFields((prevState) => ({ ...prevState, [name]: "valid" }));
    } else {
      setInitialValues((prevState) => ({ ...prevState, [name]: "" }));
      setValidFields((prevState) => ({ ...prevState, [name]: "error" }));
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none disabled:bg-black/10 capitalize ${
          isTouched && !isValid
            ? "bg-red-100 focus:ring-1 focus:ring-red-500 border-red-300 "
            : "bg-white focus:ring-1  focus:ring-black border-zinc-300"
        }`}
        spellCheck={false}
        autoComplete="off"
        placeholder="Ketik Nomor Telp/Hp yang aktif"
      />
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-500 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>Wajib diisi dengan nomor telp/hp yang valid</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldInputPhone;
