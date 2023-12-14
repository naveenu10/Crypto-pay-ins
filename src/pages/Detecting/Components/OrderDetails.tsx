import { useGlobalContext } from "../../../context/context";

function OrderDetails() {
  const context = useGlobalContext();
  const paymentDetails = context?.state?.qrData;
  const transactions = context.state.transactionDetails;

  return (
    <div className="detecting-order-container">
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
          {paymentDetails?.asset_amount && paymentDetails?.asset_amount}{" "}
          {paymentDetails?.asset_symbol &&
            paymentDetails?.asset_symbol?.toUpperCase()}
        </div>
      </div>

      <div className="order-details-container">
        <div className="order-details-item">Destination Wallet</div>
        <div className="order-details-val">
          {paymentDetails?.wallet_address &&
            `${paymentDetails?.wallet_address.slice(
              0,
              7
            )}...${paymentDetails?.wallet_address.slice(-4)}`}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
