import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/context";
import { getTransactionDetails } from "../../../services/depositServices";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";

function OrderDetails({ setLoading }: any) {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const transactions = context.state.transactionDetails;
  const token = context.state.token;
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
    if (token) {
      fetchTransactionDetails();
    }
  }, []);

  return (
    <div className="success-order-container">
      <div className="order-details-container">
        <div className="order-details-item">Order id</div>
        <div className="order-details-val">
          {" "}
          {transactions?.order_id && transactions?.order_id}
        </div>
      </div>
      <div className="order-details-container">
        <div className="order-details-item">Action</div>
        <div className="order-details-val">Payment</div>
      </div>

      <div className="order-details-container">
        <div className="order-details-item">Expected Amount(crypto)</div>
        <div className="order-details-val">
          {expectedData?.asset_amount && expectedData?.asset_amount}
          &nbsp;
          {expectedData?.asset_symbol &&
            expectedData?.asset_symbol?.toUpperCase()}
        </div>
      </div>

      <div className="order-details-container">
        <div className="order-details-item">Destination Wallet</div>
        <div className="order-details-val">
          {data &&
            `${data?.destination_wallet_address.slice(
              0,
              7
            )}...${data?.destination_wallet_address.slice(-4)}`}
        </div>
      </div>

      <div className="order-details-container">
        <div className="order-details-item"> Received amount (crypto)</div>
        <div className="order-details-val">
          {data?.transaction_amount && data?.transaction_amount}{" "}
          {data?.transaction_asset_symbol &&
            (data?.transaction_asset_symbol).toUpperCase()}
        </div>
      </div>

      <div className="order-details-container">
        <div className="order-details-item"> Transaction Hash</div>
        <div
          className="order-details-val"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "57px",
          }}
        >
          <img
            src="https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683182823/ph_copy_lnoksz.svg"
            alt="copyimage"
            className="hash-copy-icon"
            onClick={() =>
              copy(transactions?.transactions[0]?.transaction_hash)
            }
          />
          <img
            src="https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683183469/Icon_lrkziq.svg"
            alt="redirect"
            className="hash-explorer-icon"
            onClick={() =>
              window.open(
                transactions?.transactions[0]?.transaction_hash_explorer_url
              )
            }
          />
        </div>
      </div>

      <div className="order-details-container">
        <div className="order-details-val">
          {data?.transaction_hash && data?.transaction_hash}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
