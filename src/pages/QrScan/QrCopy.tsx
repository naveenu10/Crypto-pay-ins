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
import "./QrScanPage.css";
import ScanCopyTab from "./ScanCopyTab";
import copy from "copy-to-clipboard";
import axios from "axios";
import { BASE_URL } from "../../config";
import Loader from "../../utils/Loader";
import formatCryptoAmount from "../../utils/formatCryptoAmount";
import formatTitleCase from "../../utils/formatTitleCase";

function QrCopy(props: any) {
  const context = useGlobalContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [openNetworkDialog, setOpenNetworkDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const coinName = context.state.selectedCoin;
  const orders = context.state.orderDetails;
  const qrData = context.state.qrData;
  const token = context.state.token;
  const selectedCoinData = context.state.selectedCoinData;
  const navigate = useNavigate();

  const onIhavePaid = async () => {
    setLoading(true);
    const now = Date.now();
    console.log(now);
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
                            {coinName.toUpperCase()}
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
                            Copy-paste below details to your wallet and complete
                            the payment
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
                  <div>
                    <div
                      style={{
                        marginTop: "50px",
                        fontSize: "12px",
                        fontWeight: 500,
                        fontFamily: "Inter",
                        lineHeight: "14.52px",
                        marginBottom: "5px",
                        color: "rgba(0, 0, 0, 0.5)",
                        padding: "0px 5px",
                      }}
                    >
                      <span>
                        Click the below button once you have triggered the
                        transaction
                      </span>
                    </div>
                    <Button
                      className="continue"
                      variant="contained"
                      fullWidth
                      // onClick={onIhavePaid}
                      onClick={()=> navigate("/detecting", { replace: true })}
                      
                    >
                      I have Paid
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

export default QrCopy;
