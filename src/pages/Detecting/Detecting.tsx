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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import Processing from "../../assets/images/NIcons/Processing";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import { useGlobalContext } from "../../context/context";
import "./Detecting.css";
import axios from "axios";
import Loader from "../../utils/Loader";
import { BASE_URL } from "../../config";
import formatCryptoAmount from "../../utils/formatCryptoAmount";
// import timer_icon from "../../assets/images/timer_icon.png";

const timer_icon = require("../../assets/images/timer_icon.png");

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const token = context.state.token;
  const orders = context.state.orderDetails;
  const transactions = context.state.transactionDetails;
  const [isLoading, setLoading] = useState(false);

  let interval: any;

  function backtoCrypto() {
    window.location.replace(transactions?.merchant_redirect_url);
    clearInterval(interval);
  }

  const fetchTransactionDetails = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/sdk/deposit/transaction/details/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);

        context.dispatch({
          type: "UPDATE_TRANSACTION_DETAILS",
          payload: res?.data,
        });
        setLoading(false);
        // let interval:any
        fetchTransactionStatus();
        interval = setInterval(() => fetchTransactionStatus(), 30000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchTransactionStatus = async () => {
    // setLoading(true);
    await axios
      .get(`${BASE_URL}/sdk/deposit/transaction/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.order_status === "success") {
          navigate("/success", { replace: true });
          clearInterval(interval);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/failure", { replace: true });
      });
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
                <div className="logo">
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            {isLoading ? (
              <Loader />
            ) : (
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
                        {transactions?.order_crypto_amount &&
                          formatCryptoAmount(
                            transactions?.order_crypto_symbol?.toUpperCase(),
                            transactions?.order_crypto_amount
                          )}{" "}
                        {transactions?.order_crypto_symbol &&
                          transactions?.order_crypto_symbol?.toUpperCase()}
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
                      marginBottom: 30,
                    }}
                  >
                    You may close this window or go back by clicking the button
                    below. We are processing this transaction and will update
                    you the final status through email.
                  </Typography>
                  <div>
                    <Button
                      variant="contained"
                      className="cryptobtn"
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
          <div className={matches ? "footer" : "footerSmall"}>
            <Footer />
          </div>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
