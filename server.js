const express = require('express');
const scrapeDogs = require('./scraper');

const app = express();

app.get('/', async (req, res) => {
  try {
    const dogs = await scrapeDogs();
    res.json(dogs);
  } catch (err) {
    res.status(500).send('Scraping failed.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
