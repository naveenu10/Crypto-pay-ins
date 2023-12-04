import React from "react";
import { Circles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        maxWidth: "428px",
        height: "680px",
        justifyContent: "center",
        // top: 0,
        // left: 0,
        // flexDirection: "column",
        // position: "fixed",
        // zIndex: 999999,
        // background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Circles
          height="120"
          width="120"
          color="#279FFE"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          // visible={true}
        />
        <p style={{ textAlign: "center" }}>
          {" "}
          Please do not refresh the page or click the
          <br />
          "Back" or Close button of your browser
        </p>
      </div>
    </div>
  );
}
