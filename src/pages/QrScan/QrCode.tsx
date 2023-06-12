import QRCode from "qrcode.react";
import React from "react";
import { useGlobalContext } from "../../context/context";

const DummyQRCode: React.FC = () => {
  const context = useGlobalContext();
  const qrData = context.state.qrData;
  const qrCode = qrData.qr_string;

  return (
    <div>
      {/* <QRCode value={qrCode} /> */}
      <img  src={`data:image/png;base64,${qrCode}`} width={180} height={180}/>
    </div>
  );
};

export default DummyQRCode;
