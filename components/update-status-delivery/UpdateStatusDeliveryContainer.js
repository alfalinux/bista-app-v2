import listCabang from "@/helpers/listCabang";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useRouter } from "next/router";
import UpdateStatusDeliveryTable from "./UpdateStatusDeliveryTable";

const UpdateStatusDeliveryContainer = ({ dataDelivery }) => {
  const router = useRouter();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState();
  const [cabang, setCabang] = useState("");
  const [namaKurir, setNamaKurir] = useState("");
  const [listDelivery, setListDelivery] = useState([]);

  const cabangChangeHandler = (e) => {
    setIsLoading(true);
    setCabang(e.target.value);
    setNamaKurir("");
    router.push(`/delivery/update-status-delivery?cabang=${e.target.value}`);
  };
  const namaKurirChangeHandler = (e) => {
    setNamaKurir(e.target.value);
  };

  useEffect(() => {
    if (dataDelivery.status == "201") {
      setListDelivery(
        [
          ...new Set(dataDelivery.result.flatMap((d) => d.delivery.filter((d) => !d.deliveryClosedAt))),
        ].reduce((uniqueData, currentItem) => {
          const isDuplicate = uniqueData.some((item) => item.noDelivery === currentItem.noDelivery);

          if (!isDuplicate) {
            uniqueData.push(currentItem);
          }

          return uniqueData;
        }, [])
      );
    } else {
      setListDelivery([]);
    }
    setIsLoading(false);
  }, [dataDelivery]);

  return (
    <div className="w-full p-4 text-sm flex flex-col gap-2 items-start lg:overflow-x-scroll xl:overflow-x-hidden ">
      <form className="w-full p-4 bg-white dark:bg-gray-800  flex flex-col gap-2 items-start border-[1px] border-gray-300 shadow-md rounded-lg">
        <section className="w-full flex gap-2 items-center">
          <label className="w-32 text-gray-800 dark:text-gray-200" htmlFor="cabang">
            Cabang
          </label>
          <select
            className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
            name="cabang"
            id="cabang"
            value={cabang}
            onChange={cabangChangeHandler}
          >
            {data.posisiDesc === "direktur" ? (
              <>
                <option value="">-- Pilih cabang --</option>
                {listCabang().map((data, index) => (
                  <option key={index} value={data.cab} className="capitalize">
                    {data.cab}
                  </option>
                ))}
              </>
            ) : (
              <>
                <option value="">-- Pilih cabang tujuan --</option>
                <option value={data.cabangDesc} className="capitalize">
                  {data.cabangDesc}
                </option>
              </>
            )}
          </select>
        </section>
        <section className="w-full flex gap-2 items-center">
          <label className="w-32 text-gray-800 dark:text-gray-200" htmlFor="namaKurir">
            Nama Kurir
          </label>
          <select
            className="w-full p-2 text-sm text-gray-800 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md capitalize"
            name="namaKurir"
            id="namaKurir"
            value={namaKurir}
            onChange={namaKurirChangeHandler}
          >
            <option value="">-- Pilih Kurir --</option>
            {listDelivery.length > 0
              ? [...new Set(listDelivery.map((d) => d.dataKurir.nama))].map((data, index) => (
                  <option key={index} value={data} className="">
                    {data}
                  </option>
                ))
              : null}
          </select>
        </section>
      </form>
      {isLoading ? (
        <div className="w-full flex justify-center items-center mt-2">
          <LoadingSpinner size="md" color="gray" />
        </div>
      ) : null}

      {isLoading ? null : router.query.cabang === undefined ? null : !router.query.cabang || !cabang ? (
        <p className="w-full p-4 text-sm bg-red-300 dark:bg-red-900 text-red-600 dark:text-red-300 text-center">
          Cabang belum dipilih...
        </p>
      ) : listDelivery.length > 0 && !namaKurir ? (
        <p className="w-full p-4 text-sm bg-green-300 dark:bg-green-800 text-green-900 dark:text-green-300 text-center">
          Nama Kurir belum dipilih...
        </p>
      ) : listDelivery.length > 0 && namaKurir ? (
        <UpdateStatusDeliveryTable
          listDelivery={listDelivery.filter((d) => d.dataKurir.nama === namaKurir)}
          dataResi={dataDelivery.result.filter((d) => d.delivery.some((d) => d.dataKurir.nama === namaKurir))}
          namaKurir={namaKurir}
          cabang={cabang}
          onChangeCabang={cabangChangeHandler}
          onChangeKurir={namaKurirChangeHandler}
        />
      ) : (
        <p className="w-full p-4 text-sm bg-red-300 dark:bg-red-900 text-red-600 dark:text-red-300 text-center">
          {dataDelivery.message},{" "}
        </p>
      )}
    </div>
  );
};

export default UpdateStatusDeliveryContainer;
