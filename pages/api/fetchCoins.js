import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/category', {
      headers: {
        'X-CMC_PRO_API_KEY': '9a3fad8c-52a9-4990-8613-5f20d88db500',
        'CMC_PRO_API_KEY': '9a3fad8c-52a9-4990-8613-5f20d88db500',

      },
      params: {
        id: '605e2ce9d41eae1066535f7c'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
