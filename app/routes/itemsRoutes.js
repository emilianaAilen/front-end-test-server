const express = require('express');

const { getItems } = require('../controllers/searchController');
const { getItemDetail } = require('../controllers/itemsController');

const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItemDetail)

module.exports = router;