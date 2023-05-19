import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import BackButton from "../../dialogs/BackButton";
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

function QrScanPage() {
  const context = useGlobalContext();
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

  const Completionist = () => <span>You are good to go!</span>;
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

  // const date = new Date(Date.now() + 900000);
  // const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  // const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  // console.log(`${minutes}:${seconds}`);
  // const getDate = (`${minutes}:${seconds}`)
  // const timestamp = Date.now() + 900000; // Add 900000 ms to the current timestamp to get a timestamp 15 minutes in the future
  // const date = new Date(timestamp);
  // const options = { hour12: false, hour: 'numeric', minute: 'numeric' };
  // const localTime = date.toLocaleTimeString('en-US', options);

  // console.log(localTime);

  // useEffect(() => {
  //     context.dispatch({
  //         type: 'IS_TIMER',
  //         payload: getDate
  //     })
  // }, [date])

  const onIhavePaid = async () => {
    setLoading(true);
    const payload = {
      user_event: "string",
    };
    await axios
      .post(`${BASE_URL}/transaction/events/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        navigate("/detecting");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getQrCode = async () => {
    setLoading(true);
    await axios
      .get(
        `${BASE_URL}/address/${selectedCoinData?.asset_network}/${selectedCoinData?.asset_symbol}`,
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
        setLoading(false);
      });
  };

  useEffect(() => {
    getQrCode();
  }, []);

  useEffect(() => {
    if(!orders){
     navigate("/failure");
    }
   }, [])

  return (
    <Layout>
      <MobileContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="appBar">
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
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
                      sx={{
                        mr: 2,
                        border: "1px solid",
                        borderRadius: "20%",
                        padding: "5px",
                        marginLeft: "-8px",
                      }}
                      onClick={() => navigate("/quickpay")}
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
                      {" "}
                      {orders?.merchant_brand_name &&
                        orders?.merchant_brand_name}
                    </Typography>
                  </div>
                  <div style={{ width: "30px", height: "30px" }}>
                    <NivapayLogo1 />
                  </div>
                </Toolbar>
              </AppBar>
              <div style={{ flex: 1, height: "50vh" }}>
                <section className="nivapay_ramp">
                  <Container>
                    <Typography
                      style={{
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "30px",
                        textAlign: "center",
                        letterSpacing: "0.06em",
                        color: "#000000",
                        fontFamily: "Inter",
                      }}
                    >
                      {/* Time left 15:00 mins */}
                      Time Left:{" "}
                      <Countdown
                        date={Date.now() + 900000}
                        renderer={renderer}
                      />{" "}
                      mins
                    </Typography>
                    <div className="choosecurrency">Complete Payment</div>
                    <div>
                      <div
                        style={{
                          marginTop: "20px",
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
                              {(qrData?.asset_amount && qrData?.asset_amount) ||
                                0}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                marginLeft: "4px",
                                fontWeight: "bold",
                              }}
                            >
                              {coinName}
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
                              Scan this QR code using your wallet and transfer
                              the above amount
                            </span>
                          </div>
                          <div style={{ marginTop: "35px" }}>
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
                          <div style={{ marginTop: "35px" }}>
                            <span style={{ fontSize: "12px" }}>
                              Only send ETH using the Ethereum network, else the
                              funds may get lost
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
                        //   marginLeft: "20px",
                        padding: "0px 9px",
                      }}
                    >
                      <span>
                        Click the below button once you have triggered the
                        transaction
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Button
                        className="continue"
                        variant="contained"
                        onClick={onIhavePaid}
                        disabled={!userName || !re.test(userName)}
                      >
                        I have Paid{" "}
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        className="cancelbtn"
                        fullWidth
                        onClick={() => setOpenCloseDialog(true)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <CancelPayment
                      open={openCloseDialog}
                      setOpen={setOpenCloseDialog}
                    />
                    <NetWorkFee
                      openNetWorkfee={openNetworkDialog}
                      setOpenNetworkfee={setOpenNetworkDialog}
                    />
                  </Container>
                </section>
              </div>
            </section>
            <div style={{ justifyContent: "flex-end" }}>
              <Footer />
            </div>
          </div>
        )}
      </MobileContainer>
    </Layout>
  );
}

export default QrScanPage;
