import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
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
  const cyyptoData = context.state.allCryptos;

  const onContinue = () => {
    console.log(coinName, "coinName");
    if (coinName === "ETH" || coinName === "USDC" || coinName === "USDT") {
      navigate("/wallet", { replace: true });
    } else {
      navigate("/QrScanPage", { replace: true });
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
                      {orders?.merchant_brand_name &&
                        orders?.merchant_brand_name}
                    </Typography>
                  </div>
                  <div style={{ width: "30px", height: "30px" }}>
                    <NivapayLogo1 />
                  </div>
                </Toolbar>
              </AppBar>
              <PerfectScrollbar>
                <div style={{ flex: 1, height: "auto" }}>
                  <section className="nivapay_ramp">
                    <p className="timer">Time left: {props.fixedTime} mins</p>
                    <div
                      style={{ boxSizing: "border-box", position: "relative" }}
                    >
                      <div className="choosecurrency">
                        Select Currency to Withdraw
                      </div>
                      <div>
                        <StandardImageList cyyptoData={cyyptoData} />
                      </div>
                    </div>
                  </section>
                </div>
              </PerfectScrollbar>
              <div className="footer">
                <div style={{ marginBottom: "20px" }}>
                  <Button
                    variant="contained"
                    className="continue"
                    fullWidth
                    onClick={onContinue}
                    disabled={!context.state.selectedCoin}
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

export default QuickPay;
