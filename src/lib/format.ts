const fmt = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

export const eur = (n: number): string => fmt.format(n);

export const orderNumber = (): string =>
  `BR-${Math.floor(1000 + Math.random() * 9000)}-${String(
    Math.floor(Math.random() * 90 + 10)
  )}`;
