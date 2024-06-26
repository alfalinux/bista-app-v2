import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CabangSelect = (props) => {
  const { data } = useSession();
  const router = useRouter();
  const listCabangAsal = listCabang();
  const [cabangAsal, setCabangAsal] = useState("");
  const [cabangTujuan, setCabangTujuan] = useState("");

  const cabangAsalChange = (e) => {
    props.isLoading(true);
    setCabangAsal(e.target.value);
    router.replace(`${router.pathname}?cabangAsal=${e.target.value}`);
    setCabangTujuan("");
    props.onSelectedTujuan("");
    props.onResetCheckedResi();
  };
  const cabangTujuanChange = (e) => {
    setCabangTujuan(e.target.value);
    props.onSelectedTujuan(e.target.value);
    props.onResetCheckedResi();
  };

  useEffect(() => {
    if (!router.query.cabangAsal) {
      setCabangAsal("");
    }
  }, [router]);
  return (
    <form className="w-full p-4 bg-white dark:bg-gray-800 flex flex-col gap-4 border-[1px] border-gray-300 shadow-md rounded-lg">
      {/* Select Cabang Asal */}
      <div className="w-full flex gap-2 items-center">
        <label className="w-52 text-sm text-gray-800 dark:text-gray-200" htmlFor="cabangAsal">
          Cabang Asal
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-md"
          name="cabangAsal"
          id="cabangAsal"
          value={cabangAsal}
          onChange={cabangAsalChange}
        >
          {data.posisiDesc === "direktur" ? (
            <>
              <option value="">-- Pilih Cabang Asal --</option>
              {listCabangAsal.map((data, index) => (
                <option key={index} value={data.cab}>
                  {data.cab.toUpperCase()}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value="">-- Pilih Cabang Asal --</option>
              <option value={data.cabangDesc}>{data.cabangDesc.toUpperCase()}</option>
            </>
          )}
        </select>
      </div>

      {/* Select Cabang Tujuan */}
      <div className="w-full flex gap-2 items-center">
        <label className="w-52 text-sm text-gray-800 dark:text-gray-200" htmlFor="cabangTujuan">
          Kota Tujuan
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-md"
          name="cabangTujuan"
          id="cabangTujuan"
          value={cabangTujuan}
          onChange={cabangTujuanChange}
        >
          <option value="">-- Pilih Cabang Tujuan --</option>
          {props.tujuan &&
            props.tujuan.map((data, index) => (
              <option value={data} key={index}>
                {data.toUpperCase()}
              </option>
            ))}
        </select>
      </div>
    </form>
  );
};

export default CabangSelect;
