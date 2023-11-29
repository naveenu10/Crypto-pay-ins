import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";
import CancelPayment from "../../dialogs/CancelPayment";
import "./DepositPage.css";
import Loader from "../../utils/Loader";
import Header from "../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

function DepositPage(props: any) {
  const { fixedTime } = props;
  const context = useGlobalContext();
  const containerRef = React.useRef(null);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const orderDetails = context.state.orderDetails;
  const email = context.state.email;
  const [userEmail, setUserEmail] = useState(email);
  const [isLoading, setLoading] = useState(false);

  const handlemodal = () => setOpenCloseDialog(!openCloseDialog);

  useEffect(() => {
    if (openCloseDialog) {
      window.onbeforeunload = null;
      return;
    }
    window.onbeforeunload = function () {
      const msg = "Are you sure you want to leave?";
      return msg;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [openCloseDialog]);

  return (
    <div className="main_section" ref={containerRef}>
      <section className="sub-section">
        <Header handleClick={handlemodal} isDisabled={false} />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="nivapay_section_container">
            <TopSection orderDetails={orderDetails} fixedTime={fixedTime}/>
            <BottomSection
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              email={email}
              handlemodal={handlemodal}
              setLoading={setLoading}
              orderDetails={orderDetails}
            />
          </div>
        )}
        {openCloseDialog && (
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            containerRef={containerRef}
            left_time={props?.fixedTime}
          />
        )}
      </section>
    </div>
  );
}

export default DepositPage;
