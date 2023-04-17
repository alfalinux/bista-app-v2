const FieldDisplayText = (props) => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="font-semibold text-sm">{props.label}</h3>
      <p className="h-9 px-3 py-1.5 text-sm rounded-md border-[1px] bg-gray-200 capitalize">{props.value}</p>
    </div>
  );
};

export default FieldDisplayText;
