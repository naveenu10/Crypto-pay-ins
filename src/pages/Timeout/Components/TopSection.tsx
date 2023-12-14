import TimeoutLogo from "../../../assets/images/NIcons/TimeoutLogo";

function TopSection() {
  return (
    <section className="nivapay_ramp">
      <p className="timer">
        Time left: <span className="timeout-time">00:00 mins</span>
      </p>{" "}
      <div className="timeout-logo-div">
        <div>
          <TimeoutLogo />
        </div>
      </div>
      <div className="timeout-title">Timed Out !</div>
      <div className="timeout-subtitle">
        You did not complete the payment within the prescribed time duration.
        You may re-initiate the process to try again.
      </div>
    </section>
  );
}

export default TopSection;
