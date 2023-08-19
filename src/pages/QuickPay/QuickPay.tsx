import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import StandardImageList from "../ImageList/ImageList";
import CancelPayment from "../../dialogs/CancelPayment";
import "./QuickPay.css";
import Loader from "../../utils/Loader";
import PerfectScrollbar from "react-perfect-scrollbar";

function QuickPay(props: any) {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const coinName = context.state.selectedCoin?.toUpperCase();
  const orders = context.state.orderDetails;

  const onContinue = () => {
    if (coinName === "ETH" || coinName === "USDC" || coinName === "USDT") {
      navigate("/wallet", { replace: true });
    } else {
      navigate("/QrMounting", { replace: true });
    }
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
                      // mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
                    }}
                    onClick={() =>
                      navigate(
                        `/deposit/order?order_id=${orders?.order_id}&hash=${orders?.hash}`,
                        { replace: true }
                      )
                    }
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
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <p className="timer">
                    Time left:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {props.fixedTime} mins
                    </span>
                  </p>{" "}
                  <div
                    style={{ boxSizing: "border-box", position: "relative" }}
                  >
                    <div className="choosecurrency">
                      Select Currency to Pay With
                    </div>
                    <PerfectScrollbar>
                      <div>
                        <StandardImageList />
                      </div>
                    </PerfectScrollbar>
                  </div>
                  <div className="footer">
                    <div
                      style={{
                        marginBottom: "35px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        className="continue"
                        fullWidth
                        onClick={onContinue}
                        disabled={!coinName}
                      >
                        Continue
                      </Button>
                      <Button
                        fullWidth
                        className="cancelbtn"
                        onClick={() => setOpenCloseDialog(true)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <Footer />
                  </div>
                </section>
              </div>
            )}
          </section>
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={props?.fixedTime}
          />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default QuickPay;
