import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import formatTitleCase from "../../utils/formatTitleCase";

function Error() {
  const merchantName: any = localStorage.getItem("merchantName");
  const merchantUrl: any = localStorage.getItem("merchantUrl");

  function backtoCrypto() {
    window.location.replace(merchantUrl);
  }

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
            <div style={{ flex: 1, marginTop: "20%" }}>
              <section className="nivapay_ramp">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "8%",
                  }}
                >
                  <ErrorOutlineIcon color="error" style={{ fontSize: 80 }} />
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
                    marginBottom: 20,
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

                <Button
                  variant="contained"
                  // className="cryptobtn"
                  style={{ textTransform: "none" }}
                  fullWidth
                  onClick={backtoCrypto}
                >
                  {" "}
                  Back to {merchantName && formatTitleCase(merchantName)}
                </Button>
              </section>
            </div>
            <div className="footer">
              <Footer />
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Error;
