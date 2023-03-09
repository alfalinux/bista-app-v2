export function layananOptions() {
  return [
    { value: "cargo", label: "Cargo" },
    { value: "express", label: "Express" },
  ];
}

export function cabangOptions() {
  return [
    { value: "jakarta", label: "Jakarta" },
    { value: "surabaya", label: "Surabaya" },
  ];
}

export async function tujuanOptions(cabangAsal, searchParams) {
  const response = await fetch(`/api/ongkir/${cabangAsal}`);
  const data = await response.json();
  const filterData = data.kecamatan.filter((d) => d.kec.toLowerCase().includes(searchParams.toLowerCase()));

  return filterData;
}
