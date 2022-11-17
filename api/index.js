const app = require('express')()
const {
  v4
} = require('uuid')
const axios = require('axios')


app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end(`Fruits API. A wrapper for Fruityvice.<br>Endpoint: /fruits/:name`)
});

app.get('/api/fruits/:name', async (req, res) => {
  const {
    name
  } = req.params
  try {
    const response = await axios.get(
      `https://fruityvice.com/api/fruit/${name.toLowerCase().trim()}`
    )

    if (response.status == 200) {
      return res.json(response.data)
    }
  } catch (error) {
    console.log(error)
  }

  return res.status(404).json({
    message: 'Fruit not found'
  })
});

module.exports = app