import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
interface PriceChartProps {
  data: any[];
  timeRange: string;
}
const PriceChart: React.FC<PriceChartProps> = ({
  data,
  timeRange
}) => {
  // Function to format date based on time range
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (timeRange === '12h' || timeRange === '1d') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric'
      });
    }
  };
  // If no data, show a message
  if (!data || data.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-400">
        No price history data available for this time range
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="timestamp" tickFormatter={formatDate} stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip contentStyle={{
        backgroundColor: '#2d3748',
        borderColor: '#4a5568',
        color: 'white'
      }} formatter={(value: number) => [`${value} Gold`, 'Price']} labelFormatter={label => formatDate(label)} />
        <Legend />
        <Line type="monotone" dataKey="price" name="Price (Gold)" stroke="#8884d8" activeDot={{
        r: 8
      }} strokeWidth={2} />
        <Line type="monotone" dataKey="volume" name="Volume" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>;
};
export default PriceChart;