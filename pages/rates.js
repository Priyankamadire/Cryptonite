import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

const Rates = ({ coins }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(coins.length / itemsPerPage);
  const router = useRouter();

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowClick = (coinId) => {
    router.push(`/coin/${coinId}`);
  };

  const currentCoins = coins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Change of Rates</h1>
      <div className="overflow-x-auto bg-dark-100 shadow-md rounded-lg p-4">
        <table className="min-w-full bg-dark border border-dark-300">
          <thead className="bg-blue-600 text-dark">
            <tr>
              <th className="py-2 px-4 border border-dark-300">Name</th>
              <th className="py-2 px-4 border border-dark-300">Symbol</th>
              <th className="py-2 px-4 border border-dark-300">Price</th>
              <th className="py-2 px-4 border border-dark-300">Volume (24h)</th>
              <th className="py-2 px-4 border border-dark-300">(1h)%</th>
              <th className="py-2 px-4 border border-dark-300">(24h)%</th>
              <th className="py-2 px-4 border border-dark-300">(7d)%</th>
              <th className="py-2 px-4 border border-dark-300">(30d)%</th>
              <th className="py-2 px-4 border border-dark-300">(60d)%</th>
              <th className="py-2 px-4 border border-dark-300">(90d)%</th>
            
            </tr>
          </thead>
          <tbody className="text-dark-800">
            {currentCoins.map((coin) => (
              <tr key={coin.id} className="bg-dark-50 hover:bg-dark-100 cursor-pointer" onClick={() => handleRowClick(coin.id)}>
                <td className="py-2 px-4 border border-dark-300">{coin.name || 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.symbol || 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.price ? coin.quote.USD.price.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.volume_24h ? coin.quote.USD.volume_24h.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.percent_change_1h ? coin.quote.USD.percent_change_1h.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.percent_change_24h ? coin.quote.USD.percent_change_24h.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.percent_change_7d ? coin.quote.USD.percent_change_7d.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.percent_change_30d ? coin.quote.USD.percent_change_30d.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.percent_change_60d ? coin.quote.USD.percent_change_60d.toFixed(2) : 'N/A'}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.quote?.USD?.percent_change_90d ? coin.quote.USD.percent_change_90d.toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const apiKey = '9a3fad8c-52a9-4990-8613-5f20d88db500';
  const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/category';

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
      params: {
        id: '605e2ce9d41eae1066535f7c',
      },
    });

    const coins = response.data.data.coins;

    return {
      props: {
        coins,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        coins: [],
      },
    };
  }
};

export default Rates;
