import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate } from "react-router-dom";
import FailureLogo from "../../assets/images/NIcons/FailureLogo";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";

function Error() {
  const navigate = useNavigate();
  function backtoCrypto() {
    navigate("/timeout");
  }
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
            {/* <AppBar
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
                    disabled
                    sx={{
                      mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "-8px",
                    }}
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
            </AppBar> */}
            <div style={{ flex: 1, height: "50vh", overflowY: "auto",marginTop:'50%' }}>
              <section className="nivapay_ramp">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "8%",
                  }}
                >
                  <ErrorOutlineIcon color="error" style={{fontSize:80}}/>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "4%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "29px",
                      padding: "1rem",
                      display: "flex",
                      color: "#2C1E66",
                      justifyContent: "center",
                    }}
                  >
                    Oops!
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "11px",
                      lineHeight: "15px",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      color: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Something went wrong. Please try again later.
                  </Typography>
                </div>

                {/* <div style={{ marginTop: "30%" }}>
                  <Divider />
                </div>

                <div style={{ marginTop: "2%" }}>
                  <Divider />
                </div> */}
                {/* <Typography
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "17px",
                    textAlign: "center",
                    letterSpacing: "0.06em",
                    color: "#21146B",
                    marginTop: "20%",
                  }}
                >
               
                  Redirecting in{" "}
                  <span style={{ color: "#279FFE" }}>
                    <Countdown date={Date.now() + 30000} renderer={renderer} />
                  </span>{" "}
                  <span>secs...</span>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "4%",
                  }}
                >
                  <Button
                    variant="contained"
                    className="cryptobtn"
                    onClick={backtoCrypto}
                  >
                    {" "}
                    Back to Cryptogames{" "}
                  </Button>
                </div> */}
              </section>
            </div>
            <div style={{ justifyContent: "flex-end" }}>
              <Footer />
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Error;
