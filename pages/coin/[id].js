import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const CoinDetails = ({ coinData, coinName }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (coinData) {
      const labels = coinData.history.map(point => point.price); // X-axis: Price
      const changeData = coinData.history.map(point => point.percent_change_24h); // Y-axis: 24hr % Change

      setChartData({
        labels,
        datasets: [
          {
            label: '24h % Change',
            data: changeData,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderWidth: 2,
          }
        ]
      });
    }
  }, [coinData]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Price vs. 24h Change for {coinName}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'Price'
                }
              },
              y: {
                title: {
                  display: true,
                  text: '24h % Change'
                },
                ticks: {
                  callback: function(value) {
                    return value + '%'; // Format y-axis values as percentages
                  }
                }
              }
            }
          }}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const apiKey = '9a3fad8c-52a9-4990-8613-5f20d88db500';

  try {
    // Fetch historical data for the selected cryptocurrency
    const historyUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=${id}&time_start=2023-01-01&time_end=2023-07-01`;
    const historyResponse = await axios.get(historyUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });

    const coinData = historyResponse.data.data;

    // Fetch coin info for the selected cryptocurrency
    const infoUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${id}`;
    const infoResponse = await axios.get(infoUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });

    const coinName = infoResponse.data.data[id].name;

    return {
      props: {
        coinData,
        coinName,
      },
    };
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return {
      props: {
        coinData: null,
        coinName: '',
      },
    };
  }
}

export default CoinDetails;
