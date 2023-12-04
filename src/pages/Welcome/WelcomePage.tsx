import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Loader from "../../utils/Loader";
import {
  getOrderCrypto,
  getOrderDetails,
  validateOrder,
} from "../../services/depositServices";

function WelcomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const order_id: string = searchParams.get("order_id")!;
  const hash: string = searchParams.get("hash")!;
  const context = useGlobalContext();
  let interval: any = "";

  const getValidateOrder = async () => {
    const res: any = await validateOrder(order_id, hash);
    if (res?.status === 200) {
      fetchOrderDetails(res?.data?.token);
      context.dispatch({
        type: "TOKEN",
        payload: res?.data?.token,
      });
      navigate(`/deposit/order?order_id=${order_id}&hash=${hash}`, {
        replace: true,
      });
    } else {
      navigate(`/error`, {
        replace: true,
      });
    }
  };

  const fetchOrderDetails = async (tokenId: string) => {
    const res: any = await getOrderDetails(tokenId);
    if (res?.status === 200) {
      localStorage.setItem("merchantUrl", res?.data?.merchant_redirect_url);
      localStorage.setItem("merchantName", res?.data?.merchant_brand_name);

      if (res?.data?.order_currency_type !== "virtual") {
        fetchCryptoList(tokenId);
        interval = setInterval(() => fetchCryptoList(tokenId), 1200000);
      }

      context.dispatch({
        type: "ORDER_DETAILS",
        payload: res?.data,
      });
      context.dispatch({
        type: "ORDER_ID",
        payload: res?.data?.order_id,
      });
      context.dispatch({
        type: "UPDATE_HASH",
        payload: hash,
      });
      context.dispatch({
        type: "UPDATE_EMAIL",
        payload: res?.data?.user_email_id,
      });
    } else {
      navigate("/error", { replace: true });
    }
  };

  const fetchCryptoList = async (tokenId: string) => {
    const res: any = await getOrderCrypto(order_id, tokenId);

    if (res?.status === 200) {
      context.dispatch({
        type: "ALL_CRYPTO",
        payload: res?.data?.quotes,
      });
    } else {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    getValidateOrder();
    return () => clearInterval(interval);
  }, []);

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

export default WelcomePage;
