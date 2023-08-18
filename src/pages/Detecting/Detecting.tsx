import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import { useGlobalContext } from "../../context/context";
import "./Detecting.css";
import Loader from "../../utils/Loader";
import {
  getTransactionDetails,
  getTransactionStatus,
} from "../../services/depositServices";

const timer_icon = require("../../assets/images/timer_icon.png");

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const token = context.state.token;
  const orders = context.state.orderDetails;
  const transactions = context.state.transactionDetails;
  const paymentDetails = context?.state?.qrData;
  const [isLoading, setLoading] = useState(true);

  let interval: any;

  function backtoCrypto() {
    window.location.replace(orders?.merchant_redirect_url);
    clearInterval(interval);
  }

  const fetchTransactionDetails = async () => {
    const res: any = await getTransactionDetails(token);
    if (res.status === 200) {
      context.dispatch({
        type: "UPDATE_TRANSACTION_DETAILS",
        payload: res?.data,
      });
      setLoading(false);
      fetchTransactionStatus();
      interval = setInterval(() => fetchTransactionStatus(), 30000);
    } else {
      setLoading(false);
    }
  };

  const fetchTransactionStatus = async () => {
    const res: any = await getTransactionStatus(token);
    if (res.status === 200) {
      if (res?.data?.order_status === "SUCCESS") {
        navigate("/success", { replace: true });
        clearInterval(interval);
      }
      if (res?.data?.order_status === "FAILED") {
        navigate("/failure", { replace: true });
        clearInterval(interval);
      }
    } else {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

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
                      borderRadius: "30%",
                      padding: "5px",
                      marginLeft: "-8px",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {orders?.merchant_brand_name && orders?.merchant_brand_name}
                  </div>
                </div>
                <div className="logo" onClick={()=> window.open("https://nivapay.com/")}>
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "12%",
                    }}
                  >
                    <div style={{ width: "20%" }}>
                      <div className="logo-container">
                        <div className="logo-glow">
                          <img src={timer_icon} alt="timer_icon" />
                        </div>
                      </div>
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
                    Detecting...
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
                    We are scanning the network to detect your transaction.This
                    process may take up to 30 mins to complete.
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
                        {transactions?.order_id && transactions?.order_id}
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
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "15px",
                      textAlign: "center",
                      letterSpacing: "0.06em",
                      color: "#808080",
                      marginTop: "6%",
                      marginBottom: 40,
                    }}
                  >
                    You may close this window or go back by clicking the button
                    below. We are processing this transaction and will update
                    you the final status through email.
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "325px",
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      className="cryptobtn"
                      style={{ width: "325px", alignSelf: "center" }}
                      onClick={backtoCrypto}
                    >
                      {" "}
                      Back to{" "}
                      {orders?.merchant_brand_name &&
                        orders?.merchant_brand_name}
                    </Button>
                  </div>
                </section>
              </div>
            )}
          </section>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
