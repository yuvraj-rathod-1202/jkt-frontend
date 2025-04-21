import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ElectDashboard() {
  // Filter states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState({
    temperature: true,
    humidity: true,
    moisture: true,
    pollution: true,
  });

  // Data state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Compute user's timezone offset string
  const tzOffsetMinutes = -new Date().getTimezoneOffset();
  const tzSign = tzOffsetMinutes >= 0 ? "+" : "-";
  const tzHours = String(Math.floor(Math.abs(tzOffsetMinutes) / 60)).padStart(
    2,
    "0"
  );
  const tzMins = String(Math.abs(tzOffsetMinutes) % 60).padStart(2, "0");
  const tzString = `UTC${tzSign}${tzHours}:${tzMins}`;

  // Build query params from filters
  const buildQuery = () => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate.toISOString());
    if (endDate) params.append("end", endDate.toISOString());
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
        const chartData = json.map((item) => ({
          time: new Date(item.time).getTime(),
          temperature: parseFloat(item.tempreature),
          humidity: parseFloat(item.humidity),
          moisture: parseFloat(item.moisture),
          pollution: parseFloat(item.pollution),
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

  const filteredData = data.filter(
    (item) =>
      (!startDate || item.time >= startDate.getTime()) &&
      (!endDate || item.time <= endDate.getTime())
  );

  // Handle sensor checkbox toggles
  const toggleSensor = (key) => {
    setSelectedSensors((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Format X-axis ticks with local timezone
  const formatXAxis = (tick) => {
    const date = new Date(tick);
    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getYDomain = (filteredData, selectedSensors) => {
    let minY = Infinity;
    let maxY = -Infinity;

    filteredData.forEach((item) => {
      Object.keys(selectedSensors).forEach((key) => {
        if (selectedSensors[key] && typeof item[key] === "number") {
          minY = Math.min(minY, item[key]);
          maxY = Math.max(maxY, item[key]);
        }
      });
    });

    if (minY === Infinity || maxY === -Infinity) {
      return ["auto", "auto"];
    }

    // Optional: Add some padding
    const padding = (maxY - minY) * 0.1;
    return [minY - padding, maxY + padding];
  };

  const sensorColors = {
    temperature: "#ff7300",
    humidity: "#387908",
    moisture: "#8884d8",
    pollution: "#82ca9d",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Environmental Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">
        All times shown in {tzString}
      </p>

      {/* Filter Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="col-span-2 flex items-center space-x-4 flex-wrap">
          {Object.keys(selectedSensors).map((key) => (
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
          <ScatterChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              type="number"
              domain={["auto", "auto"]}
              tickFormatter={formatXAxis}
              angle={-30}
              textAnchor="end"
              height={50}
              tick={{ fontSize: 11 }}
              label={{
                value: `Time (${tzString})`,
                offset: 0,
                position: "bottom",
              }}
            />
            <YAxis domain={getYDomain(filteredData, selectedSensors)} />
            <Tooltip
              formatter={(value, name) => [
                value,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              labelFormatter={(label) =>
                new Date(label).toLocaleString(undefined, {
                  timeZoneName: "short",
                })
              }
            />
            <Legend />
            {Object.keys(selectedSensors).map((key) =>
              selectedSensors[key] && (
                <Scatter
                  key={key}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                  data={filteredData.map((item) => ({
                    time: item.time,
                    [key]: item[key],
                  }))}
                  x="time"
                  y={key}
                  fill={sensorColors[key]}
                  line={{ stroke: sensorColors[key] }}
                  lineJointType="monotone"
                  shape="circle"
                  radius={4}
                />
              )
            )}
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}