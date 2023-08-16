import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { Layout, MobileContainer } from "../../styles/layout";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "../../utils/Loader";
import { BASE_URL } from "../../config";
import {
  getOrderCrypto,
  getTransactionDetails,
  validateOrder,
} from "../../services/depositServices";

function WelcomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const order_id: string = searchParams.get("order_id")!;
  const hash: string = searchParams.get("hash")!;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const context = useGlobalContext();
  const [token, setToken] = useState("");

  let interval:any=''

  const getValidateOrder = async () => {
    const res: any = await validateOrder(order_id, hash);
    if (res?.status === 200) {
      fetchOrderDetails(res?.data?.token);
      fetchCryptoList(res?.data?.token)
      interval = setInterval(() => fetchCryptoList(res?.data?.token), 1200000);
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
    const res: any = await getTransactionDetails(tokenId);
    if (res?.status === 200) {
      console.log(res);
      localStorage.setItem("merchantUrl", res?.data?.merchant_redirect_url);
      localStorage.setItem("merchantName", res?.data?.merchant_brand_name);
      context.dispatch({
        type: "ORDER_DETAILS",
        payload: res?.data,
      });
      context.dispatch({
        type: "ORDER_ID",
        payload: res?.data?.order_id,
      });
    } else {
      navigate("/error", { replace: true });
    }
  };
  
  const fetchCryptoList = async (tokenId:string) => {
    const res: any = await getOrderCrypto(order_id,tokenId);

        if (res?.status === 200) {
      context.dispatch({
          type: "ALL_CRYPTO",
          payload: res?.data?.quotes,
        });
      }
      else {
        navigate("/error", { replace: true });
      };
  };

  useEffect(() => {
    getValidateOrder();
  }, []);

  useEffect(() => {
    if (token) {
      // const interval = setInterval(() => fetchCryptoList(), 1200000);
      return () => clearInterval(interval);
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
            <Loader />
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default WelcomePage;
