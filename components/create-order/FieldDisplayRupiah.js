const FieldDisplayRupiah = (props) => {
  return (
    <div className={`${props.className} w-full flex flex-col`}>
      <h3 className="font-semibold text-sm">{props.label}</h3>
      <p className="px-2 py-1.5 text-sm text-gray-500 rounded-md border-[1px] bg-gray-200 dark:bg-gray-800 dark:border-gray-600">
        Rp. {parseInt(props.value).toLocaleString("id-ID", { maximumFractionDigits: 0 })} ,-
      </p>
    </div>
  );
};

export default FieldDisplayRupiah;
