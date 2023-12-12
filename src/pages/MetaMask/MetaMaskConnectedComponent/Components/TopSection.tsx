import { Container, Skeleton, Typography } from "@mui/material";
import Timer from "../../../../components/Timer";
import { useGlobalContext } from "../../../../context/context";
import { useNavigate } from "react-router-dom";
import getNumericPrecision from "../../../../utils/getCryptoPrecision";
import getChainNameFromId from "../../../../utils/getChainNameFromId";

function TopSection(props: any) {
  const {
    fixedTime,
    chaindid,
    desiredChainId,
    balance,
    address,
    symbol,
    setAddress,
  } = props;

  const context = useGlobalContext();
  const navigate = useNavigate();
  const paymentDetails = context?.state?.qrData;

  const handlePrecision = () => {
    const val = getNumericPrecision(
      paymentDetails?.asset_symbol.toUpperCase(),
      paymentDetails?.asset_network
    );
    const formattedBalance = Number(balance)?.toFixed(val);
    return formattedBalance;
  };

  return (
    <section className="nivapay_section">
      <Timer fixedTime={fixedTime} />
      <div className="choosecurrency">Complete Payment</div>
      <div className="m-qr-card">
        <div className="qrMetamaskConnected">
          <Container>
            <div>
              <span className="fee-title">
                {!!paymentDetails?.asset_amount
                  ? paymentDetails?.asset_amount
                  : 0}{" "}
              </span>
              <span className="fee-symbol">
                {paymentDetails?.asset_symbol &&
                  (paymentDetails?.asset_symbol).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="network-fee-title">+ Network fee</span>
            </div>

            <div className="m-account-div">
              <div className="m-error-sub-div">
                {chaindid !== desiredChainId ? (
                  <Typography className="m-error-message">
                    Switch the network in your wallet to{" "}
                    {paymentDetails?.asset_network}
                  </Typography>
                ) : (
                  balance &&
                  Number(paymentDetails?.asset_amount) >= balance && (
                    <Typography className="m-error-message">
                      Your balance is insufficient
                    </Typography>
                  )
                )}
              </div>
              <div className="m-account">
                <div className="m-title">MetaMask</div>
                <div className="m-status ">
                  {address ? "Connected" : "Disconnected"}
                </div>
              </div>
              <hr />

              <div className="m-account-row">
                <div>Account</div>
                <div className="m-address">
                  {address && `${address?.slice(0, 7)}...${address.slice(-4)}`}
                </div>
              </div>
              <div className="m-account-row">
                <div>Network</div>
                <div>{getChainNameFromId(chaindid)}</div>
              </div>
              <div className="m-account-row">
                <div>Balance</div>
                {chaindid === desiredChainId ? (
                  <div>
                    {balance ? (
                      <>
                        {handlePrecision()} {symbol}
                      </>
                    ) : (
                      <div style={{ width: 80 }}>
                        <Skeleton />
                      </div>
                    )}
                  </div>
                ) : (
                  "--"
                )}
              </div>
            </div>
            <div
              className="m-disconnect"
              onClick={() => {
                setAddress("");
                navigate("/metamask_scan", { replace: true });
              }}
            >
              Disconnect Wallet
            </div>

            <div className="fee-suggestion">
              <span>
                Recommended network fee for fast <br />
                confirmation:
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
