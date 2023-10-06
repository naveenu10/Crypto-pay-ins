import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Skeleton,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import detectEthereumProvider from "@metamask/detect-provider";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "../QrScan/QrScanPage.css";
import MetamaskError from "../../dialogs/MetamaskError";
import { sendOrderEvent } from "../../services/depositServices";

function MetaMaskPage(props: any) {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const orders = context?.state?.orderDetails;
  const token = context?.state?.token;
  const paymentDetails = context?.state?.qrData;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [address, setAddress] = useState<any | null>("");
  const [showErr, setShowErr] = useState(false);
  const qrData = context.state.qrData;

  const handleIhavePaid = async () => {
    const hms = props.fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "user.action.transactionInitiated",
      asset_network: qrData?.asset_network,
      asset_symbol: qrData?.asset_symbol,
      asset_amount: qrData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status === 201) {
      navigate("/detecting", { replace: true });
    } else {
      // setLoading(false);
    }
  };

  let currentAccount: string;
  function handleAccountsChanged(accounts: string | any[]) {
    if (accounts.length === 0) {
      setAddress("");
    } else if (accounts[0] !== currentAccount) {
      navigate("/metamask_wallet", { replace: true });
      currentAccount = accounts[0];
      setAddress(currentAccount);
      // getBalance(currentAccount);
    }
  }

  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  async function connectMetamask() {
    if (isMobileDevice()) {
      window.open(`${qrData?.metamask_app_url}`);
    } else {
      var ethereum: any = await detectEthereumProvider();
      if (ethereum) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then(handleAccountsChanged)
          .catch((err: { code: number | any }) => {
            if (err.code === 4001) {
            } else {
              console.log("Please select the Network");
            }
          });
      } else {
        setShowErr(true);
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
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
    };

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
                      // mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
                    }}
                    onClick={() => navigate("/wallet", { replace: true })}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {orders.merchant_brand_name && orders.merchant_brand_name}
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

            <div className="nivapay_section_container">
              <section className="nivapay_section">
                <p className="timer">
                  Time left:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {props.fixedTime} mins
                  </span>
                </p>{" "}
                <div className="choosecurrency" style={{ fontSize: 20 }}>
                  Complete Payment
                </div>
                <div className="m-qr-card">
                  <div className="qrCodeDivMetamask">
                    <Container>
                      <div style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "24px", fontWeight: 600 }}>
                          {paymentDetails?.asset_amount &&
                            paymentDetails?.asset_amount}{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#000000",
                            fontWeight: 600,
                            marginLeft: "4px",
                          }}
                        >
                          {paymentDetails?.asset_symbol &&
                            paymentDetails?.asset_symbol?.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ marginTop: "4px", color: "#808080" }}>
                        <span style={{ fontSize: "12px" }}>+ Network fee </span>
                      </div>
                      <div style={{ marginTop: "12px" }}>
                        <span style={{ fontSize: "12px" }}>
                          Scan this QR code using your MetaMask wallet or
                          connect it using the button below
                        </span>
                      </div>
                      <div className="m-qr-div">
                        {paymentDetails?.qr_string ? (
                          <img
                            src={`data:image/png;base64,${paymentDetails?.qr_string}`}
                            width={191}
                            height={196}
                          />
                        ) : (
                          <Skeleton
                            variant="rounded"
                            width={160}
                            height={160}
                            style={{ margin: 10 }}
                          />
                        )}
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        <span style={{ fontSize: "13px" }}>
                          Recommended network fee for fast
                          <br />
                          confirmation:{" "}
                          <b>
                            {paymentDetails?.gas_price_fast_ethereum_gwei} gwei
                          </b>
                        </span>
                      </div>
                    </Container>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></div>

                    <div className="footer">
                      <div className="footer-buttons-container">
                        <Button
                          className="continue"
                          variant="contained"
                          style={{ marginBottom: "10px" }}
                          onClick={connectMetamask}
                        >
                          Open Metamask
                        </Button>
                        <Button
                          className="continue"
                          variant="outlined"
                          onClick={handleIhavePaid}
                          sx={{ textTransform: "none" }}
                        >
                          I have Paid
                        </Button>
                        <Button
                          className="cancelbtn"
                          style={{ width: "inherit" }}
                          onClick={() => setOpenCloseDialog(true)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <Footer />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={props?.fixedTime}
            containerRef={containerRef}
          />
          <MetamaskError error={showErr} setError={setShowErr} />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default MetaMaskPage;
