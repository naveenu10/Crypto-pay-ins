import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { BASE_URL } from "../config";

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
};

const CancelPayment = (props: { open: any; setOpen: any }) => {
  const { open, setOpen } = props;
  const context = useGlobalContext();
  const navigate = useNavigate();
  const token = context.state.token;
  const orders = context.state.orderDetails;

  const clickYes = async () => {
    const now = Date.now(); 
    console.log(now);
    const payload = {
      user_event: "cancel",
      "timestamp":now
    };
    await axios
      .post(`${BASE_URL}/sdk/deposit/order/events`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // navigate("/", { replace: true });
        localStorage.clear();
        setOpen(false);
        window.location.replace(orders?.merchant_redirect_url);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Typography component="div" sx={{}}>
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
                  onClick={clickYes}
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
