import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useGlobalContext } from "../context/context";
import { sendOrderEvent } from "../services/depositServices";
import Slide from "@mui/material/Slide";

const CancelPayment = (props: {
  open: any;
  setOpen: any;
  left_time: any;
  containerRef: any;
}) => {
  const { open, setOpen, left_time, containerRef } = props;
  const [loading, serLoading] = useState(false);
  const context = useGlobalContext();
  const token = context.state.token;
  const orders = context.state.orderDetails;
  const selectedCoinData = context.state.selectedCoinData;

  const handleCancel = async () => {
    serLoading(true);
    const hms = left_time;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "session.cancelled",
      asset_network: selectedCoinData?.asset_network,
      asset_symbol: selectedCoinData?.asset_symbol,
      asset_amount: selectedCoinData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status === 201) {
      localStorage.clear();
      window.location.replace(orders?.merchant_redirect_url);
    } else {
      serLoading(false);
    }
  };

  return (
    <Slide direction="up" in={open} container={containerRef.current}>
      <Box
        sx={{
          width: "100%",
          height: "276px",
          bgcolor: "#fff",
          borderRadius: 5,
          position: "absolute",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          justifyContent: "center",
        }}
      >
        <div id="modal-modal-description" style={{ marginTop: 2, padding: 20 }}>
          <div
            style={{
              marginBottom: "2rem",
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "30px",
              letterSpacing: "0em",
              textAlign: "center",
            }}
          >
            Are you sure you want <br /> to Cancel and go back to the <br />{" "}
            merchant?
          </div>
          <div
           className="btn-container"
          >
            <Button
              variant="contained"
              style={{
                background: "#1371BC",
                borderRadius: " 8px",
                width: "160px",
                height: "55px",
                textTransform: "none",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "28px",
                letterSpacing: "0px",
                textAlign: "center",
              }}
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              No
            </Button>
            <Button
              variant="outlined"
              style={{
                border: "1px solid #1371BC",
                borderRadius: " 8px",
                width: "160px",
                height: "55px",
                textTransform: "none",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "28px",
                letterSpacing: "0px",
                textAlign: "center",
              }}
              onClick={handleCancel}
            >
              {loading ? "Redirecting..." : "Yes"}
            </Button>
          </div>
        </div>
      </Box>
    </Slide>
  );
};

export default CancelPayment;
