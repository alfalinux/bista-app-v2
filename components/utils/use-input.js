import { useState } from "react";

const useInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validator(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const changeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const blurHandler = (e) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    changeHandler,
    blurHandler,
  };
};

export default useInput;
