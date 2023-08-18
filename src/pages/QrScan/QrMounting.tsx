import { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { Layout, MobileContainer } from "../../styles/layout";
import Loader from "../../utils/Loader";
import { getCryptoPaymentDetails } from "../../services/depositServices";

function QrMounting() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const context = useGlobalContext();
  const coinData = context.state.selectedCoinData;
  const token = context.state.token;

  const fetchCryptoPayment = async () => {
    const network: string = coinData?.asset_network;
    const crypto: string = coinData?.asset_symbol;
    const amount: number = Number(coinData?.asset_amount);
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
                    disabled
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title"></div>
                </div>
                <div className="logo" onClick={()=> window.open("https://nivapay.com/")}>
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <Loader />
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default QrMounting;
