import { useEffect, useState } from "react";
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
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import TimeoutLogo from "../../assets/images/NIcons/TimeoutLogo";
import Footer from "../../components/Footer/Footer";
import { useGlobalContext } from "../../context/context";
import formatTitleCase from "../../utils/formatTitleCase";
import { sendOrderEvent } from "../../services/depositServices";

function Detecting(props: any) {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const [timeFlag, setTimeFlag] = useState(false);
  const orders = context.state.orderDetails;
  const token = context.state.token;
  const selectedCoinData = context.state.selectedCoinData;

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

  const sendTimeoutEvent = async () => {
    const hms = props.fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "session.timeout",
      asset_network: selectedCoinData?.asset_network,
      asset_symbol: selectedCoinData?.asset_symbol,
      asset_amount: selectedCoinData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status !== 201) {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (token) {
      sendTimeoutEvent();
    }
  }, []);

  return (
    <div className="main_section">
      <section className="sub-section">
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
                {orders.merchant_brand_name &&
                  formatTitleCase(orders?.merchant_brand_name)}
              </div>
            </div>
            <div className="logo">
              <NivapayLogo1 />
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ flex: 1 }}>
          <section className="nivapay_ramp">
            <p className="timer">
              Time left: <span style={{ fontWeight: 600 }}>00:00 mins</span>
            </p>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "8%",
              }}
            >
              <div style={{ width: "30%" }}>
                <TimeoutLogo />
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
              Timed Out !
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
              You did not complete the payment within the prescribed time
              duration. You may re-initiate the process to try again.
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
                <Typography className="currency">Order Amount</Typography>
                <Typography className="info">
                  {orders?.order_currency_symbol &&
                    (orders?.order_currency_symbol).toUpperCase()}{" "}
                  {orders?.order_amount &&
                    Number(orders?.order_amount).toFixed(2)}
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
            Redirecting in <span style={{ color: "#279FFE" }}>{fixedTime}</span>{" "}
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
            >
              {" "}
              Back to{" "}
              {orders?.merchant_brand_name &&
                formatTitleCase(orders?.merchant_brand_name)}
            </Button>
          </div>
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default Detecting;
