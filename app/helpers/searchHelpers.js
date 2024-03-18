export const getSearchResponseFormatted = (data, categories) => {
  if (data.results.length === 0) {
    return {
      categories: [],
      items: [],
    };
  }

  const pathFromRoot = categories.length > 0 ? categories : data.filters[0].values[0].path_from_root;

  return ({
    categories: pathFromRoot.map((category) => category.name),
    items: data.results.map(
      ({ id, title, currency_id, price, attributes, shipping, thumbnail }) => ({
        id,
        title,
        price: {
          currency: currency_id,
          amount: price,
          decimals: 0,
        },
        picture: thumbnail,
        condition: attributes.find(
          (attribute) => attribute.id === "ITEM_CONDITION"
        ).value_name,
        free_shipping: shipping.free_shipping,
      })
    ),
  });
};