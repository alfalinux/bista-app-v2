import CabangSelect from "./CabangSelect";

const CreateManifestForm = ({ dataResi }) => {
  return (
    <div className="w-full lg:overflow-hidden px-4">
      <CabangSelect />
      <div>
        <ul>{dataResi.length > 0 && dataResi.map((d, i) => <li key={i}>{d.noResi}</li>)}</ul>
      </div>
    </div>
  );
};

export default CreateManifestForm;
