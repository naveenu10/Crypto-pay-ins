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
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "./Success.css";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import formatTitleCase from "../../utils/formatTitleCase";
import { getTransactionDetails } from "../../services/depositServices";
import Loader from "../../utils/Loader";
const success_icon = require("../../assets/images/Success.png");

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const orders = context.state.orderDetails;
  const transactions = context.state.transactionDetails;
  const token = context.state.token;
  const [timeFlag, setTimeFlag] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>("");
  const cyyptoData: any = context.state.allCryptos;

  function filterObjects() {
    return (
      cyyptoData &&
      cyyptoData?.filter(
        (item: any) =>
          item?.asset_symbol === data?.transaction_asset_symbol &&
          item.asset_network === data?.transaction_asset_network
      )[0]
    );
  }
  const expectedData = filterObjects();

  const backtoCrypto = () => {
    window.location.replace(orders?.merchant_redirect_url);
  };

  const duration = 1 * 30 * 1000;
  const [time, setTime] = useState(duration);
  useEffect(() => {
    setTimeout(() => {
      if (time) {
        setTime(time - 1000);
      } else {
        setTimeFlag(true);
        window.location.replace(orders?.merchant_redirect_url);
      }
    }, 1000);
  }, [time]);
  let totalSeconds = Math.floor(time / 1000);
  let totalMinitus = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let minitus = totalMinitus % 60;
  let fixedTime = `${minitus < 10 ? `0${minitus}` : minitus}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  const fetchTransactionDetails = async () => {
    const res: any = await getTransactionDetails(token);
    if (res.status === 200) {
      context.dispatch({
        type: "UPDATE_TRANSACTION_DETAILS",
        payload: res?.data,
      });
      setData(res?.data?.transactions[0]);
      setLoading(false);
    } else {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    if (!orders) {
      navigate("/error", { replace: true });
    }
    if (token) {
      fetchTransactionDetails();
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
                    disabled
                    sx={{
                      // mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {" "}
                    {orders?.merchant_brand_name && orders?.merchant_brand_name}
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
              <div className="nivapay_section_container">
                <section className="nivapay_section">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20%",
                    }}
                  >
                    <div style={{ width: "20%" }}>
                      <div className="logo-container">
                        <div className="logo-glow">
                          <img src={success_icon} alt="success_icon" />
                        </div>
                      </div>
                      {/* <SuccessLogo /> */}
                    </div>
                  </div>
                  <div className="title">Success</div>
                  <div style={{ marginTop: "23%", marginBottom: "1%" }}>
                    <Divider sx={{ borderBottomWidth: "1.5px" }} />
                  </div>
                  <div>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography className="currency">Order id</Typography>
                      <Typography className="info">
                        {" "}
                        {transactions?.order_id && transactions?.order_id}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography className="currency">Action</Typography>
                      <Typography className="info">Payment</Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography className="currency">
                        Expected amount (crypto)
                      </Typography>
                      <Typography className="info">
                        {expectedData?.asset_amount &&
                          expectedData?.asset_amount}
                        &nbsp;
                        {expectedData?.asset_symbol &&
                          expectedData?.asset_symbol?.toUpperCase()}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography className="currency">
                        Destination Wallet
                      </Typography>
                      <Typography className="info">
                        {data &&
                          `${data?.destination_wallet_address.slice(
                            0,
                            7
                          )}...${data?.destination_wallet_address.slice(-4)}`}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography className="currency">
                        Received amount (crypto)
                      </Typography>
                      <Typography
                        style={{ color: "rgba(0, 0, 0, 0.5)" }}
                        className="info"
                      >
                        {" "}
                        {data?.transaction_amount &&
                          data?.transaction_amount}{" "}
                        {data?.transaction_asset_symbol &&
                          (data?.transaction_asset_symbol).toUpperCase()}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography className="currency">
                        Transaction Hash
                      </Typography>
                      <Typography className="info" style={{ gap: "5px" }}>
                        <img
                          src="https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683182823/ph_copy_lnoksz.svg"
                          alt="copyimage"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            copy(
                              transactions?.transactions[0]?.transaction_hash
                            )
                          }
                        />
                        <img
                          src="https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683183469/Icon_lrkziq.svg"
                          alt="redirect"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `https://blockchair.com/${expectedData?.asset_network?.toLowerCase()}/transaction/${
                                data?.transaction_hash
                              }`
                            )
                          }
                        />
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ justifyContent: "space-between", padding: "7px" }}
                    >
                      <Typography
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "17px",
                          letterSpacing: "0.06em",
                          color: "rgba(0, 0, 0, 0.5)",
                          wordBreak: "break-all",
                        }}
                      >
                        {data?.transaction_hash && data?.transaction_hash}
                      </Typography>
                    </Stack>
                  </div>
                  <div style={{ marginTop: "1%" }}>
                    <Divider sx={{ borderBottomWidth: "1.5px" }} />
                  </div>
                </section>
                <div className="footer">
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "17px",
                      textAlign: "center",
                      letterSpacing: "0.06em",
                      color: "#21146B",
                      marginBottom: "5%",
                    }}
                  >
                    Redirecting in{" "}
                    <span style={{ color: "#279FFE" }}>{fixedTime}</span>{" "}
                    <span>secs...</span>
                  </div>
                  <div className="footer-height">
                    <Button
                      variant="contained"
                      className="cryptobtn"
                      onClick={backtoCrypto}
                    >
                      {" "}
                      Back to{" "}
                      {orders?.merchant_brand_name &&
                        formatTitleCase(orders?.merchant_brand_name)}
                    </Button>
                  </div>
                  <Footer />
                </div>
              </div>
            )}
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default Detecting;
