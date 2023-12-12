import { useGlobalContext } from "../../../context/context";

function OrderDetails() {
  const context = useGlobalContext();
  const orders = context.state.orderDetails;
  const paymentDetails = context?.state?.qrData;
  return (
    <div className="borderBottomTop">
      <div className="order-details-container">
        <div className="order-details-item">Order id</div>
        <div className="order-details-val">
          {" "}
          {orders?.order_id && orders?.order_id}
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
