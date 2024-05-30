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
                console.error('Lỗi khi lấy dữ liệu top 5:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: top5Data.map(item => item.tenthucung),
        datasets: [
            {
                label: 'Doanh số (VND)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: top5Data.map(item => item.doanhthu),
                yAxisID: 'y1',
            },
            {
                label: 'Đơn hàng',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: top5Data.map(item => item.soluong_ban_duoc),
                yAxisID: 'y2',
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
                text: 'Top 5 thú cưng bán chạy nhất',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += label.includes('Doanh số') ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y) : context.parsed.y + ' đơn';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh số (VND)'
                },
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
                    }
                }
            },
            y2: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Đơn hàng'
                },
                ticks: {
                    callback: function (value) {
                        return value + ' đơn';
                    }
                },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Tên Thú cưng'
                }
            }
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
