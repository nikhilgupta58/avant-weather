import axios from "axios";
import React from "react";

export default function usePlaces() {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  async function mutate(value) {
    setIsLoading(true);
    const endpoint = `https://openweathermap.org/data/2.5/find?q=${value}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`;
    return axios.get(endpoint).then(({ data }) => {
      setIsLoading(false);
      setData(data);
    });
  }
  return { mutate, isLoading, data };
}
