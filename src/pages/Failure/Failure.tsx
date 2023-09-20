import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate } from "react-router-dom";
import FailureLogo from "../../assets/images/NIcons/FailureLogo";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import { useGlobalContext } from "../../context/context";
import formatTitleCase from "../../utils/formatTitleCase";
import { useEffect, useState } from "react";
import "./Failure.css";

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const [timeFlag, setTimeFlag] = useState(false);
  const orders = context.state.orderDetails;
  const paymentDetails = context?.state?.qrData;

  function backtoCrypto() {
    window.location.replace(orders?.merchant_redirect_url);
  }
  const duration = 1 * 30 * 1000;
  const [time, setTime] = useState(duration);
  useEffect(() => {
    setTimeout(() => {
      if (time) {
        setTime(time - 1000);
      } else {
        setTimeFlag(true);
        window.location.replace(orders?.merchant_redirect_url);
      }
    }, 1000);
  }, [time]);
  let totalSeconds = Math.floor(time / 1000);
  let totalMinitus = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let minitus = totalMinitus % 60;
  let fixedTime = `${minitus < 10 ? `0${minitus}` : minitus}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  return (
    <Layout>
      <MobileContainer>
        <div className="main_section">
          <section
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AppBar position="static" className="header_main">
              <Toolbar className="header_sub">
                <div style={{ textAlign: "left" }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    disabled
                    sx={{
                      // mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {orders.merchant_brand_name && orders.merchant_brand_name}
                  </div>
                </div>
                <div className="logo">
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <div style={{ flex: 1 }}>
              <section className="nivapay_ramp">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "8%",
                  }}
                >
                  <div style={{ width: "30%" }}>
                    <FailureLogo />
                  </div>
                </div>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: "29px",
                    padding: "1rem",
                    display: "flex",
                    color: "#2C1E66",
                    justifyContent: "center",
                  }}
                >
                  Failure
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "11px",
                    lineHeight: "15px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  We could not detect your payment. If you have initiated the
                  transaction kindly wait for it to get confirmed on the
                  blockchain.
                </Typography>
                <div style={{ marginTop: "20%" }}>
                  <Divider />
                </div>
                <div>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">Order id</Typography>
                    <Typography className="info">
                      {" "}
                      {orders?.order_id && orders?.order_id}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">Action</Typography>
                    <Typography className="info">Payment</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">
                      Expected Amount(crypto)
                    </Typography>
                    <Typography className="info">
                      {" "}
                      {paymentDetails?.asset_amount &&
                        paymentDetails?.asset_amount}{" "}
                      {paymentDetails?.asset_symbol &&
                        paymentDetails?.asset_symbol?.toUpperCase()}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">
                      Destination Wallet
                    </Typography>
                    <Typography className="info">
                      {paymentDetails?.wallet_address &&
                        `${paymentDetails?.wallet_address.slice(
                          0,
                          7
                        )}...${paymentDetails?.wallet_address.slice(-4)}`}
                    </Typography>
                  </Stack>
                </div>
                <div style={{ marginTop: "2%" }}>
                  <Divider />
                </div>
              </section>
            </div>
            <div className="footer">
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17px",
                  textAlign: "center",
                  letterSpacing: "0.06em",
                  color: "#21146B",
                  marginBottom: "4%",
                }}
              >
                {/* Redirecting in <span style={{ color: '#279FFE' }}>30</span> secs...
                 */}
                Redirecting in{" "}
                <span style={{ color: "#279FFE" }}>
                {fixedTime}
                </span>{" "}
                <span>secs...</span>
              </Typography>
              <div
                style={{
                  marginBottom: "5rem",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  className="cryptobtn"
                  onClick={backtoCrypto}
                  style={{ width: "325px" }}
                >
                  {" "}
                  Back to{" "}
                  {orders?.merchant_brand_name &&
                    formatTitleCase(orders?.merchant_brand_name)}{" "}
                </Button>
              </div>
              <Footer />
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
