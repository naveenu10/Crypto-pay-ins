import { useEffect } from "react";
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
import BackButton from "../../dialogs/BackButton";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./Wallet.css";

function Wallet(props: any) {
  const context = useGlobalContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const orders = context.state.orderDetails;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const navigate = useNavigate();
  const onOtherWallets = () => {
    navigate("/QrScan");
  };

  const onContinue = () => {
    navigate("/QrScan");
  };
  const handleMetamask = () => {
    navigate("/metamask", { replace: true });
  };

  const handleOtherWallets = () => {
    navigate("/QrScan", { replace: true });
  };

  useEffect(() => {
    if (!orders) {
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
                    onClick={() => navigate("/quickpay", { replace: true })}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {" "}
                    {orders.merchant_brand_name &&
                      orders.merchant_brand_name}
                  </div>
                </div>
                <div className="logo">
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <div style={{ flex: 1 }}>
              <section className="nivapay_ramp">
                <p className="timer">Time left: {props.fixedTime} mins</p>

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
                  <span onClick={onOtherWallets}>
                    <ChevronRightIcon style={{ fontSize: "40px" }} />
                  </span>
                </div>
                <div style={{ marginTop: "40%" }}>
                  <Button
                    className="continue"
                    variant="contained"
                    fullWidth
                    onClick={onContinue}
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
            </div>
            <div className={matches ? "footer" : "footerSmall"}>
              <Footer />
            </div>
          </section>
          <BackButton open={openCloseDialog} setOpen={setOpenCloseDialog} />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Wallet;
