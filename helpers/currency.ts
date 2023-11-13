export const getCurrency = (number: number): string => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "symbol",
  }).format(number)
}
