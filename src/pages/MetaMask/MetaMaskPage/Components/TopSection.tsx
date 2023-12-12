import { Container, Skeleton } from "@mui/material";
import Timer from "../../../../components/Timer";
import { useGlobalContext } from "../../../../context/context";

function TopSection({ fixedTime }: any) {
  const context = useGlobalContext();
  const paymentDetails = context?.state?.qrData;
  return (
    <section className="nivapay_section">
      <Timer fixedTime={fixedTime} />
      <div className="choosecurrency">Complete Payment</div>
      <div className="m-qr-card">
        <div className="qrCodeDivMetamask">
          <Container>
            <div>
              <span className="fee-title">
                {!!paymentDetails?.asset_amount
                  ? paymentDetails?.asset_amount
                  : 0}
              </span>
              <span className="fee-symbol">
                {paymentDetails?.asset_symbol &&
                  paymentDetails?.asset_symbol?.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="network-fee-title">+ Network fee </span>
            </div>
            <div className="scan-discription">
              <span>
                Scan this QR code using your MetaMask wallet or connect it using
                the button below
              </span>
            </div>
            <div className="m-qr-div">
              {paymentDetails?.qr_string ? (
                <img
                  src={`data:image/png;base64,${paymentDetails?.qr_string}`}
                  width={160}
                  height={160}
                />
              ) : (
                <Skeleton
                  variant="rounded"
                  width={160}
                  height={160}
                  style={{ margin: 10 }}
                />
              )}
            </div>
            <div className="fee-suggestion">
              <span>
                Recommended network fee for fast
                <br />
                confirmation:{" "}
                <b>{paymentDetails?.gas_price_fast_ethereum_gwei} gwei</b>
              </span>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

export default TopSection;
