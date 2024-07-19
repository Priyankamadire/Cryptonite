import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const Products = ({ coins }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(coins.length / itemsPerPage);

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

  const currentCoins = coins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-blue-600 mb-4"> All Crypto Coins</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark border border-dark-300">
          <thead className=" text-dark">
            <tr>
            <th className="py-2 px-4 border border-dark-300">ID</th>
            <th className="py-2 px-4 border border-dark-300">Name</th>
              <th className="py-2 px-4 border border-dark-300">Symbol</th>
              <th className="py-2 px-4 border border-dark-300">Slug</th>
              <th className="py-2 px-4 border border-dark-300">Market Pairs</th>
              <th className="py-2 px-4 border border-dark-300">Date Added</th>
              <th className="py-2 px-4 border border-dark-300">Max Supply</th>
              <th className="py-2 px-4 border border-dark-300">Circulating Supply</th>
              <th className="py-2 px-4 border border-dark-300">Total Supply</th>
              <th className="py-2 px-4 border border-dark-300">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {currentCoins.map((coin) => (
              <tr key={coin.id} className="bg-dark-50 hover:bg-dark-100">
                <td className="py-2 px-4 border border-dark-300">{coin.id}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.name}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.symbol}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.slug}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.num_market_pairs}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.date_added}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.max_supply}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.circulating_supply}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.total_supply}</td>
                <td className="py-2 px-4 border border-dark-300">{coin.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-dark px-4 py-2 rounded disabled:bg-blue-300"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-600 text-dark px-4 py-2 rounded disabled:bg-blue-300"
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

export default Products;
