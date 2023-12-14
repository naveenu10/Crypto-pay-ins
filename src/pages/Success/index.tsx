import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import "./Success.css";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Header from "../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

function Success() {
  const navigate = useNavigate();
  const context = useGlobalContext();
  const token = context.state.token;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }

  }, []);

  return (
    <div className="main_section">
      <section className="sub-section">
        <Header isDisabled={true} />
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <TopSection />
            <BottomSection setLoading={setLoading} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Success;
