import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const data = [
    { month: "January", value: 100 },
    { month: "February", value: 200 },
    { month: "March", value: 150 },
    { month: "April", value: 300 },
    { month: "May", value: 180 },
    { month: "June", value: 250 }
];

const BieuDoSLCB = () => {

    return (
        <BarChart
            width={1200}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 10 }}

        >
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="month" interval={0} height={60}>
                <Label value="Month" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis width={10}>
                <Label value="Value" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={COLORS[0]} barSize={10} />
            <Label value="Bar Chart Example" offset={0} position="insideTop" />
        </BarChart>
    );
};

export default BieuDoSLCB;
