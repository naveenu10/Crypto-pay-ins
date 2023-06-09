import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../config";
import Loader from "../../utils/Loader";
import formatCryptoAmount from "../../utils/formatCryptoAmount";
import formatTitleCase from "../../utils/formatTitleCase";

function QrScanPage(props: any) {
  const context = useGlobalContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const [userName, setUserName] = useState("laxmi@gmail.com");
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [openNetworkDialog, setOpenNetworkDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let coinName = context.state.selectedCoin;
  const orders = context.state.orderDetails;
  const selectedCoinData = context.state.selectedCoinData;
  const token = context.state.token;
  const qrData = context.state.qrData;

  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();

  const onIhavePaid = async () => {
    setLoading(true);
    const now = Date.now();
    const payload = {
      user_event: "i have paid",
      timestamp: now,
    };
    await axios
      .post(`${BASE_URL}/sdk/deposit/order/events`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        navigate("/detecting", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getQrCode = async () => {
    await axios
      .get(
        `${BASE_URL}/sdk/deposit/address/${selectedCoinData?.asset_network}/${selectedCoinData?.asset_symbol}/${selectedCoinData?.asset_quote}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res);
        context.dispatch({
          type: "GET_QR_DATA",
          payload: res?.data,
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/error", { replace: true });
        setLoading(false);
      });
  };

  useEffect(() => {
    getQrCode();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  useEffect(() => {
    if (!orders) {
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
                    sx={{
                      mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "-8px",
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
                  <p className="timer">Time left: {props.fixedTime} mins</p>
                  <div className="choosecurrency">Complete Payment</div>
                  <div>
                    <div
                      style={{
                        // marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ScanCopyTab />
                    </div>
                    <div className="qrCodeDiv">
                      <Container>
                        <div style={{ marginTop: "16px" }}>
                          <span style={{ fontSize: "24px" }}>
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
                              fontWeight: "bold",
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
                            style={{ fontSize: "12px" }}
                            onClick={() => setOpenNetworkDialog(true)}
                          >
                            + Network fee{" "}
                            <span
                              style={{
                                display: "inline-block",
                                textAlign: "center",
                                border: "2px solid blue",
                                borderRadius: "50%",
                                width: "0.9em",
                                height: "0.9em",
                                lineHeight: "1em",
                                margin: 0,
                                color: "#FFFFFF",
                                backgroundColor: "blue",
                              }}
                            >
                              i
                            </span>{" "}
                          </span>
                        </div>
                        <div style={{ marginTop: "12px" }}>
                          <span style={{ fontSize: "12px" }}>
                            Scan this QR code using your wallet and transfer the
                            above amount
                          </span>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <span
                            style={{
                              height: "270px",
                              width: "196px",
                              justifyContent: "center",
                            }}
                          >
                            <QrCode />
                          </span>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <span style={{ fontSize: "12px" }}>
                            Only send {coinName && coinName.toUpperCase()} using
                            the{" "}
                            {selectedCoinData?.asset_network &&
                              formatTitleCase(
                                selectedCoinData?.asset_network
                              )}{" "}
                            network, else the funds may get lost
                          </span>
                        </div>
                      </Container>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "50px",
                      fontSize: "12px",
                      fontWeight: 500,
                      fontFamily: "Inter",
                      lineHeight: "14.52px",
                      marginBottom: "5px",
                      padding: "0px 5px",
                      color: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <span>
                      Click the below button once you have triggered the
                      transaction
                    </span>
                  </div>
                  <div>
                    <Button
                      className="continue"
                      variant="contained"
                      onClick={onIhavePaid}
                      disabled={!userName || !re.test(userName)}
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
                </section>
                <div className={matches ? "footer" : "footerSmall"}>
                  <Footer />
                </div>
              </div>
            )}
          </section>
          <CancelPayment open={openCloseDialog} setOpen={setOpenCloseDialog} />
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
