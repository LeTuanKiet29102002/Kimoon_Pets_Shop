// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { Box } from "@mui/material";


// const SupperChart = () => {
//     const data = {
//         labels: ['Xử lý chính', 'Phối hợp xử lý', 'Nhận để biết', 'Chỉ đạo'],
//         datasets: [
//             {
//                 data: [1, 0, 0, 1],
//                 backgroundColor: ['#4BC0C0', '#C0C0C0', '#9966FF', '#FF6384'],
//                 hoverBackgroundColor: ['#4BC0C0', '#C0C0C0', '#9966FF', '#FF6384'],
//             },
//         ],
//     };

//     const options = {
//         plugins: {
//             tooltip: {
//                 callbacks: {
//                     label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw || 0;
//                         const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
//                         const percentage = ((value / total) * 100).toFixed(2);
//                         return `${label}: ${percentage}% (${value})`;
//                     },
//                 },
//             },
//         },
//     };

//     return (
//         <Box height="75vh" marginTop='20px'>
//             <div>
//                 <h2>Biểu đồ Phân tích</h2>
//                 <Pie data={data} options={options} />
//                 <ul>
//                     <li>
//                         <span style={{ backgroundColor: '#4BC0C0', padding: '0 10px' }}></span> Xử lý chính: 1
//                     </li>
//                     <li>
//                         <span style={{ backgroundColor: '#C0C0C0', padding: '0 10px' }}></span> Phối hợp xử lý: 0
//                     </li>
//                     <li>
//                         <span style={{ backgroundColor: '#9966FF', padding: '0 10px' }}></span> Nhận để biết: 0
//                     </li>
//                     <li>
//                         <span style={{ backgroundColor: '#FF6384', padding: '0 10px' }}></span> Chỉ đạo: 1
//                     </li>
//                 </ul>
//             </div>
//         </Box>
//     );
// };

// export default SupperChart;
