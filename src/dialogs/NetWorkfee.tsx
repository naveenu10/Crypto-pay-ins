import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function Networkfee(props: {
  openNetWorkfee: any;
  setOpenNetworkfee: any;
}) {
  const { openNetWorkfee, setOpenNetworkfee } = props;

  const handleClose = () => {
    setOpenNetworkfee(false);
  };

  return (
    <div>
      <Dialog
        open={openNetWorkfee}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            bottom: "18%",
            boxShadow: "none",
            maxWidth: 333,
            textAlign: "center",
          },
        }}
      >
        <DialogContent sx={{ padding: "5px 15px" }}>
          <DialogContentText id="alert-dialog-description" sx={{}}>
            Please ensure that an appropriate network fee is added separately,
            in addition to the payment amount.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
