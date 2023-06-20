import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
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
import "./QrScanPage.css";
import ScanCopyTab from "./ScanCopyTab";
import { isAnyArrayBuffer } from "util/types";
import copy from "copy-to-clipboard";
import axios from "axios";
import { BASE_URL } from "../../config";
import Loader from "../../utils/Loader";
import formatCryptoAmount from "../../utils/formatCryptoAmount";

function QrCopy(props: any) {
  const context = useGlobalContext();
  const [userName, setUserName] = useState("laxmi@gmail.com");
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [openNetworkDialog, setOpenNetworkDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let coinName = context.state.selectedCoin;
  const orders = context.state.orderDetails;
  const qrData = context.state.qrData;
  const token = context.state.token;

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



  const onIhavePaid = async () => {
    setLoading(true);
    const now = Date.now(); 
    console.log(now);
    const payload = {
      user_event: "i have paid",
      "timestamp":now
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
        navigate("/detecting",{replace: true});
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!orders) {
      navigate("/error",{ replace: true });    }
  }, []);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

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
                  <Container maxWidth="lg">
                    <Typography
                      style={{
                        fontStyle: "normal",
                        fontWeight: "500",
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
                      {props.fixedTime}
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
                              { coinName.toUpperCase()}
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
                              onClick={() => setOpenNetworkDialog(true)}
                              style={{ fontSize: "12px" }}
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
                            <span style={{ fontSize: "12px", fontWeight: 400 }}>
                              Copy-paste below details to your wallet and
                              complete the payment
                            </span>
                          </div>
                          <div style={{ marginTop: "35px" }}>
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: 400,
                                display: "flex",
                                marginLeft: "10px",
                              }}
                            >
                              Send to this address
                            </div>
                            <Box sx={{ minWidth: 120, display: "flex" }}>
                              <FormControl
                                sx={{ m: 1, borderRadius: "4px", width: "95%" }}
                              >
                                <TextField
                                  value={qrData?.wallet_address}
                                  disabled
                                  InputProps={{
                                    sx: {
                                      color: "#2C1E66",
                                      height: 35,
                                    },
                                    endAdornment: (
                                      <div style={{}}>
                                        <InputAdornment position="end">
                                          <Button
                                            style={{
                                              padding: "9px",
                                              marginRight: "-14px",
                                              minWidth: "0px",
                                              color: "#808080",
                                              boxSizing: "border-box",
                                              backgroundColor: "#D6D6D6",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              copy(qrData?.wallet_address)
                                            }
                                          >
                                            <img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg" />
                                          </Button>
                                        </InputAdornment>
                                      </div>
                                    ),
                                    disableUnderline: true,
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </div>

                          <div style={{ marginTop: "5px" }}>
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: 400,
                                display: "flex",
                                marginLeft: "10px",
                              }}
                            >
                              Amount (excludes network fee)
                            </div>
                            <Box sx={{ minWidth: 120, display: "flex" }}>
                              <FormControl
                                sx={{ m: 1, borderRadius: "4px", width: "95%" }}
                              >
                                <TextField
                                  value={qrData?.asset_amount}
                                  disabled
                                  InputProps={{
                                    sx: {
                                      color: "#2C1E66",
                                      height: 35,
                                    },
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Button
                                          style={{
                                            padding: "9px",
                                            marginRight: "-14px",
                                            minWidth: "0px",
                                            backgroundColor: "#D6D6D6",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            copy(qrData?.asset_amount)
                                          }
                                        >
                                          <img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg" />
                                        </Button>
                                      </InputAdornment>
                                    ),
                                    disableUnderline: true,
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </div>

                          <div style={{ marginTop: "32px" }}>
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
                        //   disabled={!userName || !re.test(userName)}
                      >
                        I have Paid
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

export default QrCopy;
