import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const FieldInputBiaya = (props) => {
  const { id, name, label } = props;
  const { setInitialValues, setValidFields } = props.meta;
  const [value, setValue] = useState(0);
  const [biaya, setBiaya] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleChange = (e) => {
    setValue(addCommas(removeNonNumeric(e.target.value)));
    e.target.value ? setIsValid(true) : setIsValid(false);
  };

  const handleBlur = (e) => {
    setIsTouched(true);
    setBiaya(Number(e.target.value.split(".").join("")));
  };

  useEffect(() => {
    if (isValid) {
      setInitialValues((prevState) => ({ ...prevState, [name]: biaya }));
      setValidFields((prevState) => ({ ...prevState, [name]: "valid" }));
    } else {
      setInitialValues((prevState) => ({ ...prevState, [name]: "" }));
      setValidFields((prevState) => ({ ...prevState, [name]: "error" }));
    }
  }, [biaya]);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor="biayaPacking" className="font-semibold text-sm">
        {label}
      </label>
      <div
        className={`w-full text-sm rounded-md border-[1px] overflow-hidden px-2 flex gap-1 items-center ${
          isTouched && !isValid ? "bg-red-100 border-red-300" : "bg-white border-zinc-300"
        }`}
      >
        <span>Rp.</span>
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-1.5 text-start bg-transparent focus:outline-none"
        />
        <span>,-</span>
      </div>
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-500 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>Wajib diisi, tidak boleh dikosongkan</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldInputBiaya;
