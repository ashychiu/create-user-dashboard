import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TRANSLINK_SECRET;
const route = "N19";

const config = {
  headers: {
    Accept: "application/json",
  },
};

const TransLink = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://api.translink.ca/rttiapi/v1/buses?apikey=${API_KEY}&routeNo=${route}`,
          config
        )
        .then((response) => setData(response.data))
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  console.log(data);
  if (!data.length) return <h1>Loading</h1>;
  return (
    <main>
      <p>Bus Route: {route}</p>

      <p>No. of buses currently running: {data.length}</p>

      <div>
        Buses going {data[0].Direction} to {data[0].Destination}:
        {data
          .filter((bus) => bus.Direction === data[0].Direction)
          .map((bus, index) => {
            return (
              <div key={index}>
                <p>###Vehicle no.: {bus.VehicleNo}</p>
                <p></p>
              </div>
            );
          })}
      </div>
      <div>
        {data.length > 1 && (
          <p>
            Buses going {data[1].Direction} to {data[1].Destination}
          </p>
        )}
        {data.length > 1 &&
          data
            .filter((bus) => bus.Direction !== data[0].Direction)
            .map((bus, index) => {
              return (
                <div key={index}>
                  <p>###Destination.: {bus.Destination}</p>
                  <p>###Direction.: {bus.Direction}</p>
                  <p>###Vehicle no.: {bus.VehicleNo}</p>
                  <p></p>
                </div>
              );
            })}
      </div>
    </main>
  );
};

export default TransLink;
