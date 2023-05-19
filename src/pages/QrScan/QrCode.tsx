import QRCode from "qrcode.react";
import React from "react";
import { useGlobalContext } from "../../context/context";

const DummyQRCode: React.FC = () => {
  const context = useGlobalContext();
  const qrData = context.state.qrData;
  const qrCode = qrData.qr_string;

  return (
    <div>
      <QRCode value={qrCode} />
    </div>
  );
};

export default DummyQRCode;
