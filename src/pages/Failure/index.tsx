import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { useEffect } from "react";
import "./Failure.css";
import Header from "../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

function Detecting() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const orders = context.state.orderDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orders) {
      navigate("/error", { replace: true });
    }
  }, []);

  return (
    <div className="main_section">
      <section className="sub-section">
        <Header isDisabled={true} />
        <TopSection />
        <BottomSection />
      </section>
    </div>
  );
}

export default Detecting;
