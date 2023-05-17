import React from 'react'
import { Circles } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div style={{
            display: "flex",
            width: "100%",
            left: 0,
            top: 0,
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            position: "fixed",
            zIndex: 999999,
            background: "#fff",
            flexDirection: "column",
        }}>
            <Circles
                height="120"
                width="120"
                color="#279FFE"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            // visible={true}
            />
        </div>
    )
}
