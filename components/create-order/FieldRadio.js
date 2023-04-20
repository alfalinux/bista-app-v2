import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const FieldRadio = (props) => {
  const { name, label } = props;
  const { initialValues, setInitialValues, setValidFields } = props.meta;
  const [isValid, setIsValid] = useState(false);

  const radioChangeHandler = (e) => {
    if (e.target.checked) {
      setIsValid(true);
      setInitialValues((prevState) => ({ ...prevState, [name]: e.target.value }));
      setValidFields((prevState) => ({ ...prevState, [name]: "valid" }));
    } else {
      setIsValid(false);
      setInitialValues((prevState) => ({ ...prevState, [name]: "" }));
      setValidFields((prevState) => ({ ...prevState, [name]: "error" }));
    }
  };

  return (
    <div className="w-full flex flex-col md:col-start-2 md:row-start-1 xl:col-start-2 xl:row-start-1">
      <label htmlFor={name} className="font-semibold text-sm">
        {label}
      </label>
      <section className="flex flex-col">
        <div className="flex gap-4">
          <div className="flex px-2 items-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <input
              type="radio"
              id="cash"
              name="pembayaran"
              className="p-2 hover:cursor-pointer"
              value="cash"
              onChange={radioChangeHandler}
            />
            <label htmlFor="cash" className="p-2 hover:cursor-pointer">
              Cash
            </label>
          </div>
          <div className="flex px-2 items-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <input
              type="radio"
              id="cod"
              name="pembayaran"
              value="cod"
              className="p-2 hover:cursor-pointer"
              onChange={radioChangeHandler}
            />
            <label htmlFor="cod" className="p-2 hover:cursor-pointer">
              COD
            </label>
          </div>
          <div className="flex px-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <input
              type="radio"
              id="top"
              name="pembayaran"
              value="top"
              className="p-2 hover:cursor-pointer"
              onChange={radioChangeHandler}
            />
            <label htmlFor="top" className="p-2 hover:cursor-pointer">
              TOP
            </label>
          </div>
        </div>
        {initialValues.tujuan && !isValid ? (
          <div className="flex gap-1 items-center text-[10px] text-red-600 ml-1.5">
            <ExclamationCircleIcon className="h-5" />
            <p>Wajib pilih metode pembayaran</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default FieldRadio;
