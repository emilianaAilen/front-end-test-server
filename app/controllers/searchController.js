import { getSearchResponseFormatted } from '../helpers/searchHelpers';

const axios = require('axios');

export const getItems = async (req, res) => {
  try {
    const { q, limit } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'q is required' });
    }

    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}${limit ? `&limit=${encodeURIComponent(limit)}` : ''}`);

    const data = response.data;
    let categories = [];
    if(data.filters.length <= 0 && data.results.length > 0){
      const categoriesResponse = await axios.get(`https://api.mercadolibre.com/categories/${data.results[0].category_id}`);
      categories = categoriesResponse.data.path_from_root;
    }

    res.json(getSearchResponseFormatted(data, categories));
  } catch (error) {
    res.status(500).json({ message: 'Error while searching the product.' });
  }
};