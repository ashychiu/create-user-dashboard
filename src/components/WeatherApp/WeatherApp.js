import React from "react";
import { useEffect, useState } from "react";
import "./WeatherApp.scss";

const WeatherApp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.weather.gov/gridpoints/TOP/31,80/forecast"
        );
        const rawData = await res.json();
        setData(rawData.properties.periods);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div key={data.number} className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {data.map((location) => {
            return (
              <tr>
                <td>{location.name}</td>
                <td className="temperature">{location.temperature}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherApp;
