import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "../context/context";
import { sendOrderEvent } from "../services/depositServices";

const style = {
  position: "absolute" as "absolute",
  top: "88%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 326,
  bgcolor: "background.paper",
  border: "none !important",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2,
};

const CancelPayment = (props: {
  open: any;
  setOpen: any;
  left_time: string;
}) => {
  const { open, setOpen, left_time } = props;
  const context = useGlobalContext();
  const token = context.state.token;
  const orders = context.state.orderDetails;
  const selectedCoinData = context.state.selectedCoinData;

  const handleCancel = async () => {
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
      setOpen(false);
      window.location.replace(orders?.merchant_redirect_url);
    } else {
      // setLoading(false);
    }
  };

 
  return (
    <>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="div">
              <div style={{ marginBottom: "2rem" }}>
                Are you sure you want to Cancel and go back to the merchant?
              </div>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{ display: "flex", gap: "3rem" }}>
                <Button
                  variant="contained"
                  style={{
                    background: "#1371BC",
                    borderRadius: " 8px",
                    width: "40%",
                  }}
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    border: "1px solid #1371BC",
                    borderRadius: " 8px",
                    width: "40%",
                  }}
                  onClick={handleCancel}
                >
                  Yes
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CancelPayment;
