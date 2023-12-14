import success_icon from "../../../assets/images/Success.png";

function TopSection() {
  return (
    <section className="nivapay_ramp">
      <div className="success-icon-div">
        <div>
          <div className="logo-container">
            <div className="logo-glow">
              <img src={success_icon} alt="success_icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="title">Success</div>
    </section>
  );
}

export default TopSection;
