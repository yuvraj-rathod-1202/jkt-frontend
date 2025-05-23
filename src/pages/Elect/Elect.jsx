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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState({
    temperature: true,
    humidity: true,
    moisture: true,
    pollution: true,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tzOffsetMinutes = -new Date().getTimezoneOffset();
  const tzSign = tzOffsetMinutes >= 0 ? "+" : "-";
  const tzHours = String(Math.floor(Math.abs(tzOffsetMinutes) / 60)).padStart(2, "0");
  const tzMins = String(Math.abs(tzOffsetMinutes) % 60).padStart(2, "0");
  const tzString = `UTC${tzSign}${tzHours}:${tzMins}`;

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (startDate) params.append("start", startDate.toISOString());
    if (endDate) params.append("end", endDate.toISOString());
    return params.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = buildQuery();
        const baseUrl = "https://jkt-backend.vercel.app/api/elect/";
        const url = query ? `${baseUrl}?${query}` : baseUrl;
        console.log("Fetching data:", url);
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Error ${resp.status}`);
        const json = await resp.json();
        const chartData = json.map((item) => ({
          time: new Date(item.time).getTime(),
          temperature: parseFloat(item.tempreature ?? item.temperature),
          humidity: parseFloat(item.humidity),
          moisture: parseFloat(item.moisture),
          pollution: parseFloat(item.pollution),
        }));
        setData(chartData.sort((a, b) => a.time - b.time));
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

  const toggleSensor = (key) =>
    setSelectedSensors((prev) => ({ ...prev, [key]: !prev[key] }));

  const formatXAxis = (tick) =>
    new Date(tick).toLocaleString(undefined, {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getXDomain = (arr) =>
    arr.length ? [Math.min(...arr.map((d) => d.time)), Math.max(...arr.map((d) => d.time))] : ["auto", "auto"];

  const getYDomain = (arr, sensors) => {
    let minY = Infinity,
      maxY = -Infinity;
    arr.forEach((item) =>
      Object.keys(sensors).forEach((key) => {
        if (sensors[key] && typeof item[key] === "number" && !isNaN(item[key])) {
          minY = Math.min(minY, item[key]);
          maxY = Math.max(maxY, item[key]);
        }
      })
    );
    if (minY === Infinity) return ["auto", "auto"];
    const pad = (maxY - minY) * 0.1;
    return [minY - pad, maxY + pad];
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
      <p className="text-sm text-gray-500 mb-4">All times shown in {tzString}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="col-span-2 flex items-center flex-wrap space-x-4">
          {Object.keys(selectedSensors).map((key) => (
            <label key={key} className="inline-flex items-center mt-2">
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

      {loading && <p>Loading data…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
          <p className="mb-2 text-sm text-gray-600">Points: {filteredData.length}</p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="time"
                type="number"
                domain={getXDomain(filteredData)}
                ticks={
                  filteredData.length
                    ? Array.from({ length: Math.ceil((getXDomain(filteredData)[1] - getXDomain(filteredData)[0]) / (30 * 60 * 1000)) + 1 }, (_, i) =>
                        getXDomain(filteredData)[0] + i * 30 * 60 * 1000
                      )
                    : []
                }
                tickFormatter={formatXAxis}
                angle={-30}
                textAnchor="end"
                height={50}
                tick={{ fontSize: 11 }}
                label={{ value: `Time (${tzString})`, position: "bottom", offset: 0 }}
              />

              <YAxis domain={getYDomain(filteredData, selectedSensors)} />

              <Tooltip
                formatter={(value, name) => [
                  value,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
                labelFormatter={(label) =>
                  new Date(label).toLocaleString(undefined, { timeZoneName: "short" })
                }
              />

              <Legend />

              {Object.keys(selectedSensors).map(
                (key) =>
                  selectedSensors[key] && (
                    <Scatter
                      key={key}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                      dataKey={key}
                      fill={sensorColors[key]}
                      shape="circle"
                      radius={4}
                      line={{ stroke: sensorColors[key], strokeWidth: 2 }}
                    />
                  )
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}