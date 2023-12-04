import React, { useEffect, useRef, useState } from "react";
import TopSection from "./Components/TopSection";
import Header from "../../components/Header";
import BottomSection from "./Components/BottomSection";
import CancelPayment from "../../dialogs/CancelPayment";
import Networkfee from "../../dialogs/NetWorkfee";
import Loader from "../../utils/Loader";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

function QrScanPage(props: any) {
  const { fixedTime } = props;
  const containerRef = useRef(null);
  const context = useGlobalContext();
  const [isLoading, setLoading] = useState(false);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [openNetworkDialog, setOpenNetworkDialog] = useState(false);
  const previousPath = context.state.previousPath;
  const token = context.state.token;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(previousPath, { replace: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

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
    <>
      <div className="main_section" ref={containerRef}>
        <section className="sub-section">
          <Header handleClick={handleBack} isDisabled={false} />
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <TopSection fixedTime={fixedTime} />
              <BottomSection
                setOpenCloseDialog={setOpenCloseDialog}
                setOpenNetworkDialog={setOpenNetworkDialog}
                setLoading={setLoading}
                fixedTime={fixedTime}
              />
            </>
          )}
          {openCloseDialog && (
            <CancelPayment
              open={openCloseDialog}
              setOpen={setOpenCloseDialog}
              left_time={props?.fixedTime}
              containerRef={containerRef}
            />
          )}
          {openNetworkDialog && (
            <Networkfee
              openNetWorkfee={openNetworkDialog}
              setOpenNetworkfee={setOpenNetworkDialog}
            />
          )}
        </section>
      </div>
    </>
  );
}

export default QrScanPage;
