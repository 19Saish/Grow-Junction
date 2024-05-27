import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const VerticalBarChart = () => {

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 900, 800],
        backgroundColor: '#4285F4', 
        borderColor: '#4285F4', 
        borderWidth: 1, 
        borderRadius: 3
      },
    ],
  };


  const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        max: 1000,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default VerticalBarChart;
