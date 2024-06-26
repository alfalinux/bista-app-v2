import { useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { validasiSpecialChar } from "../utils/use-validate";

const FieldInputAlamat = (props) => {
  const { id, name, label } = props;
  const { setInitialValues, setValidFields } = props.meta;
  const [value, setValue] = useState("");
  const [validasi, setValidasi] = useState({ isValid: false, message: "Wajib diisi / tidak boleh kosong!" });
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setValidasi(() => validasiSpecialChar(e.target.value, 150));
  };

  const handleBlur = (e) => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (validasi.isValid) {
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
        className={`px-2 py-1.5 text-sm text-gray-600 dark:text-gray-200 rounded-md border-[1px] focus:outline-none disabled:bg-gray-200 ${
          isTouched && !validasi.isValid
            ? "bg-red-100 dark:bg-red-900 focus:ring-1 focus:ring-red-600 border-red-600 "
            : "bg-white dark:bg-gray-700 focus:ring-1  focus:ring-black dark:focus:ring-gray-200 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-gray-200"
        }`}
        spellCheck={false}
        autoComplete="off"
        placeholder="Ketik Alamat Lengkap"
      />
      {isTouched && !validasi.isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-600 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>{validasi.message}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldInputAlamat;
