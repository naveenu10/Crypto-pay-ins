import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, Container, IconButton, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "../QrScan/QrScanPage.css";

function MetaMaskPage(props: any) {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const orders = context?.state?.orderDetails;
  const token = context?.state?.token;
  const paymentDetails = context?.state?.metamaskPaymentDetails;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);

  const handleIhavePaid = () => navigate("/detecting", { replace: true });

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

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
                    sx={{
                      mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "-8px",
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
                <div className="logo">
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>

            <div className="nivapay_section_container">
              <section className="nivapay_section">
                <p className="timer">Time left: {props.fixedTime} mins</p>
                <div className="choosecurrency" style={{ fontSize: 20 }}>
                  Complete Payment
                </div>
                <div style={{ marginTop: 10 }}>
                  <div className="qrCodeDivMetamask">
                    <Container>
                      <div style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "24px", fontWeight: "600px" }}>
                          {paymentDetails?.asset_amount &&
                            paymentDetails?.asset_amount}{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#000000",
                            fontWeight: "600",
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
                      <div
                        style={{
                          marginTop: "5px",
                          display: "flex",
                          height: "auto",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={`data:image/png;base64,${paymentDetails?.qr_string}`}
                          width={180}
                          height={180}
                        />
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        <span style={{ fontSize: "13px" }}>
                          Recommended network fee for fast
                          <br />
                          confirmation: <b>64 gwei</b>
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
                    >
                      <Button
                        className="continue"
                        variant="contained"
                        style={{ width: "325px", alignSelf: "center" }}
                        onClick={() =>
                          navigate("/metamask_wallet", { replace: true })
                        }
                      >
                        Open Metamask
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        className="paidBtn"
                        variant="outlined"
                        style={{ width: "325px", alignSelf: "center" }}
                        onClick={handleIhavePaid}
                        sx={{ textTransform: "none" }}
                      >
                        I have Paid
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        className="cancelbtn"
                        style={{ width: "325px", alignSelf: "center" }}

                        onClick={() => setOpenCloseDialog(true)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="footer">
                      <Footer />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <CancelPayment open={openCloseDialog} setOpen={setOpenCloseDialog} left_time={props?.fixedTime}/>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default MetaMaskPage;
