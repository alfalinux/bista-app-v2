import Layout from "../Layout";
import DataTable from "./DataTable";
import SelectionForm from "./SelectionForm";

const TransaksiHarianContainer = ({ dataTransaksi }) => {
  return (
    <Layout>
      <div className="w-full lg:w-[765px] xl:w-[960px] 2xl:w-[1216px] p-4 flex flex-col gap-4">
        <SelectionForm />
        <DataTable dataTransaksi={dataTransaksi} />
      </div>
    </Layout>
  );
};

export default TransaksiHarianContainer;
