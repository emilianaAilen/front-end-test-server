import { AUTHOR } from "../constants/constants";
import { getCategoryNames } from "../utils/categories";
import { getPrice } from "../utils/price";

export const getItemResponseFormatted = (
  itemDetailData,
  itemDescriptionData,
  categories
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

  return {
    author: AUTHOR,
    categories: getCategoryNames(categories),
    item: {
      id,
      title,
      price: getPrice(price, currency_id),
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity: deal_ids.length,
      description: plain_text,
    },
  };
};
