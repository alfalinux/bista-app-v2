import { useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const FieldInputAlamat = (props) => {
  const { id, name, label } = props;
  const { setInitialValues, setValidFields } = props.meta;
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const removeNonAlphaChar = (val) => val.replace(/[^0-9a-zA-Z\s@'_,.:&\/()\-]/g, "");

  const handleChange = (e) => {
    setValue(removeNonAlphaChar(e.target.value));
    e.target.value.length >= 2 && e.target.value.length <= 150 ? setIsValid(true) : setIsValid(false);
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

      <textarea
        id={id}
        name={name}
        value={value}
        rows="3"
        onChange={handleChange}
        onBlur={handleBlur}
        className={`px-2 py-1.5 text-sm rounded-md border-[1px] focus:outline-none disabled:bg-black/10 capitalize ${
          isTouched && !isValid
            ? "bg-red-100 focus:ring-1 focus:ring-red-500 border-red-300 "
            : "bg-white focus:ring-1  focus:ring-black border-zinc-300"
        }`}
        spellCheck={false}
        autoComplete="off"
        placeholder="Ketik Alamat Lengkap"
      />
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-500 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>Wajib diisi maksimal 150 karakter</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldInputAlamat;
