export const getPrice = (price, currency_id) => {
  const amount = Math.floor(price);
  const decimals = price - amount;

  return {
    currency: currency_id,
    amount,
    decimals,
  };
};
