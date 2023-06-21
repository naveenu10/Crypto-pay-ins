import { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import BackButton from "../../dialogs/BackButton";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./Wallet.css";

function Wallet(props: any) {
  const context = useGlobalContext();
  const orders = context.state.orderDetails;
  const [userName, setUserName] = useState("laxmi@gmail.com");
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();
  const onOtherWallets = () => {
    navigate("/QrScanPage");
  };

  const onContinue = () => {
    navigate("/QrScanPage");
  };
  const handleMetamask = () => {
    navigate("/metamask",{replace: true});
  };

  const handleOtherWallets = () => {
    navigate("/QrScanPage",{replace: true});
  };

  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  useEffect(() => {
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  return (
    <Layout>
      <MobileContainer>
        <div style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
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
                    onClick={() => navigate(-1)}
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
                    Cryptogames
                  </Typography>
                </div>
                <div style={{ width: "30px", height: "30px" }}>
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <div style={{ flex: 1, height: "50vh", overflowY: "auto" }}>
              <section className="nivapay_ramp">
                <Typography
                  style={{
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "14px",
                    lineHeight: "17px",
                    textAlign: "center",
                    letterSpacing: "0.06em",
                    color: "#000000",
                    fontFamily: "Inter",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Time left: {props.fixedTime}
                  mins
                </Typography>

                <div className="choosecurrency" style={{ fontSize: 20 }}>
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "260px",
                  }}
                >
                  <Button
                    className="continue"
                    variant="contained"
                    onClick={onContinue}
                    disabled={!userName || !re.test(userName)}
                  >
                    Continue
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    className="cancelbtn"
                    onClick={() => setOpenCloseDialog(true)}
                  >
                    Cancel
                  </Button>
                </div>
                <BackButton
                  open={openCloseDialog}
                  setOpen={setOpenCloseDialog}
                />
              </section>
            </div>
          </section>
          <div style={{ justifyContent: "flex-end" }}>
            <Footer />
          </div>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Wallet;
