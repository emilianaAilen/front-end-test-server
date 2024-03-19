import { AUTHOR } from "../constants/constants";
import { getCategoryNames } from "../utils/categories";
import { getPrice } from "../utils/price";

export const getSearchResponseFormatted = (data, categories) => {
  if (data.results.length === 0) {
    return {
      categories: [],
      items: [],
    };
  }

  const pathFromRoot =
    categories.length > 0
      ? categories
      : data.filters[0].values[0].path_from_root;

  return {
    author: AUTHOR,
    categories: getCategoryNames(pathFromRoot),
    items: data.results.map(
      ({
        id,
        title,
        currency_id,
        price,
        attributes,
        shipping,
        thumbnail,
        location,
      }) => {
        const itemCondition = attributes.find(
          (attribute) => attribute.id === "ITEM_CONDITION"
        ).value_name;

        return {
          id,
          title,
          price: getPrice(price, currency_id),
          picture: thumbnail,
          condition: itemCondition,
          free_shipping: shipping.free_shipping,
          location,
        };
      }
    ),
  };
};
