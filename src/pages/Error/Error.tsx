import { AppBar, IconButton, Toolbar } from "@mui/material";
import Footer from "../Footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useEffect } from "react";

const Signs = require("../../assets/images/Signs.png");

function Error() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="main_section">
        <section className="sub-section">
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
                    // mr: 2,
                    border: "1px solid",
                    borderRadius: "20%",
                    padding: "5px",
                    marginLeft: "0px",
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

          <div
            style={{
              height: "685px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
    </div>
  );
}

export default Error;
