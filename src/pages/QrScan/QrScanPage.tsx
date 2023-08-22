import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, Container, IconButton, Toolbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import NetWorkFee from "../../dialogs/NetWorkfee";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import QrCode from "./QrCode";
import "./QrScanPage.css";
import ScanCopyTab from "./ScanCopyTab";
import Loader from "../../utils/Loader";
import formatCryptoAmount from "../../utils/formatCryptoAmount";
import formatTitleCase from "../../utils/formatTitleCase";
import { sendOrderEvent } from "../../services/depositServices";

function QrScanPage(props: any) {
  const context = useGlobalContext();
  const containerRef = React.useRef(null);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [openNetworkDialog, setOpenNetworkDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let coinName = context.state.selectedCoin;
  const orders = context.state.orderDetails;
  const selectedCoinData = context.state.selectedCoinData;
  const token = context.state.token;
  const qrData = context.state.qrData;
  const navigate = useNavigate();

  const onIhavePaid = async () => {
    setLoading(true);
    const hms = props.fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "user.action.transactionInitiated",
      asset_network: selectedCoinData?.asset_network,
      asset_symbol: selectedCoinData?.asset_symbol,
      asset_amount: selectedCoinData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status === 201) {
      setLoading(false);
      navigate("/detecting", { replace: true });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

  useEffect(() => {
    if (openCloseDialog) {
      window.onbeforeunload = null;
      return;
    }
        window.onbeforeunload = function () {
      const msg = "Are you sure you want to leave?";
      return msg;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [openCloseDialog]);

  return (
    <Layout>
      <MobileContainer>
        <div className="main_section" ref={containerRef}>
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
                    sx={{
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
                    }}
                    onClick={() => navigate("/quickpay", { replace: true })}
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
                <div
                  className="logo"
                  onClick={() => window.open("https://nivapay.com/")}
                >
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <p className="timer">
                    Time left:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {props.fixedTime} mins
                    </span>
                  </p>{" "}
                  <div className="choosecurrency">Complete Payment</div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ScanCopyTab />
                    </div>
                    <div className="qrCodeDiv">
                      <Container>
                        <div style={{ marginTop: "16px" }}>
                          <span style={{ fontSize: "24px", fontWeight: 600 }}>
                            {(qrData?.asset_amount &&
                              formatCryptoAmount(
                                coinName.toUpperCase(),
                                qrData?.asset_amount
                              )) ||
                              0}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              marginLeft: "4px",
                              fontWeight: 600,
                            }}
                          >
                            {coinName && coinName.toUpperCase()}
                          </span>
                        </div>
                        <div
                          style={{
                            marginTop: "4px",
                            color: "blue",
                            textDecoration: "underline",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#1856E7",
                              cursor: "pointer",
                            }}
                            onClick={() => setOpenNetworkDialog(true)}
                          >
                            + Network fee <span className="network-fee">i</span>{" "}
                          </span>
                        </div>
                        <div
                          style={{
                            marginTop: "12px",
                            fontSize: "12px",
                            fontWeight: 400,
                          }}
                        >
                          Scan this QR code using your wallet and transfer the
                          above amount
                        </div>
                        <div>
                          <QrCode />
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 400 }}>
                          Only send {coinName && coinName.toUpperCase()} using
                          the{" "}
                          {selectedCoinData?.asset_network &&
                            formatTitleCase(
                              selectedCoinData?.asset_network
                            )}{" "}
                          network, else <br /> the funds may get lost
                        </div>
                      </Container>
                    </div>
                  </div>
                </section>
                <div className="footer">
                  <div className="footer-buttons-container">
                    <div className="qr-button-info">
                      Click the below button once you have triggered the
                      transaction
                    </div>
                    <Button
                      className="continue"
                      variant="contained"
                      onClick={onIhavePaid}
                    >
                      I have Paid{" "}
                    </Button>
                    <Button
                      className="cancelbtn"
                      fullWidth
                      onClick={() => setOpenCloseDialog(true)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <Footer />
                </div>
              </div>
            )}
          </section>
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={props?.fixedTime}
            containerRef={containerRef}
          />
          <NetWorkFee
            openNetWorkfee={openNetworkDialog}
            setOpenNetworkfee={setOpenNetworkDialog}
          />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default QrScanPage;
