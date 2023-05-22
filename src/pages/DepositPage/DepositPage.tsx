import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import BackButton from "../../dialogs/BackButton";
import CancelPayment from "../../dialogs/CancelPayment";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./DepositPage.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "../../utils/Loader";
import { BASE_URL } from "../../config";
import formatCryptoAmount from '../../utils/formatCryptoAmount'

const validate =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function DepositPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const order_id = searchParams.get("order_id");
  const hash = searchParams.get("hash");
  const gayeway_url = searchParams.get("gayeway_url");
  const context = useGlobalContext();
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: any }>({});
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(false);

  // const onContinue = () => {
  //   navigate("/quickpay");
  // };

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

  const fetchOrderDetails = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/order/${order_id}`, {
        headers: {
          hash: hash,
        },
      })
      .then((res) => {
        const decodedToken: any = jwt_decode(res?.data?.token);
        setToken(res?.data?.token);
        setOrderDetails(decodedToken);
        context.dispatch({
          type: "ORDER_DETAILS",
          payload: decodedToken,
        });
        context.dispatch({
          type: "ORDER_ID",
          payload: order_id,
        });
        context.dispatch({
          type: "TOKEN",
          payload: res?.data?.token,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchCryptoList = async () => {
    // setLoading(true);
    await axios
      .get(`${BASE_URL}/order/${order_id}/crypto`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        context.dispatch({
          type: "ALL_CRYPTO",
          payload: res?.data,
        });
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  };

  const proceedOrder = async () => {
    setLoading(true);
    const payload = {
      order_user_email_id: userEmail,
    };
    await axios
      .post(`${BASE_URL}/order/${order_id}/email`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        navigate("/quickpay");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    setUserEmail(orderDetails?.user_email_id);
  }, [orderDetails]);

  useEffect(() => {
    if (token) {
      fetchCryptoList();
      const interval = setInterval(() => fetchCryptoList(), 120000);
      // return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <Layout>
      <MobileContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          >
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                height: "96vh",
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
                      onClick={() => setOpenCloseDialog(true)}
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
                      {orderDetails && orderDetails.merchant_brand_name}
                    </Typography>
                  </div>
                  <div style={{ width: "30px", height: "30px" }}>
                    <NivapayLogo1 />
                  </div>
                </Toolbar>
              </AppBar>
              <div style={{ flex: 1, height: "auto", overflowY: "auto" }}>
                <section className="nivapay_ramp">
                  <Typography
                    style={{
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "30px",
                      textAlign: "center",
                      letterSpacing: "0.06em",
                      color: "#000000",
                      fontFamily: "Inter",
                      padding: "10px",
                    }}
                  >
                    {/* Time left 15:00 mins */}
                    Time left:{" "}
                    <Countdown
                      date={Date.now() + 900000}
                      renderer={renderer}
                    />{" "}
                    mins
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "32px",
                      display: "flex",
                      justifyContent: "center",
                      color: "#2C1E66",
                      gap: "8px",
                    }}
                  >
                    User id:
                    <Typography
                      style={{
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: "32px",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#2C1E66",
                      }}
                    >
                      {orderDetails && orderDetails?.user_id}
                    </Typography>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "32px",
                      display: "flex",
                      color: "#2C1E66",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    Pay
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "24px",
                      lineHeight: "29px",
                      display: "flex",
                      color: "#2C1E66",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    {orderDetails?.order_fiat_symbol &&
                      orderDetails?.order_fiat_symbol}{" "}
                    &nbsp;
                    {orderDetails?.order_fiat_amount &&
                      formatCryptoAmount(orderDetails?.order_fiat_symbol,orderDetails?.order_fiat_amount)}
                      {/* orderDetails?.order_fiat_amount?.toFixed(2)} */}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "32px",
                      display: "flex",
                      color: "#2C1E66",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    worth of crypto to
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "32px",
                      display: "flex",
                      justifyContent: "center",
                      color: "#2C1E66",
                    }}
                  >
                    {orderDetails && orderDetails.merchant_brand_name}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      paddingTop: "3rem",
                      fontSize: "16px",
                      lineHeight: "19px",
                      display: "flex",
                      letterSpacing: "0.06em",
                      color: "#21146B",
                    }}
                  >
                    <Typography>
                      Email Address*
                      <input
                        className="input-wrap"
                        name="userEmail"
                        style={{ fontSize: "16px" }}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                        value={userEmail}
                      />
                    </Typography>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "15px",
                      letterSpacing: "0.06em",
                      color: "#21146B",
                      paddingTop: "0.5rem",
                    }}
                  >
                    Transaction status updates will be sent to this email
                    address
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "15px",
                      display: "flex",
                      alignItems: "center",
                      letterSpacing: "0.06em",
                      color: "rgba(0, 0, 0, 0.5)",
                      padding: "0.5rem",
                      marginTop: "3.5rem",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                    component="div"
                  >
                    By clicking “Continue”, I agree to Nivapay’s{" "}
                    <a
                      href="www.goodle.com"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="www.goodle.com"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                    >
                      Privacy Policy.
                    </a>
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      className="continue"
                      variant="contained"
                      fullWidth
                      onClick={proceedOrder}
                      disabled={!userEmail || !validate.test(userEmail)}
                    >
                      Continue
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
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

export default DepositPage;
