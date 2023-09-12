import { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
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
    window.scrollTo(0, 0);
    fetchTransactionDetails();
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
                    className="icon-button"
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
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <div className="section-subdiv">
                    <div style={{ width: "20%" }}>
                      <div className="logo-container">
                        <div className="logo-glow">
                          <img src={timer_icon} alt="timer_icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="title">Detecting...</div>
                  <div className="subtitle">
                    We are scanning the network to detect your transaction.This
                    process may take up to{" "}
                    {transactions?.detecting_eta_mins &&
                      transactions?.detecting_eta_mins}{" "}
                    mins to complete.
                  </div>
                  <div className="detecting-divider">
                    <Divider className="divider" />
                  </div>
                  <div>
                    <Stack direction={"row"} spacing={2} className="row">
                      <div className="currency">Order id</div>
                      <div className="info">
                        {transactions?.order_id && transactions?.order_id}
                      </div>
                    </Stack>
                    <Stack direction={"row"} spacing={2} className="row">
                      <div className="currency">Action</div>
                      <div className="info">Payment</div>
                    </Stack>
                    <Stack direction={"row"} spacing={2} className="row">
                      <div className="currency">Expected Amount (crypto)</div>
                      <div className="info">
                        {" "}
                        {paymentDetails?.asset_amount &&
                          paymentDetails?.asset_amount}{" "}
                        {paymentDetails?.asset_symbol &&
                          paymentDetails?.asset_symbol?.toUpperCase()}
                      </div>
                    </Stack>
                    <Stack direction={"row"} spacing={2} className="row">
                      <div className="currency">Destination Wallet</div>
                      <div className="info">
                        {paymentDetails?.wallet_address &&
                          `${paymentDetails?.wallet_address.slice(
                            0,
                            7
                          )}...${paymentDetails?.wallet_address.slice(-4)}`}
                      </div>
                    </Stack>
                  </div>
                  <div className="divider-div">
                    <Divider className="divider" />
                  </div>
                  <div className="subtitle2">
                    You may close this window or go back by clicking the button
                    below. We are processing this transaction and will update
                    you the final status through email.
                  </div>
                </section>
              </div>
            )}
          </section>
          <div className="footer">
            <div className="footer-subdiv">
              <Button
                variant="contained"
                className="cryptobtn"
                onClick={backtoCrypto}
              >
                {" "}
                Back to{" "}
                {orders?.merchant_brand_name && orders?.merchant_brand_name}
              </Button>
            </div>
            <Footer />
          </div>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
