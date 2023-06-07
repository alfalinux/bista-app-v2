import generateDate from "@/helpers/generateDate";

const TableTracker = ({ dataResi }) => {
  return (
    <div className="w-full flex flex-col gap-2 sm:flex-row sm:flex-wrap items-start justify-start p-4 bg-white dark:bg-gray-800 rounded-md shadow-md border-[1px] border-gray-300 dark:border-gray-400 text-sm text-left">
      {dataResi.map((d) => (
        <div className="w-full flex items-center justify-start gap-2 border bg-gray-700 p-4">
          <h3 className="font-semibold text-base">{generateDate(d.at)}</h3>
          <div className="flex flex-col items-center justify-center">
            <p>{d.is}</p>
            <p>{d.in}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTracker;
