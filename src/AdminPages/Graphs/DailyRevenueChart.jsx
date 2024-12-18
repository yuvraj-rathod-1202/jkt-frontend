// src/components/RevenueChart.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import getBaseUrl from '../..//utils/baseURL';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the backend API
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${getBaseUrl()}/api/stocks/dailysales`);
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  // Calculate total daily revenue
  const revenueData = salesData.map((entry) => entry.sales);
  const labels = salesData.map((entry) => entry.date);

  const data = {
    labels: labels, // Date labels for the x-axis
    datasets: [
      {
        label: 'Daily Revenue (Rupees)',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue vs Date',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Daily Revenue</h2>
      <div className="hidden md:block">
        <Bar data={data} options={options} className="" />
      </div>
    </div>
  );
};

export default RevenueChart;
