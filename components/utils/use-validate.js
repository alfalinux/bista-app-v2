export function validasiTelp(input) {
  const regex = /^[0-9]{1,15}$/;
  const isValid = regex.test(input);

  return { valid: isValid, message: "Wajib diisi, dengan nomor yang valid" };
}

export function validasiNama(input) {
  const regex = /^[a-zA-Z0-9\s\'\(\)\+\-\_\@\.\,\:]{1,50}$/;
  const isValid = regex.test(input.trim());

  return { valid: isValid, message: "Wajib diisi, maksimal 50 karakter tanpa karakter spesial" };
}

export function validasiAlamat(input) {
  const regex = /^[a-zA-Z0-9\s\'\(\)\+\-\_\@\.\,\:]{1,150}$/;
  const isValid = regex.test(input.trim());

  return { valid: isValid, message: "Wajib diisi, maksimal 150 karakter tanpa karakter spesial" };
}

export function validasiKeterangan(input) {
  const regex = /^[a-zA-Z0-9\s\'\(\)\+\-\_\@\.\,\:]{1,30}$/;
  return regex.test(input.trim());
}

export function validasiPositiveNumber(input) {
  const regex = /^0\.[1-9]\d*$|^[1-9]\d*(\.\d+)?$/; //bilangan positif lebih besar dari nol

  return regex.test(input);
}

export function checkSpecialChar(input, inputLength) {
  const regex = /[^0-9a-zA-Z\s@'_,.:&\/()\\-]/g;
  const invalidChars = input.match(regex);
  const maxLength = inputLength;

  if (!input.trim()) {
    return { check: false, message: "Inputan tidak boleh kosong!" };
  }

  if (input.length > maxLength) {
    return { check: false, message: `Inputan terlalu panjang! Maksimal ${maxLength} karakter.` };
  }

  if (invalidChars) {
    const message = `Penggunaan karakter (${invalidChars.join(", ")}) tidak diizinkan!`;
    return { check: false, message };
  }

  return { check: true, message: "inputan valid" };
}
