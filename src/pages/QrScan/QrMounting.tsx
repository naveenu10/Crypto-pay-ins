import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Loader from "../../utils/Loader";
import { getCryptoPaymentDetails } from "../../services/depositServices";
import Header from "../../components/Header";

function QrMounting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const coinData = context.state.selectedCoinData;
  const token = context.state.token;
  const orderDetails = context.state.orderDetails;

  let network: string;
  let crypto: string;
  let amount: number;

  const fetchCryptoPayment = async () => {
    if (orderDetails?.order_currency_type === "virtual") {
      network = orderDetails?.order_currency_network;
      crypto = orderDetails?.order_currency_symbol;
      amount = Number(orderDetails?.order_amount);
    }
    if (orderDetails?.order_currency_type === "fiat") {
      network = coinData?.asset_network;
      crypto = coinData?.asset_symbol;
      amount = Number(coinData?.asset_amount);
    }

    const res: any = await getCryptoPaymentDetails(
      network,
      crypto,
      amount,
      token
    );

    if (res?.status === 200) {
      context.dispatch({
        type: "GET_QR_DATA",
        payload: res?.data,
      });
      navigate("/QrScan", { replace: true });
    } else {
      navigate("/error", { replace: true });
    }
  };

  useEffect(() => {
    if (token) {
      fetchCryptoPayment();
    }
  }, []);

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/error", { replace: true });
  //   }
  // }, [token]);

  return (
    <div className="main_section">
      <section className="sub-section">
        <Header isDisabled={true} />
        <Loader />
      </section>
    </div>
  );
}

export default QrMounting;
