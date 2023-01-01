import React, { useState } from "react";
import "./App.css";
import useNasa from "./hooks/useNasa";
import usePlaces from "./hooks/usePlaces";

function App() {
  const [value, setValue] = React.useState("");
  const { mutate, isLoading, data } = usePlaces();
  const { mutate: nasaMutate, isLoading: nasaLoading } = useNasa();
  const handleClick = () => {
    if (value) mutate(value);
  };
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          style={{
            border: "1px solid",
            width: "300px",
            height: "30px",
            borderRadius: "4px",
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.code == "Enter") handleClick();
          }}
        />
        <button
          style={{ height: "30px", width: "100px" }}
          onClick={() => {
            handleClick();
          }}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </div>
      {nasaLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {data?.list.map((row, id) => (
            <div
              key={id}
              onClick={() =>
                nasaMutate({ lat: row?.coord?.lat, lon: row?.coord?.lon })
              }
              style={{ cursor: "pointer" }}
            >
              {row?.name}, {row?.sys?.country} - lat - {row?.coord?.lat} / lon -{" "}
              {row?.coord?.lon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
