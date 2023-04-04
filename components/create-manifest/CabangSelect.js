import { useRouter } from "next/router";
import { useState } from "react";

const CabangSelect = (props) => {
  const router = useRouter();
  const [cabangAsal, setCabangAsal] = useState("");
  const [coveranArea, setCoveranArea] = useState("");
  const [cabangTujuan, setCabangTujuan] = useState("");

  const cabangAsalChange = (e) => {
    setCabangAsal(e.target.value);
    router.replace(`${router.pathname}?cabangAsal=${e.target.value}`);
    setCoveranArea("");
    setCabangTujuan("");
  };
  const coveranAreaChange = (e) => {
    setCoveranArea(e.target.value);
    setCabangTujuan("");
    props.coveranSelected(e.target.value);
    props.tujuanSelected("");
  };
  const cabangTujuanChange = (e) => {
    setCabangTujuan(e.target.value);
    props.tujuanSelected(e.target.value);
  };

  return (
    <form className="w-full p-4 bg-gray-900 flex flex-col gap-4">
      {/* Select Cabang Asal */}
      <div className="w-full flex gap-2 items-center">
        <label
          className="w-52 text-base text-gray-100"
          htmlFor="cabangAsal"
          id="cabangAsal"
          name="cabangAsal"
        >
          Cabang Asal
        </label>
        <select
          className="w-full p-1 text-base text-gray-900"
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

      {/* Select Coveran Area */}
      <div className="w-full flex gap-2 items-center">
        <label
          className="w-52 text-base text-gray-100"
          htmlFor="coveranArea"
          id="coveranArea"
          name="coveranArea"
        >
          Coveran Area
        </label>
        <select
          className="w-full p-1 text-base text-gray-900"
          name="coveranArea"
          id="coveranArea"
          value={coveranArea}
          onChange={coveranAreaChange}
        >
          <option value=""></option>
          {props.coveran &&
            props.coveran.map((data, index) => (
              <option value={data} key={index}>
                {data.toUpperCase()}
              </option>
            ))}
        </select>
      </div>

      {/* Select Cabang Tujuan */}
      <div className="w-full flex gap-2 items-center">
        <label
          className="w-52 text-base text-gray-100"
          htmlFor="cabangTujuan"
          id="cabangTujuan"
          name="cabangTujuan"
        >
          Cabang Tujuan
        </label>
        <select
          className="w-full p-1 text-base text-gray-900"
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
