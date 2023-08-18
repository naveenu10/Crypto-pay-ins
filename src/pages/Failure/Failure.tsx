import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate } from "react-router-dom";
import FailureLogo from "../../assets/images/NIcons/FailureLogo";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import { useGlobalContext } from "../../context/context";
import formatTitleCase from "../../utils/formatTitleCase";
import { useEffect } from "react";

function Detecting() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
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
                <div className="logo" >
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
                    <Typography className="currency">
                      Expected Amount(crypto)
                    </Typography>
                    <Typography className="info">
                      {" "}
                      {orders?.order_currency &&
                        (orders?.order_currency).toUpperCase()}{" "}
                      {orders?.order_amount &&
                        Number(orders?.order_amount).toFixed(2)}
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
                      {orders?.destination_wallet_address &&
                        `${orders?.destination_wallet_address.slice(
                          0,
                          7
                        )}...${orders?.destination_wallet_address.slice(-4)}`}
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
                    marginTop: "17%",
                  }}
                >
                  {/* Redirecting in <span style={{ color: '#279FFE' }}>30</span> secs...
                   */}
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
                    marginBottom:"23%"
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
                      formatTitleCase(orders?.merchant_brand_name)}{" "}
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
