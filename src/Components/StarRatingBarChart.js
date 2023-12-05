import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StarRatingBarChart = ({ reviews }) => {
  // Calculate the frequency of each star rating
  const starCounts = Array(5).fill(0); // Initialize an array of 5 zeros
  reviews.forEach(review => {
    if (review.stars >= 1 && review.stars <= 5) {
      starCounts[review.stars - 1] += 1; // Increment the count for the star rating
    }
  });

  // Chart data
  const data = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Star Ratings',
        data: starCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    maintainAspectRatio: false
  };

  return <Bar data={data} options={options} />;
};

export default StarRatingBarChart;
