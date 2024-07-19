import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './chartSetup'; // Import the chart setup file
import Layout from '../components/Layout'

export default function Home() {
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/fetchCoins');
        setCoinData(response.data.data.coins);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    }

    fetchData();
  }, []);

  const chartData = {
    labels: coinData ? coinData.map(coin => coin.name) : [],
    datasets: [
      {
        label: 'Market Cap (USD)',
        data: coinData ? coinData.map(coin => coin.quote.USD.market_cap) : [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(59, 130, 246)', // Customize legend text color to match blue theme
        },
      },
      tooltip: {
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // Customize tooltip background color
        titleColor: 'white', // Customize tooltip title color
        bodyColor: 'white', // Customize tooltip body color
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(59, 130, 246)', // Customize x-axis ticks color
        },
        grid: {
          color: 'rgba(59, 130, 246, 0.2)', // Customize x-axis grid color
        },
      },
      y: {
        ticks: {
          color: 'rgb(59, 130, 246)', // Customize y-axis ticks color
        },
        grid: {
          color: 'rgba(59, 130, 246, 0.2)', // Customize y-axis grid color
        },
      },
    },
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Cryptocurrency Market Cap</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {coinData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </Layout>
  );
}
