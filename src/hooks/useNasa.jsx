import axios from "axios";
import React from "react";

const getDate = () => {
  const x = new Date().toLocaleDateString("en-In", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const d = x.split("/");
  return d[2] + d[0] + d[1];
};

export default function useNasa() {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  async function mutate({ lat, lon }) {
    setIsLoading(true);
    const endpoint = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PS,WS10M&community=AG&longitude=${lon}&latitude=${lat}&start=19820101&end=${getDate()}&format=CSV
    `;
    return axios.get(endpoint).then(({ data }) => {
      setIsLoading(false);
      setData(data);
    });
  }
  return { mutate, isLoading, data };
}
