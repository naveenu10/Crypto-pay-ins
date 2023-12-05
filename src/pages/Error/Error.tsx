import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import Header from "../../components/Header";
import "./Error.css";
import Signs from "../../assets/images/Signs.png";

function Error() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main_section">
      <section className="sub-section">
        <Header isDisabled={true} />
        <div className="error-section">
          <section className="error-sub-section">
            <div style={{ textAlign: "center" }}>
              <div>
                <img src={Signs} alt="failure_icon" />
              </div>
              <div className="error-title">Oops !</div>
              <div className="error-subtitle">
                This order is expired. Please generate a new order.
              </div>
            </div>
          </section>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Error;
