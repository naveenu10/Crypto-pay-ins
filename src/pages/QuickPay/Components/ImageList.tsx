import InfoIcon from "@mui/icons-material/Info";
import { Divider, Stack, Typography, Skeleton } from "@mui/material";
import * as React from "react";
import { useGlobalContext } from "../../../context/context";
import InfoModal from "../../../dialogs/InfoModal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../QuickPay.css";

interface CryptoItem {
  asset_symbol: string;
  asset_network: string;
  asset_name: string;
  asset_image: string;
  asset_amount?: string | number;
}

export default function StandardImageList() {
  const [selectedInd, setselectedInd] = React.useState<number | null>(null);
  const [openInfo, setOpenInfo] = React.useState<boolean>(false);
  const context = useGlobalContext();
  let coinName = context.state.selectedCoin;
  let coinNetwork = context.state.selectedCoinNetwork;
  const cyyptoData: CryptoItem[] = context.state.allCryptos;

  function selectCoin(i: number, item: CryptoItem) {
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
      <Stack direction={"row"} className="stack-container">
        <Typography className="currency-text">
          Currency & <span className="network-text">Network</span>
        </Typography>
        <Typography className="pay-info" onClick={() => setOpenInfo(true)}>
          You pay
          <InfoIcon className="info-icon" />
        </Typography>
      </Stack>
      <Divider />
      <PerfectScrollbar>
        <div className="crypto-list-container">
          {cyyptoData?.length !== 0 ? (
            cyyptoData?.map((item: CryptoItem, i: number) => (
              <Stack
                key={i}
                direction={"row"}
                className={`crypto-item ${
                  selectedInd === i ||
                  (coinName === item?.asset_symbol &&
                    coinNetwork === item?.asset_network)
                    ? "selected"
                    : ""
                }`}
                onClick={() => selectCoin(i, item)}
              >
                <div className="crypto-info">
                  <div className="crypto-logo">
                    <img
                      src={item.asset_image}
                      alt="Crypto Logo"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="crypto-details">
                    <div className="crypto-symbol">
                      {item.asset_symbol.toUpperCase()}
                    </div>{" "}
                    <span className="crypto-name">{item?.asset_name}</span>
                    <div className="crypto-network">{item.asset_network}</div>
                  </div>
                </div>
                <div className="crypto-amount">
                  <div className="crypto-amount-value">
                    {item.asset_amount && item.asset_amount}
                  </div>
                </div>
              </Stack>
            ))
          ) : (
            <div>
              {[1, 2, 3, 4, 5, 6, 7].map((value, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  className="crypto-list-skeleton"
                />
              ))}
            </div>
          )}
        </div>
      </PerfectScrollbar>
      <Divider />
      {openInfo && <InfoModal openInfo={openInfo} setOpenInfo={setOpenInfo} />}
    </div>
  );
}
