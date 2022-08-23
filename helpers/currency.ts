export const getCurrency = (number: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "symbol",
  }).format(number)
}
