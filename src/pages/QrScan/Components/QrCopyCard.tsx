import { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Container,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import formatTitleCase from "../../../utils/formatTitleCase";
import copy from "copy-to-clipboard";
import info_icon from "../../../assets/icons/info_icon.png";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "4px",
    padding: "8px 12px",
  },
  input: {
    color: "#2C1E66 !important",
    height: 35,
    fontWeight: 500,
    borderRadius: "0px !important",

    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#2C1E66",
    },
  },
  qrBox: {
    minWidth: 120,
  },
  formControl: {
    margin: 1,
    borderRadius: "4px",
    width: "95%",
  },
}));

function QrCopyCard(props: any) {
  const { qrData, setOpenNetworkDialog } = props;
  const classes = useStyles();
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [showAmountTooltip, setShowAmountTooltip] = useState(false);
  return (
    <div className="qrCodeDiv">
      <Container>
        <div className="qrAmount">
          {(qrData?.asset_amount && qrData?.asset_amount) || 0}
          <div className="qrSymbol">{qrData?.asset_symbol?.toUpperCase()}</div>
        </div>
        <div className="networkFee">
          <div className="bottomLine">
            <span
              onClick={() => setOpenNetworkDialog(true)}
              className="bottomLineContent"
            >
              + Network fee
              <img src={info_icon} className="network-fee-icon" />
            </span>
          </div>
        </div>
        <div className="qrText">
          Copy-paste below details to your wallet and complete the payment
        </div>
        <div className="qr-input-div">
          <div className="qr-input-title">Send to this address</div>
          <Box className={classes.qrBox}>
            <FormControl className={classes.formControl}>
              <TextField
                value={qrData?.wallet_address}
                fullWidth
                autoComplete="off"
                InputProps={{
                  className: classes.input,
                  readOnly: true,
                  endAdornment: (
                    <div style={{}}>
                      <InputAdornment position="end">
                        <Tooltip
                          title="Copied"
                          open={showCopyTooltip}
                          placement={"top"}
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button
                            className="qr-copy-button"
                            onClick={() => {
                              copy(qrData?.wallet_address);
                              setShowCopyTooltip(true);
                              setShowAmountTooltip(false);
                              setTimeout(() => {
                                setShowCopyTooltip(false);
                              }, 1000);
                            }}
                          >
                            <img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg" />
                          </Button>
                        </Tooltip>
                      </InputAdornment>
                    </div>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </div>

        <div style={{ marginTop: "15px" }}>
          <div className="qr-input-title">Amount (excludes network fee)</div>
          <Box className={classes.qrBox}>
            <FormControl className={classes.formControl}>
              <TextField
                value={qrData?.asset_amount}
                autoComplete="off"
                InputProps={{
                  className: classes.input,
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Copied"
                        open={showAmountTooltip}
                        placement={"top"}
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button
                          className="qr-copy-button"
                          onClick={() => {
                            copy(qrData?.asset_amount);
                            setShowAmountTooltip(true);
                            setShowCopyTooltip(false);
                            setTimeout(() => {
                              setShowAmountTooltip(false);
                            }, 1000);
                          }}
                        >
                          <img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg" />
                        </Button>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </div>

        <div className="qr-copy-div">
          Only send{" "}
          {qrData?.asset_symbol && qrData?.asset_symbol?.toUpperCase()} using
          the {qrData?.asset_network && formatTitleCase(qrData?.asset_network)}{" "}
          network, else the funds may get lost
        </div>
      </Container>
    </div>
  );
}

export default QrCopyCard;
