import React from "react";
import { Circles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",
        width: "428px",
        // left: 0,
        // top: 0,
        height: "680px",
        justifyContent: "center",
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
      {/* <p></p> */}
    </div>
  );
}
