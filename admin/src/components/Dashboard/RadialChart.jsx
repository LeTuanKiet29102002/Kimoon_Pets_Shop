
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { Box } from "@mui/material";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const RadialChart = () => {
    const data = [
        {
            "id": "Thú cưng đã bán",
            "data": [
                {
                    "x": "Chó",
                    "y": 10
                },
                {
                    "x": "Mèo",
                    "y": 20
                },
                {
                    "x": "Thú cưng khác",
                    "y": 30
                }
            ]
        },
        {
            "id": "Thú cưng đang còn",
            "data": [
                {
                    "x": "Chó",
                    "y": 23
                },
                {
                    "x": "Mèo",
                    "y": 23
                },
                {
                    "x": "Thú cưng khác",
                    "y": 229
                }
            ]
        },
        {
            "id": "Tổng thú cưng",
            "data": [
                {
                    "x": "Chó",
                    "y": 20
                },
                {
                    "x": "Mèo",
                    "y": 20
                },
                {
                    "x": "Thú cưng khác",
                    "y": 18
                }
            ]
        },
    ]
    return (
        <Box height="75vh">
            <h2 style={{ marginTop: "50px", marginBottom: "0.8rem" }}>Thống kê số lượng các thú cưng tại Kimoon Pets</h2>
            <ResponsiveRadialBar
                data={data}
                valueFormat=">-.2f"
                innerRadius={0}
                padding={0.15}
                margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 80,
                        translateY: 0,
                        itemsSpacing: 6,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        symbolSize: 18,
                        symbolShape: 'square',
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

export default RadialChart;