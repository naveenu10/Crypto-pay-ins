import { useEffect } from "react";
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
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import { useGlobalContext } from "../../context/context";
import formatTitleCase from "../../utils/formatTitleCase";

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const orders = context.state.orderDetails;

  function backtoCrypto() {
    window.location.replace(orders?.merchant_redirect_url);
  }
  const Completionist = () => {
    window.location.replace(orders?.merchant_redirect_url);
    return <span>You are good to go!</span>;
  };
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  useEffect(() => {
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  return (
    <Layout>
      <MobileContainer>
        <div style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <AppBar
              position="static"
              style={{ backgroundColor: "#279FFE", boxShadow: "none" }}
            >
              <Toolbar
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  paddingLeft: "22px",
                }}
              >
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
                  <Typography
                    variant="h5"
                    component="h3"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "20px",
                      lineHeight: "24px",
                      textAlign: "center",
                      color: "#FFFFFF",
                      letterSpacing: "0.05rem",
                    }}
                  >
                    Cryptogames
                  </Typography>
                </div>
                <div style={{ width: "30px", height: "30px" }}>
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <div style={{ flex: 1, height: "50vh", overflowY: "auto" }}>
              <section className="nivapay_ramp">
                <Typography
                  style={{
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "30px",
                    textAlign: "center",
                    letterSpacing: "0.06em",
                    color: "#000000",
                    fontFamily: "Inter",
                    padding: "10px",
                  }}
                >
                  Time left 00:00 mins
                </Typography>
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
                <div style={{ marginTop: "30%" }}>
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
                      {orders?.id && orders?.id}
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
                      {orders?.order_currency &&
                        (orders?.order_currency).toUpperCase()}{" "}
                      {orders?.order_amount &&
                        Number(orders?.order_amount).toFixed(2)}
                    </Typography>
                  </Stack>
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
                    marginTop: "20%",
                  }}
                >
                  {/* Redirecting in <span style={{ color: '#279FFE' }}>30</span> secs... */}
                  Redirecting in{" "}
                  <span style={{ color: "#279FFE" }}>
                    <Countdown date={Date.now() + 30000} renderer={renderer} />
                  </span>{" "}
                  <span>secs...</span>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "4%",
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
            <div style={{ justifyContent: "flex-end" }}>
              <Footer />
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
