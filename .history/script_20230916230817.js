const express = require('express');
const axios = require('axios');
const parseString = require('xml2js').parseString;

const app = express();

app.use(express.static('public'));

app.get('/jobs', async (req, res) => {
  try {
    const response = await axios.get('https://www.rotanacareers.com/rss/all/');
    const xmlData = response.data;

    parseString(xmlData, (err, result) => {
      if (err) throw err;

      const jobs = result.rss.channel[0].item.map(item => {
        return {
          title: item.title[0],
          location: item.country[0],
        };
      });

      res.json(jobs);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
