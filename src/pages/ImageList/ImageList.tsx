import InfoIcon from "@mui/icons-material/Info";
import { Divider, Stack, Typography, Skeleton } from "@mui/material";
import * as React from "react";
import { useGlobalContext } from "../../context/context";
import InfoModal from "../../dialogs/InfoModal";
import "./ImageList.css";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function StandardImageList() {
  const [selectedInd, setselectedInd] = React.useState(null);
  const [openInfo, setOpenInfo] = React.useState(false);
  const context = useGlobalContext();
  let coinName = context.state.selectedCoin;
  let coinNetwork = context.state.selectedCoinNetwork;
  const cyyptoData: any = context.state.allCryptos;

  function selectCoin(i: any, item: any) {
    if (item) {
      setselectedInd(i);
      context.dispatch({
        type: "UPDATE_NETWORK",
        payload: item.asset_symbol,
      });
      context.dispatch({
        type: "SELECTED_COIN",
        payload: item,
      });
      context.dispatch({
        type: "SELECTED_COIN_NETWORK",
        payload: item?.asset_network,
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
            fontSize: "12px",
            fontFamily: "Inter",
            color: "rgba(0, 0, 0, 0.75);",
            fontWeight: 500,
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
            fontSize: "12px",
            fontWeight: 500,
            display: "flex",
            fontFamily: "Inter",
            color: "rgba(0, 0, 0, 0.75);",
            cursor: "pointer",
          }}
          onClick={() => setOpenInfo(true)}
        >
          You pay
          <InfoIcon
            style={{
              width: 14,
              color: "rgba(0, 0, 0, 0.5)",
              marginTop: "-2px",
            }}
          />
        </Typography>
      </Stack>
      <PerfectScrollbar>
        <div className="crypto-list-container">
          <Divider />
          {cyyptoData?.length !== 0 ? (
            cyyptoData?.map((item: any, i: any) => (
              <Stack
                key={i}
                direction={"row"}
                sx={{
                  justifyContent: "space-around",
                  backgroundColor:
                    selectedInd == i ||
                    (coinName === item?.asset_symbol &&
                      coinNetwork === item?.asset_network)
                      ? "#E5F0FF"
                      : "",
                  borderRadius: "10px",
                  padding: "4px",
                  cursor: "pointer",
                }}
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.asset_image}
                          alt="img"
                          width={28}
                          height={28}
                        />
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
                        <div
                          style={{
                            fontWeight: 400,
                            fontSize: "10px",
                            lineHeight: "150%",
                            background: "rgba(214, 214, 214, 0.5)",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            color: "#595959",
                            boxShadow: "none",
                            textTransform: "capitalize",
                            width: "fit-content",
                            marginLeft: 5,
                          }}
                        >
                          {item.asset_network}
                        </div>
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
                        {item.asset_amount && item.asset_amount}
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            ))
          ) : (
            <div>
              {["1", "2", "3", "4", "5", "6","7"].map((value, index): any => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={360}
                  height={60}
                  style={{ marginTop: 5 }}
                />
              ))}
            </div>
          )}
          <Divider />
        </div>
      </PerfectScrollbar>
      {openInfo && <InfoModal openInfo={openInfo} setOpenInfo={setOpenInfo} />}
    </div>
  );
}
