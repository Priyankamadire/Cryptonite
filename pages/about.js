import React from 'react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">About</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our cryptocurrency platform. We offer powerful tools and insights to help you navigate the world of digital assets. On our homepage, you can explore the global market capitalization chart, which visually represents the overall health and direction of the cryptocurrency market. Additionally, we provide detailed information about public companies holding Bitcoin and Ethereum, shedding light on their impact on the market.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our product page features comprehensive details about selected cryptocurrencies, including their name, symbol, and a brief description. This foundational information helps you understand each digital asset. To assist in analyzing price trends, we display historical price movements through line or candle graphs, enabling you to track changes over time and make informed investment decisions.
        </p>
        <p className="text-lg text-gray-700">
          Our platform is designed to equip you with the tools and information needed to excel in the dynamic world of cryptocurrencies. Explore our features to gain valuable insights and enhance your investment strategies.
        </p>
      </div>
    </Layout>
  );
}

export default About;
