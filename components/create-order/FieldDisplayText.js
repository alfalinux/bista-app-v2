const FieldDisplayText = (props) => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="font-semibold text-sm">{props.label}</h3>
      <p className="h-10 px-3 py-2 text-sm dark:text-gray-400 rounded-md border-[1px] dark:border-gray-600 bg-gray-200 dark:bg-gray-800 capitalize">
        {props.value}
      </p>
    </div>
  );
};

export default FieldDisplayText;
