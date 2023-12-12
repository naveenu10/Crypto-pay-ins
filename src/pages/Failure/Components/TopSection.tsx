import FailureLogo from "../../../assets/images/NIcons/FailureLogo";

function TopSection() {
  return (
    <section className="nivapay_ramp">
      <div className="failure-div">
        <div className="failure-sub-div">
          <FailureLogo />
        </div>
      </div>
      <div className="failure-title">Failure</div>
      <div className="failure-info">
        We could not detect your payment. If you have initiated the transaction
        kindly wait for it to get confirmed on the blockchain.
      </div>
    </section>
  );
}

export default TopSection;
