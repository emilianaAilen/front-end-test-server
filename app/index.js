const express = require('express');
const cors = require('cors');

const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

app.use(cors());

app.use('/api', itemsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});