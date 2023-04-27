const validityCheck = (obj) => {
  const regex = /[^0-9a-zA-Z\s@'_,.:&\/()-]/;
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

export default validityCheck;
