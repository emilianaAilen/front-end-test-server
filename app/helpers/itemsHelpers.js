export const getItemResponseFormatted = (
  itemDetailData,
  itemDescriptionData
) => {
  const {
    id,
    title,
    thumbnail,
    currency_id,
    price,
    shipping,
    condition,
    deal_ids,
  } = itemDetailData;
  const { plain_text } = itemDescriptionData;
  const amount = Math.floor(price);
  const decimals = price - amount;

  return {
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount,
        decimals,
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity: deal_ids.lenght,
      description: plain_text,
    },
  };
};
