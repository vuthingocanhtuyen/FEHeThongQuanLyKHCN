import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { convertDataChart } from '../../utils';

const BarChartComponent = (props) => {
  const data = convertDataChart(props.data, 'paymentMethod');
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <BarChart
      width={1200}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name">
        <Label offset={0} position="insideBottom" />
      </XAxis>
      <YAxis>

        <Label value="Value" angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip />
      <Legend />
      {data.map((entry, index) => (
        <Bar key={`bar-${index}`} dataKey="value" fill={COLORS[index % COLORS.length]} />
      ))}
      <Label value="Bar Chart Example" offset={0} position="insideTop" />
    </BarChart>
  );
};

export default BarChartComponent;
