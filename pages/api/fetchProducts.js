import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
  const apiKey = '9a3fad8c-52a9-4990-8613-5f20d88db500';

  try {
    const response = await axios.get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from CoinMarketCap' });
  }
}
  