import { useGlobalContext } from "../../../context/context";

function OrderDetails() {
  const context = useGlobalContext();
  const orders = context.state.orderDetails;

  return (
    <div className="timeout-order-container">
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
        <div className="order-details-item">Order Amount</div>
        <div className="order-details-val">
          {orders?.order_currency_symbol &&
            (orders?.order_currency_symbol).toUpperCase()}{" "}
          {orders?.order_amount && Number(orders?.order_amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
