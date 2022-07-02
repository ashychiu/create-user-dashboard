import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApp.scss";

const WeatherApp = () => {
  const [data, setData] = useState([]);
  const API_URL = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${API_URL}`)
        .then((response) => setData(response.data.properties.periods))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        const rawData = await response.json();
        console.log(rawData);
      } catch (err) {
        console.log(err);
      }
    };
    getResponse();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://api.weather.gov/gridpoints/TOP/31,80/forecast"
  //       );
  //       const rawData = await res.json();
  //       setData(rawData.properties.periods);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
