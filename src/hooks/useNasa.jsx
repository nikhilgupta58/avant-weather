import axios from "axios";
import React from "react";
import usePython from "./usePython";

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
  const {
    mutate: pythonMutate,
    isLoading: pythonLoading,
    data: pythonData,
  } = usePython();
  const [isLoading, setIsLoading] = React.useState(false);
  async function mutate({ lat, lon }) {
    setIsLoading(true);
    const endpoint = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M,T2MDEW,T2MWET,TS,T2M_MAX,T2M_MIN,QV2M,RH2M,PS,WS10M,WS10M_MAX,WS10M_MIN,WD10M,WS50M,WS50M_MAX,WS50M_MIN,WD50M&community=AG&longitude=${lon}&latitude=${lat}&start=19820101&end=${getDate()}&format=CSV
    `;
    return axios.get(endpoint).then(({ data }) => {
      setIsLoading(false);
      pythonMutate(data);
    });
  }

  return { mutate, isLoading: pythonLoading || isLoading, data: pythonData };
}
