import React, { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./Wallet.css";
import { getMetamaskPaymentDetails } from "../../services/depositServices";
import CancelPayment from "../../dialogs/CancelPayment";
import Loader from "../../utils/Loader";

function Wallet(props: any) {
  const context = useGlobalContext();
  const theme = useTheme();
  const containerRef = React.useRef(null);
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const [isLoading, setLoading] = useState(true);
  const orders = context.state.orderDetails;
  const coinData = context.state.selectedCoinData;
  const hash = context.state.hash;

  const token = context.state.token;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const navigate = useNavigate();

  let network: string;
  let crypto: string;
  let amount: number;

  const handleMetamask = () => {
    navigate("/metamask_scan", { replace: true });
  };

  const handleOtherWallets = () => {
    context.dispatch({
      type: "UPDATE_PREVIOUS_PATH",
      payload: '/wallet',
    });
    navigate("/QrMounting", { replace: true });
  };

  const fetchMetamaskPaymentDetails = async () => {
    if (orders?.order_currency_type === "virtual") {
      network = orders?.order_currency_network;
      crypto = orders?.order_currency_symbol;
      amount = Number(orders?.order_amount);
    }
    if (orders?.order_currency_type === "fiat") {
      network = coinData?.asset_network;
      crypto = coinData?.asset_symbol;
      amount = Number(coinData?.asset_amount);
    }

    const res: any = await getMetamaskPaymentDetails(
      network,
      crypto,
      amount,
      token
    );
    if (res?.status === 200) {
      context.dispatch({
        type: "GET_QR_DATA",
        payload: res?.data,
      });
      setLoading(false);
    } else {
      navigate("/error", { replace: true });
    }
  };

  const handleBack = () => {
    if (orders?.order_currency_type === "virtual") {
      navigate(`/deposit/order?order_id=${orders?.order_id}&hash=${hash}`, {
        replace: true,
      });
    }
    if (orders?.order_currency_type === "fiat") {
      navigate("/quickpay", { replace: true });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchMetamaskPaymentDetails();
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (openCloseDialog) {
      window.onbeforeunload = null;
      return;
    }
    window.onbeforeunload = function () {
      const msg = "Are you sure you want to leave?";
      return msg;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [openCloseDialog]);

  return (
    <Layout>
      <MobileContainer>
        <div className="main_section" ref={containerRef}>
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
                      // mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
                    }}
                    onClick={handleBack}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {" "}
                    {orders.merchant_brand_name && orders.merchant_brand_name}
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
                <p className="timer">
                  Time left:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {props.fixedTime} mins
                  </span>
                </p>
                <div
                  className="choosecurrency"
                  style={{ fontSize: 20, marginBottom: "18%" }}
                >
                  Select Wallet
                </div>

                <div className="metaMaskDiv" onClick={handleMetamask}>
                  <span className="metamaskImage">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                      alt="metamask logo"
                    />
                  </span>
                  <span style={{ fontSize: "20px" }}>MetaMask</span>
                  <span>
                    <ChevronRightIcon style={{ fontSize: "40px" }} />
                  </span>
                </div>
                <div className="metaMaskDiv" onClick={handleOtherWallets}>
                  <span>
                    <img
                      src="https://res.cloudinary.com/dolpotacg/image/upload/v1683539144/bitcoin-wallet_1_2_s3dfsh.svg"
                      alt="metamask logo"
                    />
                  </span>
                  <span style={{ fontSize: "20px", color: "#000000" }}>
                    Other&nbsp;Wallets
                  </span>
                  <span>
                    <ChevronRightIcon style={{ fontSize: "40px" }} />
                  </span>
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
                      className="continue"
                      variant="contained"
                      fullWidth
                      disabled
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
            </div>
              )}
          </section>
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={props?.fixedTime}
            containerRef={containerRef}
          />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Wallet;
