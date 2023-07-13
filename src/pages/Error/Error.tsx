import { useEffect } from "react";
import { Button, Typography,useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import formatTitleCase from "../../utils/formatTitleCase";

function Error() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const merchantName: any = localStorage.getItem("merchantName");
  const merchantUrl: any = localStorage.getItem("merchantUrl");

  function backtoCrypto() {
    window.location.replace(merchantUrl);
  }

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
                  style={{ textTransform: "none",height:55 }}
                  fullWidth
                  onClick={backtoCrypto}
                >
                  {" "}
                  Back to {merchantName && formatTitleCase(merchantName)}
                </Button>
              </section>
            </div>
            <div className={matches ? "footer" : "footerSmall"}>
              <Footer />
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Error;
