import QRCode from "qrcode.react";
import React from "react";
import { useGlobalContext } from "../../context/context";
import { Skeleton } from "@mui/material";

const DummyQRCode: React.FC = () => {
  const context = useGlobalContext();
  const qrData = context.state.qrData;
  const qrCode = qrData.qr_string;

  return (
    <>
      {qrCode ? (
        <div style={{margin: "8px"}}>
          {/* <QRCode value={qrCode} size={180}/> */}
          <img
            src={`data:image/png;base64,${qrCode}`}
            width={194}
            height={196}
          />
        </div>
      ) : (
        <div
          style={{ display: "flex", margin: "12px", justifyContent: "center" }}
        >
          <Skeleton variant="rounded" width={176} height={176} />
        </div>
      )}
    </>
  );
};

export default DummyQRCode;
