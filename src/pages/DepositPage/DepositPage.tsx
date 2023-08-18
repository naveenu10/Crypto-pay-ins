import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./DepositPage.css";
import Loader from "../../utils/Loader";
import formatTitleCase from "../../utils/formatTitleCase";
import { sendEmail } from "../../services/depositServices";

const validate =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function DepositPage(props: any) {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const token = context.state.token;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const orderDetails = context.state.orderDetails;
  const email = context.state.email;
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setLoading] = useState(true);

  const proceedOrder = async () => {
    setLoading(true);

    const payload = {
      order_user_email_id: userEmail,
    };
    const res: any = await sendEmail(payload, token);
    if (res?.status === 201) {
      navigate("/quickpay", { replace: true });
    } else {
      console.log(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserEmail(orderDetails?.user_email_id);
    if (orderDetails) {
      setLoading(false);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

  useEffect(() => {
    if (!context.state.token) {
      navigate("/error", { replace: true });
    }
  }, []);

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
                <div className="logo" onClick={()=> window.open("https://nivapay.com/")}>
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <p className="timer">Time left: {props.fixedTime} mins</p>
                  <div className="pay" style={{ marginTop: 30 }}>
                    Pay
                  </div>
                  <div className="order_currency">
                    {orderDetails?.order_currency_symbol &&
                      orderDetails?.order_currency_symbol?.toUpperCase()}
                    &nbsp;
                    {orderDetails?.order_amount && orderDetails?.order_amount}
                  </div>
                  <div className="pay">worth of crypto to</div>
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
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      marginTop: "5rem",
                      fontSize: "16px",
                      lineHeight: "19px",
                      letterSpacing: "0.06em",
                      color: "#21146B",
                      paddingLeft: "5px",
                    }}
                  >
                    Email Address*
                  </div>
                  <input
                    className="input-wrap"
                    name="userEmail"
                    style={
                      !validate.test(userEmail)
                        ? { fontSize: "16px", border: "1px solid #f44336" }
                        : { fontSize: "16px" }
                    }
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                      context.dispatch({
                        type: "UPDATE_EMAIL",
                        payload: e.target.value,
                      });
                    }}
                    value={email}
                  />
                  {!validate.test(userEmail) && (
                    <div
                      style={{
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 400,
                        marginTop: "5px",
                        fontSize: "12px",
                        lineHeight: "19px",
                        letterSpacing: "0.06em",
                        color: "#f44336",
                        paddingLeft: "5px",
                      }}
                    >
                      Invalid email address
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "15px",
                      letterSpacing: "0.06em",
                      color: "#21146B",
                      marginTop: "1rem",
                      paddingLeft: "5px",
                    }}
                  >
                    Transaction status updates will be sent to this email
                    address
                  </div>
                </section>
                <div className="footer">
                  <div style={{ marginBottom: 30, width: 325 }}>
                    <div className="agree">
                      By clicking “Continue”, I agree to Nivapay’s
                      <a
                        href="https://nivapay.com/terms-of-service/"
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms{" "}
                      </a>
                      <br />
                      <a
                        href="https://nivapay.com/terms-of-service/"
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        of Service
                      </a>{" "}
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
                  <Footer />
                </div>
              </div>
            )}
          </section>
          <CancelPayment open={openCloseDialog} setOpen={setOpenCloseDialog} left_time={props?.fixedTime}/>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default DepositPage;
