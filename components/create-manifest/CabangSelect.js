import { useRouter } from "next/router";
import { useState } from "react";

const CabangSelect = (props) => {
  const router = useRouter();
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

  return (
    <form className="w-full p-4 bg-white flex flex-col gap-4 border-[1px] border-gray-300 shadow-md rounded-lg">
      {/* Select Cabang Asal */}
      <div className="w-full flex gap-2 items-center">
        <label className="w-52 text-sm text-gray-800" htmlFor="cabangAsal">
          Cabang Asal
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 rounded-md"
          name="cabangAsal"
          id="cabangAsal"
          value={cabangAsal}
          onChange={cabangAsalChange}
        >
          <option value=""></option>
          <option value="jakarta">JAKARTA</option>
          <option value="surabaya">SURABAYA</option>
        </select>
      </div>

      {/* Select Cabang Tujuan */}
      <div className="w-full flex gap-2 items-center">
        <label className="w-52 text-sm text-gray-800" htmlFor="cabangTujuan">
          Kota Tujuan
        </label>
        <select
          className="w-full p-2 text-sm text-gray-800 bg-gray-100 rounded-md"
          name="cabangTujuan"
          id="cabangTujuan"
          value={cabangTujuan}
          onChange={cabangTujuanChange}
        >
          <option value=""></option>
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
