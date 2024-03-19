import { getSearchResponseFormatted } from "../helpers/searchHelpers";

const axios = require("axios");

export const getItems = async (req, res) => {
  try {
    const { q, limit } = req.query;
    if (!q) {
      return res.status(400).json({ message: "q is required" });
    }

    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(
        q
      )}${limit ? `&limit=${encodeURIComponent(limit)}` : ""}`
    );

    const data = response.data;
    const results = data.results;

    let categories = [];
    if (data.filters.length <= 0 && results.length > 0) {
      const categoriesResponse = await axios.get(
        `https://api.mercadolibre.com/categories/${results[0].category_id}`
      );
      categories = categoriesResponse.data.path_from_root;
    }

    const locationPromises = [];

    results.forEach((item) => {
      const locationPromise = axios.get(
        `https://api.mercadolibre.com/users/${item.seller.id}`
      );
      locationPromises.push(locationPromise);
    });

    const locationResponses = await Promise.all(locationPromises);

    results.map((item, index) => {
      const itemToUpdate = item;
      itemToUpdate.location = locationResponses[index].data.address.city;
      return itemToUpdate;
    });

    const dataToFormat = data;
    dataToFormat.results = results;

    res.json(getSearchResponseFormatted(dataToFormat, categories));
  } catch (error) {
    res.status(500).json({ message: "Error while searching the product." });
  }
};
