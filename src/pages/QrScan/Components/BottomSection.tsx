import React, { useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import ScanCard from "./ScanCard";
import { useGlobalContext } from "../../../context/context";
import Footer from "../../../components/Footer/Footer";
import QrCopy from "./QrCopyCard";
import { useNavigate } from "react-router-dom";
import { sendOrderEvent } from "../../../services/depositServices";

interface IconButtonProps {
  iconSrc: string;
  text: string;
  active: boolean;
  onClick: () => void;
}

const CustomButton = withStyles((theme) => ({
  root: {
    borderRadius: 12,
    padding: "6px 20px",
    margin: theme.spacing(1),
    textTransform: "none",
    fontFamily: "Inter",
    flex: "0 0 auto",
    width: "154px",
    color: "#2C1E66 !important",
    "&.active": {
      backgroundColor: "#CCCCCC",
      textTransform: "none",
      borderRadius: 12,
      "&:hover": {
        backgroundColor: "#CCCCCC",
      },
    },
    "&:hover": {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
    },
    [theme.breakpoints.down("sm")]: {
      width: "140px",
      flex: "0 0 auto",
    },
  },
  notActive: {
    borderRadius: 12,
  },
}))(Button);

const CustomTabs = withStyles({
  indicator: {
    display: "none",
  },
})((props: any) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

const IconButton = ({ iconSrc, text, active, onClick }: IconButtonProps) => (
  <CustomButton
    className={active ? "active" : ""}
    onClick={onClick}
    sx={{ textTransform: "none" }}
  >
    <img
      src={iconSrc}
      alt="icon"
      width={16}
      height={16}
      style={{ marginRight: 8 }}
    />
    {text}
  </CustomButton>
);

interface RenderQRContentProps {
  value: number;
  qrData: any;
  setOpenNetworkDialog: (arg: boolean) => void;
}

const RenderQRContent = ({
  value,
  qrData,
  setOpenNetworkDialog,
}: RenderQRContentProps) => (
  <div style={{ maxWidth: "360px", textAlign: "center" }}>
    {value === 0 && (
      <ScanCard qrData={qrData} setOpenNetworkDialog={setOpenNetworkDialog} />
    )}
    {value === 1 && (
      <QrCopy qrData={qrData} setOpenNetworkDialog={setOpenNetworkDialog} />
    )}
  </div>
);

interface BottomSectionProps {
  setOpenNetworkDialog: (arg: boolean) => void;
  setOpenCloseDialog: (arg: boolean) => void;
  setLoading: (arg: boolean) => void;
  fixedTime: string;
}

const BottomSection: React.FC<BottomSectionProps> = ({
  setOpenNetworkDialog,
  setOpenCloseDialog,
  setLoading,
  fixedTime,
}: BottomSectionProps) => {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const token = context.state.token;
  const qrData = context.state.qrData;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onIhavePaid = async () => {
    setLoading(true);
    const hms = fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "user.action.transactionInitiated",
      asset_network: qrData?.asset_network,
      asset_symbol: qrData?.asset_symbol,
      asset_amount: qrData?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };

    const res: any = await sendOrderEvent(payload, token);
    if (res.status === 201) {
      setLoading(false);
      navigate("/detecting", { replace: true });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="bottom-section">
      <div style={{ textAlign: "center" }}>
        <CustomTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="false"
          aria-label="Custom tabs example"
        >
          <Tab
            disableRipple
            label={
              <IconButton
                iconSrc="https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg"
                text="Scan"
                active={value === 0}
                onClick={() => setValue(0)}
              />
            }
          />
          <Tab
            disableRipple
            label={
              <IconButton
                iconSrc="https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg"
                text="Copy"
                active={value === 1}
                onClick={() => setValue(1)}
              />
            }
          />
        </CustomTabs>
      </div>
      <RenderQRContent
        value={value}
        qrData={context.state.qrData}
        setOpenNetworkDialog={setOpenNetworkDialog}
      />
      <div className="footer">
        <div className="footer-buttons-container">
          <div className="qr-button-info">
            Click the below button once you have triggered the transaction
          </div>
          <Button
            className="continue"
            variant="contained"
            onClick={onIhavePaid}
          >
            I have Paid
          </Button>
          <Button
            className="cancelbtn"
            fullWidth
            onClick={() => setOpenCloseDialog(true)}
          >
            Cancel
          </Button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BottomSection;
