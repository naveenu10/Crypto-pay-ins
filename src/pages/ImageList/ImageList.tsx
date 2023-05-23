import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  styled,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import { useGlobalContext } from "../../context/context";
import InfoModal from "../../dialogs/InfoModal";
import "./ImageList.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import formatCryptoAmount from "../../utils/formatCryptoAmount";

const Item = styled(Paper)(({ theme }: { theme: any }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function StandardImageList(props: {
  showmask: any;
  setShowMask: any;
  showEth: any;
  setShowEth: any;
  selectedCoinName: any;
  setselectedCoinName: any;
  cyyptoData: any;
}) {
  const {
    showmask,
    setShowMask,
    showEth,
    setShowEth,
    selectedCoinName,
    setselectedCoinName,
    cyyptoData,
  } = props;
  const [selectedCoin, setSelectedCoin] = React.useState("");
  const [selectedInd, setselectedInd] = React.useState(null);
  const [coinImage, setCoinImage] = React.useState("");
  const [currencyList, setCurrencyList] = React.useState<any[]>([]);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [loadData, setLoadData] = React.useState(false);
  const context = useGlobalContext();
  let coinName = context.state.selectedCoin;

  function selectCoin(i: any, item: any) {
    if (item) {
      console.log(item);
      setselectedInd(i);
      setSelectedCoin(item.asset_name);
      context.dispatch({
        type: "UPDATE_NETWORK",
        payload: item.asset_symbol,
      });
      context.dispatch({
        type: "SELECTED_COIN",
        payload: item,
      });
    }
  }

  return (
    <div>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", mb: 1, mt: 1 }}
      >
        <Typography
          sx={{
            fontSize: "17px",
            fontFamily: "Inter",
            color: "rgba(0, 0, 0, 0.75);",
          }}
        >
          Currency &{" "}
          <span
            style={{
              background: "rgba(214, 214, 214, 0.5)",
              borderRadius: "10%",
              padding: "3px",
              color: "#595959",
            }}
          >
            Network
          </span>
        </Typography>
        <Typography
          sx={{
            fontSize: "17px",
            display: "flex",
            fontFamily: "Inter",
            color: "rgba(0, 0, 0, 0.75);",
          }}
        >
          You pay
          {/* <Button
            style={{
              color: "rgba(0, 0, 0, 0.5)",
              padding: "0px",
              minWidth: "0px",
            }}
            onClick={() => setOpenInfo(true)}
          > */}
          <Tooltip
            placement="left"
            title="The amount shown here is an estimate and the actual will be determined at the time when this transaction is processed"
          >
            <InfoIcon />
          </Tooltip>
          {/* </Button> */}
        </Typography>
      </Stack>
      <Divider style={{ marginTop: "1%" }} />
      <PerfectScrollbar>
        <div style={{ minHeight: 350, maxHeight: 350 }}>
          {cyyptoData.length !== 0 ?
            cyyptoData?.map((item: any, i: any) => (
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-around",
                  // backgroundColor: selectedInd == i || context.state.paymentRecipt.crypto == item.coin ? "#ADCFFF" : "",
                  backgroundColor: (selectedInd == i || coinName === item?.asset_symbol) ? "#E5F0FF" : "",
                  borderRadius: "10px",
                  padding: "4px",
                }}
                // onClick={() => ShowMetamask(i, item)}
                onClick={() => selectCoin(i, item)}
              >
                <div style={{ width: "57%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "5px",
                    }}
                  >
                    <div style={{ display: "flex", gap: ".5rem" }}>
                      <div style={{ paddingTop: "5px" }}>
                        <img src={item.asset_image} alt="img" width={28} height={28} />
                      </div>
                      <div>
                        <div style={{ display: "flex", padding: "5px" }}>
                          <div
                            style={{
                              color: "#2C1E66",
                              fontWeight: "600",
                              fontSize: "14px",
                            }}
                          >
                              {item.asset_symbol.toUpperCase()}
                          </div>{" "}
                          <span
                            style={{
                              paddingLeft: "7px",
                              color: "rgba(0, 0, 0, 0.5)",
                              fontSize: "14px",
                              fontWeight: 400,
                            }}
                          >
                            {item?.asset_name}
                          </span>
                        </div>
                        <Button
                          variant="contained"
                          sx={{
                            fontWeight: 400,
                            fontSize: "10px",
                            lineHeight: "150%",
                            background: "rgba(214, 214, 214, 0.5)",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            color: "#595959",
                            boxShadow: "none",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.asset_network}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      margin: "5px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "#21146B",
                          fontSize: "16px",
                          fontWeight: "600",
                          padding: "2px",
                          textAlign: "end",
                          lineHeight: "48px",
                        }}
                      >
                        {item.asset_quote &&
                            formatCryptoAmount(
                              item.asset_symbol.toUpperCase(),
                              item.asset_quote
                            )}

                      </div>
                      {/* <div style={{ color: '#808080', fontSize: '14px', fontWeight: '500', padding: '5px', textAlign: "end" }}>{item.fiat}</div> */}
                    </div>
                  </div>
                </div>
              </Stack>
            )) : 'No Data Found'}
        </div>
      </PerfectScrollbar>
      <Divider />
      {openInfo && <InfoModal openInfo={openInfo} setOpenInfo={setOpenInfo} />}
    </div>
  );
}

