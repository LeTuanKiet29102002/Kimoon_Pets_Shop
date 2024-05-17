import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Top5BanHangChart = () => {
  const [top5Data, setTop5Data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products/top5banhang');
        setTop5Data(response.data);
      } catch (error) {
        console.error('Error fetching top 5 data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: top5Data.map(item => item.tenthucung),
    datasets: [
      {
        label: 'Số lượng bán được',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: top5Data.map(item => item.soluong_ban_duoc),
      },
      {
        label: 'Doanh thu',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.6)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: top5Data.map(item => item.doanhthu),
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 5 thú cưng chạy nhất',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box height="75vh">
      <h2 style={{ marginTop: '50px', marginBottom: '0.8rem' }}>Top 5 thú cưng bán chạy nhất tại Kimoon Pets</h2>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default Top5BanHangChart;




















