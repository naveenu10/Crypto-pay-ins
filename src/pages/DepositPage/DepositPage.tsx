import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
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
  const containerRef = React.useRef(null);
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
    window.scrollTo(0, 0);
    if (!context.state.token) {
      navigate("/error", { replace: true });
    }
  }, []);

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
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
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
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <p className="timer">
                    Time left:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {props.fixedTime} mins
                    </span>
                  </p>
                  <div className="pay" style={{ marginTop: 40 }}>
                    Pay
                  </div>
                  <div className="order_currency">
                    {orderDetails?.order_currency_symbol &&
                      orderDetails?.order_currency_symbol?.toUpperCase()}
                    &nbsp;
                    {orderDetails?.order_amount && orderDetails?.order_amount}
                  </div>
                  <div className="pay">worth of crypto to</div>
                  <div className="brand-name">
                    {orderDetails.merchant_brand_name &&
                      formatTitleCase(orderDetails.merchant_brand_name)}
                  </div>
                  <div className="email">Email Address*</div>
                  <input
                    className="input-wrap"
                    name="userEmail"
                    style={
                      !validate.test(userEmail)
                        ? { border: "1px solid #f44336" }
                        : { border: "1px solid rgba(0, 0, 0, 0.5)" }
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
                    <div className="invalid-email">Invalid email address</div>
                  )}
                  <div className="email-info">
                    Transaction status updates will be sent to this email
                    address
                  </div>
                </section>
                <div className="footer">
                  <div
                    style={{
                      marginBottom: "35px",
                      width: "325px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
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
                      className="cancelbtn1"
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
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            containerRef={containerRef}
            left_time={props?.fixedTime}
          />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default DepositPage;
