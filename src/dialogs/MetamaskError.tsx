import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { makeStyles } from "@mui/styles";

const errorIcon = require("../assets/images/metamask-icon.png");

const useStyles = makeStyles({
  root: {
    position: "absolute",
  },
  backdrop: {
    position: "absolute",
  },
});

export default function MetamaskError(props: { error: any; setError: any }) {
  const { error, setError } = props;
  const classes = useStyles();

  const handleClose = () => {
    setError(false);
  };

  return (
    <div>
      <Dialog
        open={error}
        disablePortal
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            // bottom: "18%",
            // margin: '5px 12px',
            boxShadow: "none",
            maxWidth: 333,
            minWidth: 300,
            textAlign: "center",
          },
        }}
        className={classes.root}
        classes={{
          root: classes.root,
        }}
        BackdropProps={{
          classes: { root: classes.backdrop },
        }}
        style={{ position: "absolute" }}
      >
        <DialogContent sx={{ padding: "25px 15px" }}>
          <img src={errorIcon} alt="failure_icon" width={80} height={80} />
          <DialogContentText id="alert-dialog-description">
          <h3>An error occured</h3>
            MetaMask not detected ! <br />
            Please install the MetaMask.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
