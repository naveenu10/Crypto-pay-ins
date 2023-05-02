import React from "react";
import { Circles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        left: 0,
        top: 0,
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        position: "fixed",
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.7)",
        flexDirection: "column",
      }}
    >
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        // visible={true}
      />
    </div>
  );
}
