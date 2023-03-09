import { ArrowsRightLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const FieldInputDiskon = (props) => {
  const { initialValues, setInitialValues, setValidFields } = props.meta;
  const [diskon, setDiskon] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const blurChangeHandler = (e) => {
    setIsTouched(true);
  };

  const inputChangeHandler = (e) => {
    setDiskon(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 100 && e.target.value !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      setInitialValues((prevState) => ({
        ...prevState,
        diskon: diskon,
        ongkirSetelahDiskon: initialValues.subtotalOngkir * (1 - diskon / 100),
      }));
      setValidFields((prevState) => ({ ...prevState, diskon: "valid" }));
    } else {
      setInitialValues((prevState) => ({ ...prevState, diskon: 0, ongkirSetelahDiskon: "" }));
      setValidFields((prevState) => ({ ...prevState, diskon: "error" }));
    }
  }, [diskon]);

  useEffect(() => {
    setDiskon(0);
    setInitialValues((prevState) => ({
      ...prevState,
      ongkirSetelahDiskon: initialValues.subtotalOngkir * (1 - diskon / 100),
    }));
  }, [initialValues.tujuan]);

  return (
    <div className={`${props.className} w-full flex flex-col`}>
      <label htmlFor="diskon" className="font-semibold text-sm">
        Diskon
      </label>
      <div className={`w-full flex items-center gap-4`}>
        <div
          className={`w-[40%] md:w-fit text-sm rounded-md border-[1px] overflow-hidden px-2 flex gap-1 items-center ${
            isTouched && !isValid ? "bg-red-100 border-red-300" : "bg-white border-zinc-300"
          }`}
        >
          <input
            id="diskon"
            name="diskon"
            value={diskon}
            onBlur={blurChangeHandler}
            onChange={inputChangeHandler}
            type="number"
            onWheel={(e) => e.target.blur()}
            className="w-full py-1.5 text-end bg-transparent focus:outline-none"
          />
          <span>%</span>
        </div>
        <ArrowsRightLeftIcon className="h-5" />
        <div className={`w-[40%] md:w-fit text-sm rounded-md border-[1px] px-2 py-1.5 bg-zinc-200`}>
          <p>
            Rp.{" "}
            {isValid
              ? Math.round((initialValues.subtotalOngkir * diskon) / 100).toLocaleString("id-ID")
              : null}{" "}
            ,-
          </p>
        </div>
      </div>
      {isTouched && !isValid ? (
        <div className="flex gap-1 items-center text-[10px] text-red-500 mt-1">
          <ExclamationCircleIcon className="h-5" />
          <p>Wajib diisi, range nilai 0% s/d 100%</p>
        </div>
      ) : null}
    </div>
  );
};

export default FieldInputDiskon;
