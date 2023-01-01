import React, { useState } from "react";
import "./App.css";
import usePlaces from "./hooks/usePlaces";

function App() {
  const [value, setValue] = React.useState("");
  const { mutate, isLoading, data } = usePlaces();
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
    </div>
  );
}

export default App;
