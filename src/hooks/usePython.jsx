import axios from "axios";
import React from "react";

export default function usePython() {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  async function mutate(data) {
    console.log(data);
    setIsLoading(true);
    const endpoint = "http://127.0.0.1:5000";
    return axios.post(endpoint, data).then(({ data }) => {
      setIsLoading(false);
      setData(data);
    });
  }
  return { mutate, isLoading, data };
}
