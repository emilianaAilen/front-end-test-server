import { getItemResponseFormatted } from '../helpers/itemsHelpers';

const axios = require('axios');

export const getItemDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const itemDetailResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    const itemDetailData = itemDetailResponse.data;

    const itemDescriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
    const itemDescriptionData = itemDescriptionResponse.data;

    const itemCategoriesResponse = await axios.get(`https://api.mercadolibre.com/categories/${itemDetailData.category_id}`);
    const itemCategoriesData = itemCategoriesResponse.data.path_from_root;

    res.json(getItemResponseFormatted(itemDetailData, itemDescriptionData, itemCategoriesData));
  } catch (error) {
    res.status(500).json({ message: 'Error while getting product detail.' });
  }
};