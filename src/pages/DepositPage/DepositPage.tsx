import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./DepositPage.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "../../utils/Loader";
import { BASE_URL } from "../../config";
import formatCryptoAmount from "../../utils/formatCryptoAmount";

const validate =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function DepositPage(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const order_id = searchParams.get("order_id");
  const hash = searchParams.get("hash");
  const context = useGlobalContext();
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: any }>({});
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/sdk/deposit/order/${order_id}`, {
        headers: {
          hash: hash,
        },
      })
      .then((res) => {
        const decodedToken: any = jwt_decode(res?.data?.token);
        setToken(res?.data?.token);
        console.log(decodedToken)
        localStorage.setItem('merchantUrl',decodedToken.merchant_redirect_url )
        localStorage.setItem('merchantName',decodedToken.merchant_brand_name )
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
        navigate("/error", { replace: true });
        setLoading(false);
      });
  };

  const fetchCryptoList = async () => {
    await axios
      .get(`${BASE_URL}/sdk/deposit/order/${order_id}/crypto`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        context.dispatch({
          type: "ALL_CRYPTO",
          payload: res?.data,
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/error", { replace: true });
      });
  };

  const proceedOrder = async () => {
    setLoading(true);
    const payload = {
      order_user_email_id: userEmail,
    };
    await axios
      .post(`${BASE_URL}/sdk/deposit/order/email`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/quickpay", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      setLoading(false);
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
      const interval = setInterval(() => fetchCryptoList(), 1200000);
      return () => clearInterval(interval);
    }
  }, [token]);

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
          <div
            style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          >
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
                      {orderDetails.merchant_brand_name &&
                        orderDetails.merchant_brand_name}
                    </Typography>
                  </div>
                  <div style={{ width: "30px", height: "30px" }}>
                    <NivapayLogo1 />
                  </div>
                </Toolbar>
              </AppBar>
              <div style={{ flex: 1 }}>
                <section className="nivapay_ramp">
                  <p className="timer">Time left: {props.fixedTime} mins</p>
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
                    {orderDetails?.order_currency &&
                      orderDetails?.order_currency.toUpperCase()}
                    &nbsp;
                    {orderDetails?.order_amount &&
                      formatCryptoAmount(
                        orderDetails?.order_currency.toUpperCase(),
                        orderDetails?.order_amount
                      )}
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
                    {orderDetails.merchant_name && orderDetails.merchant_name}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      marginTop: "3rem",
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
                      marginTop: "1rem",
                    }}
                  >
                    Transaction status updates will be sent to this email
                    address
                  </Typography>
                </section>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  marginLeft: "1.7rem",
                  marginRight: "1.7rem",
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "15px",
                      display: "flex",
                      alignItems: "center",
                      letterSpacing: "0.06em",
                      color: "rgba(0, 0, 0, 0.5)",
                      marginBottom: "0.5rem",
                      marginTop: "3.5rem",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                    component="div"
                  >
                    By clicking “Continue”, I agree to Nivapay’s Terms{" "}
                    <a
                      href="https://nivapay.com/privacy-policy/"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://nivapay.com/privacy-policy/"
                      style={{ color: "rgba(0, 0, 0, 0.5)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy.
                    </a>
                  </Typography>
                  <Button
                    className="continue"
                    variant="contained"
                    fullWidth
                    onClick={proceedOrder}
                    disabled={!userEmail || !validate.test(userEmail)}
                  >
                    Continue
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
            </section>
            <CancelPayment
              open={openCloseDialog}
              setOpen={setOpenCloseDialog}
            />
          </div>
        )}
      </MobileContainer>
    </Layout>
  );
}

export default DepositPage;
