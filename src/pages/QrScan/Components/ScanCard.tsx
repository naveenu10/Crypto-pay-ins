import { Container } from "@mui/material";
import formatTitleCase from "../../../utils/formatTitleCase";
import DummyQRCode from "./QrCode";
import info_icon from "../../../assets/icons/info_icon.png";

function ScanCard(props: any) {
  const { qrData, setOpenNetworkDialog } = props;
  return (
    <div className="qrCodeDiv">
      <Container>
        <div className="qrAmount">
          {(qrData?.asset_amount && qrData?.asset_amount) || 0}
        </div>
        <div className="qrSymbol">
          {qrData?.asset_symbol && qrData?.asset_symbol?.toUpperCase()}
        </div>
        <div className="networkFee">
          <div className="bottomLine">
            <span
              onClick={() => setOpenNetworkDialog(true)}
              className="bottomLineContent"
            >
              + Network fee
              <img src={info_icon} className="network-fee-icon" />
            </span>
          </div>
        </div>
        <div className="qrText">
          Scan this QR code using your wallet and transfer the above amount
        </div>
        <div>
          <DummyQRCode />
        </div>
        <div className="qr-copy-div">
          Only send{" "}
          {qrData?.asset_symbol && qrData?.asset_symbol?.toUpperCase()} using
          the {qrData?.asset_network && formatTitleCase(qrData?.asset_network)}{" "}
          network, else the funds may get lost
        </div>
      </Container>
    </div>
  );
}

export default ScanCard;
