import timer_icon from "../../../assets/images/timer_icon.png";
import { useGlobalContext } from "../../../context/context";

function TopSection() {
  const context = useGlobalContext();
  const transactions = context.state.transactionDetails;
  return (
    <section className="nivapay_ramp">
      <div className="section-subdiv">
        <div style={{ width: "20%" }}>
          <div className="logo-container">
            <div className="logo-glow">
              <img src={timer_icon} alt="timer_icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="title">Detecting...</div>
      <div className="subtitle">
        We are scanning the network to detect your transaction.This process may
        take up to{" "}
        {transactions?.detecting_eta_mins
          ? transactions?.detecting_eta_mins
          : "30"}{" "}
        mins to complete.
      </div>
     
    </section>
  );
}

export default TopSection;
