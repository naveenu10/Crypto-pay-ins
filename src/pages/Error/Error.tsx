import { AppBar, IconButton, useMediaQuery, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import formatTitleCase from "../../utils/formatTitleCase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";

const Signs = require("../../assets/images/Signs.png");

function Error() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const merchantName: any = localStorage.getItem("merchantName");
  const merchantUrl: any = localStorage.getItem("merchantUrl");

  function backtoCrypto() {
    window.location.replace(merchantUrl);
  }

  return (
    <div>
      <Layout>
        <MobileContainer>
          <div className="main_section">
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              <AppBar position="static" className="header_main">
                <Toolbar className="header_sub">
                  <div style={{ textAlign: "left" }}>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      disabled
                      aria-label="menu"
                      sx={{
                        mr: 2,
                        border: "1px solid",
                        borderRadius: "20%",
                        padding: "5px",
                        marginLeft: "-8px",
                        opacity: "50%",
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="header_title">
                      {/* {merchantName && formatTitleCase(merchantName)} */}
                    </div>
                  </div>
                  <div className="logo">
                    <NivapayLogo1 />
                  </div>
                </Toolbar>
              </AppBar>

              <div style={{height: "640px",  display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                <section
                  style={{
                    // height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div>
                      <img src={Signs} alt="failure_icon" />
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        fontFamily: "Inter",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "29px",
                        letterSpacing: "0px",
                        textAlign: "center",
                      }}
                    >
                      Oops !
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "17px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#00000080",
                      }}
                    >
                      This order is expired. Please generate a new order.
                    </div>
                  </div>
                </section>

                <div className="footer">
                  <Footer />
                </div>
              </div>
            </section>
          </div>
        </MobileContainer>
      </Layout>
    </div>
  );
}

export default Error;
