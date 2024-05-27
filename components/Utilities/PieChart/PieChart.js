import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

  const data = {
    labels: {
        render: ['Instagram', 'facebook', 'twitter']
    },
    datasets: [
      {
        data: [30, 40, 30],
        labels: ['Instagram', 'facebook', 'twitter'],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'], // Colors for the pie slices
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'], // Border colors for the pie slices
        borderWidth: 1, 
      },
    ],
  };


  const options = {
    plugins: {
      legend: {
        display: false
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
