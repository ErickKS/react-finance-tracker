export const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export const priceFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});
