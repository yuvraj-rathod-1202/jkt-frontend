import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Label
} from 'recharts';

export default function ElectDashboard() {
  // Filter states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState({
    temperature: true,
    humidity: true,
    moisture: true,
    pollution: true
  });

  // Data state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Compute user's timezone offset string
  const tzOffsetMinutes = -new Date().getTimezoneOffset();
  const tzSign = tzOffsetMinutes >= 0 ? '+' : '-';
  const tzHours = String(Math.floor(Math.abs(tzOffsetMinutes) / 60)).padStart(2, '0');
  const tzMins = String(Math.abs(tzOffsetMinutes) % 60).padStart(2, '0');
  const tzString = `UTC${tzSign}${tzHours}:${tzMins}`;

  // Build query params from filters
  const buildQuery = () => {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate.toISOString());
    if (endDate) params.append('end', endDate.toISOString());
    return params.toString();
  };

  // Fetch data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = buildQuery();
        const resp = await fetch(`https://jkt-backend.vercel.app/api/elect/`);
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const json = await resp.json();
        const chartData = json.map(item => ({
          time: new Date(item.time),
          temperature: parseFloat(item.tempreature),
          humidity: parseFloat(item.humidity),
          moisture: parseFloat(item.moisture),
          pollution: parseFloat(item.pollution)
        }));
        setData(chartData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  // Handle sensor checkbox toggles
  const toggleSensor = (key) => {
    setSelectedSensors(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Format X-axis ticks with local timezone
  const formatXAxis = (tick) => {
    const date = new Date(tick);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Environmental Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">All times shown in {tzString}</p>

      {/* Filter Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="col-span-2 flex items-center space-x-4 flex-wrap">
          {Object.keys(selectedSensors).map(key => (
            <label key={key} className="inline-flex items-center mr-4 mt-2">
              <input
                type="checkbox"
                checked={selectedSensors[key]}
                onChange={() => toggleSensor(key)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Charts */}
      {!loading && !error && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxis}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            >
              <Label value={`Time (${tzString})`} position="bottom" offset={0} />
            </XAxis>
            <YAxis />
            <Tooltip
              labelFormatter={label => new Date(label).toLocaleString(undefined, { timeZoneName: 'short' })}
            />
            <Legend />

            {selectedSensors.temperature && (
              <Line
                type="monotone"
                dataKey="temperature"
                dot={false}
                stroke="#ff7300"
                strokeWidth={2}
              />
            )}
            {selectedSensors.humidity && (
              <Line
                type="monotone"
                dataKey="humidity"
                dot={false}
                stroke="#387908"
                strokeWidth={2}
              />
            )}
            {selectedSensors.moisture && (
              <Line
                type="monotone"
                dataKey="moisture"
                dot={false}
                stroke="#8884d8"
                strokeWidth={2}
              />
            )}
            {selectedSensors.pollution && (
              <Line
                type="monotone"
                dataKey="pollution"
                dot={false}
                stroke="#82ca9d"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
