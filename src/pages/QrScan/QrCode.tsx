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
        <div>
          {/* <QRCode value={qrCode} size={180}/> */}
          <img
            src={`data:image/png;base64,${qrCode}`}
            width={180}
            height={180}
          />
        </div>
      ) : (
        <div
          style={{ display: "flex", margin: "12px", justifyContent: "center" }}
        >
          <Skeleton variant="rounded" width={160} height={160} />
        </div>
      )}
    </>
  );
};

export default DummyQRCode;
