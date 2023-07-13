import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
import formatTitleCase from "../../utils/formatTitleCase";

const validate =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function DepositPage(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const order_id = searchParams.get("order_id");
  const hash = searchParams.get("hash");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
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
        localStorage.setItem("merchantUrl", decodedToken.merchant_redirect_url);
        localStorage.setItem("merchantName", decodedToken.merchant_brand_name);
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
                    onClick={() => setOpenCloseDialog(true)}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {orderDetails.merchant_brand_name &&
                      orderDetails.merchant_brand_name}
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
                  <div className="pay">Pay</div>
                  <div className="order_currency">
                    {orderDetails?.order_currency &&
                      orderDetails?.order_currency.toUpperCase()}
                    &nbsp;
                    {orderDetails?.order_amount &&
                      formatCryptoAmount(
                        orderDetails?.order_currency.toUpperCase(),
                        orderDetails?.order_amount
                      )}
                  </div>
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
                    {orderDetails.merchant_brand_name &&
                      formatTitleCase(orderDetails.merchant_brand_name)}
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
                  <div style={{ marginBottom: 20 }}>
                    <div className="agree">
                      By clicking “Continue”, I agree to Nivapay’s
                      <a
                        href="https://nivapay.com/privacy-policy/"
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms{" "}
                      </a>
                      <br />
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
                    </div>
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
                </section>
                <div className={matches ? "footer" : "footerSmall"}>
                  <Footer />
                </div>
              </div>
            )}
          </section>
          <CancelPayment open={openCloseDialog} setOpen={setOpenCloseDialog} />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default DepositPage;
