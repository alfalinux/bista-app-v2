import { useRouter } from "next/router";
import { useState } from "react";

const CabangSelect = () => {
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
  };
  const cabangTujuanChange = (e) => {
    setCabangTujuan(e.target.value);
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
          <option value="jakarta">Jakarta</option>
          <option value="surabaya">Surabaya</option>
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
          <option value="jakarta">Jakarta</option>
          <option value="surabaya">Surabaya</option>
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
          <option value="jakarta">Jakarta</option>
          <option value="surabaya">Surabaya</option>
        </select>
      </div>
    </form>
  );
};

export default CabangSelect;
