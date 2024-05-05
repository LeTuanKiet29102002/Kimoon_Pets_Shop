
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie';
import { Box } from "@mui/material";
import {useEffect ,useState} from 'react';
import axios from 'axios';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const MyResponsivePie = () => {

    const [soLuongTrangThaiDonHang, setSoLuongTrangThaiDonHang] = useState(null);

    useEffect(() => {
        const getSoLuongTrangThaiDonHang = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/order/getSoLuongTrangThaiDonHang"
                );
                setSoLuongTrangThaiDonHang(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy số lượng đơn hàng: ", error);
            }
        };

        getSoLuongTrangThaiDonHang();
    }, []);

    
    console.log("Số lượng trạng thái đơn hàng: ", soLuongTrangThaiDonHang);
    const data = [
        {
            "id": "Đơn đã duyệt",
            "label": "Đơn đã duyệt",
            "value": soLuongTrangThaiDonHang ? soLuongTrangThaiDonHang.soluongchoxacnhan : 0,
            "color": "hsl(85, 70%, 50%)"
        },
        {
            "id": "Đơn đang giao dịch",
            "label": "Đơn đang giao dịch",
            "value": soLuongTrangThaiDonHang ? soLuongTrangThaiDonHang.soluongdanggiaodich : 0,
            "color": "hsl(203, 70%, 50%)"
        },
        {
            "id": "Đơn đã hoàn thành",
            "label": "Đơn đã hoàn thành",
            "value": soLuongTrangThaiDonHang ? soLuongTrangThaiDonHang.soluonghoanthanh : 0,
            "color": "hsl(148, 70%, 50%)"
        },
        {
            "id": "Đơn đã hủy",
            "label": "Đơn đã hủy",
            "value": soLuongTrangThaiDonHang ? soLuongTrangThaiDonHang.soluongdahuy : 0,
            "color": "hsl(125, 70%, 50%)"
        }
    ];
    return (
        <Box height="75vh" marginTop='20px'>
            <h2 style={{marginTop:"50px",marginBottom:"0.8rem"}}>Thống kê trạng thái các đơn hàng tại Kimoon Shop</h2>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'Đơn đã duyệt'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'Đơn đã hủy'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'Đơn đã thanh toán'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'Đơn đang giao dịch'
                        },
                        id: 'dots'
                    },
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 150,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </Box>

    )

}

export default MyResponsivePie;