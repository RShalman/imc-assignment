export function financial(number: string | number) {
  let modifyingNumber = number;

  if (typeof number === "string") {
    if (isNaN(modifyingNumber as number)) return number;
    modifyingNumber = +modifyingNumber;
  }

  return (modifyingNumber as number).toFixed(2);
}
