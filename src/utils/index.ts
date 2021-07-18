export function financial(number: string | number) {
  let modifyingNumber = number;

  if (typeof number === "string") {
    if (isNaN(modifyingNumber as number)) return number;
    modifyingNumber = +modifyingNumber;
  }

  return (modifyingNumber as number).toFixed(2);
}

export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
