import Timer from "../../../components/Timer";
import formatTitleCase from "../../../utils/formatTitleCase";
import "../DepositPage.css";

function TopSection(props: any) {
  const { orderDetails, fixedTime } = props;
  const {
    order_currency_type,
    order_amount,
    order_currency_symbol,
    merchant_brand_name,
  } = orderDetails;
  return (
    <section className="nivapay_section">
      <Timer fixedTime={fixedTime} />
      <div className="pay-title" style={{ marginTop: 40 }}>
        Pay
      </div>
      {order_currency_type === "virtual" ? (
        <div className="order_currency">
          {order_amount && order_amount}
          &nbsp;
          {order_currency_symbol && order_currency_symbol?.toUpperCase()}
        </div>
      ) : (
        <div className="order_currency">
          {order_currency_symbol && order_currency_symbol?.toUpperCase()}
          &nbsp;
          {order_amount && order_amount}
        </div>
      )}
      <div className="pay-title">worth of crypto to</div>
      <div className="brand-name">
        {merchant_brand_name && formatTitleCase(merchant_brand_name)}
      </div>
    </section>
  );
}

export default TopSection;
