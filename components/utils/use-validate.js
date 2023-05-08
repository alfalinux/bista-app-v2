export function validasiNoTelp(input) {
  if (!input) {
    return {
      isValid: false,
      message: "Nomor telepon harus diisi",
    };
  }

  if (/\s/.test(input)) {
    return {
      isValid: false,
      message: "Nomor telepon tidak boleh mengandung spasi",
    };
  }

  if (!/^\d{5,14}$/.test(input)) {
    return {
      isValid: false,
      message: "Nomor telepon harus terdiri dari 5-14 digit angka",
    };
  }

  return { isValid: true };
}

export function validasiSpecialChar(input, inputLength) {
  const regex = /[^0-9a-zA-Z\s@'#+_,.:&\/()\\-]/g;
  const invalidChars = input.match(regex);
  const maxLength = inputLength;

  if (!input.trim()) {
    return { isValid: false, message: "Inputan tidak boleh kosong!" };
  }

  if (input.length > maxLength) {
    return { isValid: false, message: `Inputan terlalu panjang! Maksimal ${maxLength} karakter.` };
  }

  if (invalidChars) {
    const message = `Penggunaan karakter (${invalidChars.join(", ")}) tidak diizinkan!`;
    return { isValid: false, message };
  }

  return { isValid: true, message: "inputan valid" };
}

export const validityCheck = (obj) => {
  const regex = /[^0-9a-zA-Z\s@'#+_,.:&\/()\\-]/;
  let values = [];
  Object.values(obj).forEach((value) => {
    if (typeof value === "object") {
      values = [...values, ...validityCheck(value)];
    } else {
      values.push(value);
    }
  });
  return values.filter((d) => regex.test(d));
};
