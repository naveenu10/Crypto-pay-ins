import { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Loader from "../../utils/Loader";
import { getCryptoPaymentDetails } from "../../services/depositServices";

function QrMounting() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const context = useGlobalContext();
  const coinData = context.state.selectedCoinData;
  const token = context.state.token;
  const orderDetails = context.state.orderDetails;

  let network: string;
  let crypto: string;
  let amount: number;

  const fetchCryptoPayment = async () => {
    if (orderDetails?.order_currency_type === "virtual") {
      network = orderDetails?.order_currency_network;
      crypto = orderDetails?.order_currency_symbol;
      amount = Number(orderDetails?.order_amount);
    }
    if (orderDetails?.order_currency_type === "fiat") {
      network = coinData?.asset_network;
      crypto = coinData?.asset_symbol;
      amount = Number(coinData?.asset_amount);
    }

    const res: any = await getCryptoPaymentDetails(
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
      navigate("/QrScan", { replace: true });
    } else {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    if (token) {
      fetchCryptoPayment();
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, [token]);

  return (
    <div className="main_section">
      <section className="sub-section">
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
                disabled
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="header_title"></div>
            </div>
            <div className="logo">
              <NivapayLogo1 />
            </div>
          </Toolbar>
        </AppBar>
        <Loader />
      </section>
    </div>
  );
}

export default QrMounting;
