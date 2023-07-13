import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import SuccessLogo from "../../assets/images/NIcons/SuccessLogo";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./Success.css";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import formatTitleCase from "../../utils/formatTitleCase";

function Detecting() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const context = useGlobalContext();
  const orders = context.state.orderDetails;
  const transactions = context.state.transactionDetails;
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [getTextColor, setTextColor] = useState<any>("rgba(0, 0, 0, 0.5)");
  const [timeFlag, setTimeFlag] = useState(false);
  const backtoCrypto = () => {
    window.location.replace(transactions?.merchant_redirect_url);
  };

  const duration = 1 * 30 * 1000;
  const [time, setTime] = useState(duration);
  useEffect(() => {
    setTimeout(() => {
      if (time) {
        setTime(time - 1000);
      } else {
        setTimeFlag(true);
        window.location.replace(transactions?.merchant_redirect_url);
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

  const priceComparison = (receivedAmount: any) => {
    if (receivedAmount < transactions?.order_crypto_amount) {
      setErrorMsg(
        "You have paid a lower than anticipated amount. You may re-initiate the process to pay the remaining amount or contact the merchant to reconcile."
      );
      setTextColor("#FF0000");
    }
    if (receivedAmount > transactions?.order_crypto_amount) {
      setErrorMsg(
        "You have paid a higher than anticipated amount. You may contact the merchant to reconcile."
      );
      setTextColor("#FF0000");
    } else {
      setErrorMsg("");
      setTextColor("rgba(0, 0, 0, 0.5) ");
    }
  };

  useEffect(() => {
    if (transactions?.transaction_amount) {
      priceComparison(transactions?.transaction_amount);
    }
  }, [transactions?.order_crypto_amount, transactions?.transaction_amount]);

    useEffect(() => {
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
              height: matches ? "100vh" : "auto",
              minHeight: 750,
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
                      mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "-8px",
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {" "}
                    {orders?.merchant_brand_name && orders?.merchant_brand_name}
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
                  <div style={{ width: "20%" }}>
                    <SuccessLogo />
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
                  Success
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "15px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    color: "#21146B",
                  }}
                >
                  {errorMsg && errorMsg}
                </Typography>
                <div style={{ marginTop: "25px" }}>
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
                      {transactions?.order_id && transactions?.order_id}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">Action</Typography>
                    <Typography className="info">
                      {" "}
                      {transactions?.action && transactions?.action}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">
                      Order Amount (crypto)
                    </Typography>
                    <Typography className="info">
                      {" "}
                      {transactions?.order_crypto_amount &&
                        transactions?.order_crypto_amount}{" "}
                      {transactions?.order_crypto_symbol &&
                        (transactions?.order_crypto_symbol).toUpperCase()}
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
                      {transactions?.destination_wallet_address &&
                        `${transactions?.destination_wallet_address.slice(
                          0,
                          7
                        )}...${transactions?.destination_wallet_address.slice(
                          -4
                        )}`}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">
                      Received amount (crypto)
                    </Typography>
                    <Typography style={{ color: getTextColor }}>
                      {" "}
                      {transactions?.transaction_amount &&
                        transactions?.transaction_amount}{" "}
                      {transactions?.transaction_asset_symbol &&
                        (transactions?.transaction_asset_symbol).toUpperCase()}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ justifyContent: "space-between", padding: "6px" }}
                  >
                    <Typography className="currency">
                      Transaction Hash
                    </Typography>
                    <Typography className="info" style={{ gap: "5px" }}>
                      <img
                        src="https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683182823/ph_copy_lnoksz.svg"
                        alt="copyimage"
                        style={{ cursor: "pointer" }}
                        onClick={() => copy(transactions?.transaction_hash)}
                      />
                      <img
                        src="https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683183469/Icon_lrkziq.svg"
                        alt="redirect"
                        style={{ cursor: "pointer" }}
                        onClick={() => window.open("https://blockchair.com")}
                      />
                    </Typography>
                  </Stack>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "17px",
                      letterSpacing: "0.06em",
                      color: "rgba(0, 0, 0, 0.5)",
                      wordBreak: "break-all",
                    }}
                  >
                    {transactions?.transaction_hash &&
                      transactions?.transaction_hash}
                  </Typography>
                </div>
                <div style={{ marginTop: "2%" }}>
                  <Divider />
                </div>
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
                    marginTop: "15%",
                  }}
                >
                  {/* Redirecting in <span style={{ color: '#279FFE' }}>30</span> secs... */}
                  Redirecting in{" "}
                  <span style={{ color: "#279FFE" }}>
                    {/* <Countdown date={Date.now() + 30000} renderer={renderer} /> */}
                    {fixedTime}
                  </span>{" "}
                  <span>secs...</span>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3%",
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
              </section>
            </div>
            <div className={matches ? "footer" : "footerSmall"}>
              <Footer />
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
