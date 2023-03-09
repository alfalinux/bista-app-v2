const InputField = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="text-sm text-zinc-700">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onWheel={props.onWheel}
        className={`border-[1px] border-zinc-300 rounded-sm p-1 text-[13px] focus:outline-none focus:ring-1  ${
          props.hasError ? "bg-red-100 focus:ring-red-500" : "bg-white focus:ring-blue-300"
        }`}
      />
      {props.hasError ? <p className="text-red-500 text-[8px]">*{props.errorMessage}</p> : null}
    </div>
  );
};

export default InputField;
