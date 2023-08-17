import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import "../QrScan/QrScanPage.css";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { ExternalProvider } from "@ethersproject/providers";
import getChainNetworkCurrency from "../../utils/getChainNetworkCurrency";
import getChainNameFromId from "../../utils/getChainNameFromId";
import CancelPayment from "../../dialogs/CancelPayment";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

function MetaMaskConnectedComponent(props: any) {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const coinData = context?.state?.selectedCoinData;
  const orders = context?.state?.orderDetails;
  const token = context?.state?.token;
  const paymentDetails = context?.state?.metamaskPaymentDetails;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [address, setAddress] = useState<any | null>("");
  const [showErr, setShowErr] = useState("");
  const [chaindid, setchaindid] = useState(paymentDetails?.chain_id);
  const [balance, setBalance] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [desiredChainId, setDesiredChainId] = useState(1);

  async function metamaskprovider() {
    var provider: any = await detectEthereumProvider();
    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
  }

  const swtichToEth = async (chainId: any) => {
    var ethereum1: any = await detectEthereumProvider();
    await ethereum1.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(chainId) }],
    });
  };

  async function handleChainChanged(_chaindid: any) {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    const chain = web3.utils.hexToNumber(_chaindid);
    setchaindid(Number(chain));
    checkAccount();
  }

  let currentAccount: string;
  function handleAccountsChanged(accounts: string | any[]) {
    if (accounts.length === 0) {
      setAddress("");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      setAddress(currentAccount);
      getBalance(currentAccount);
    }
  }

  async function getBalance(account: any) {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    web3.eth.getBalance(account).then((res) => {
      const etherValue = Web3.utils.fromWei(res, "ether");
      setBalance(Number(etherValue)?.toFixed(6));
    });
  }

  async function checkAccount() {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    web3.eth.getAccounts(function (err: any, accounts: any) {
      if (err != null) console.error("An error occurred: " + err);
      else if (accounts.length == 0) {
        setAddress("");
      } else {
        setAddress(accounts[0]);
        getBalance(accounts[0]);
      }
    });
    const response = await web3.eth.net.getId();
    const chain = web3.utils.hexToNumber(response);
    setchaindid(Number(chain));
  }

  async function connectMetamask() {
    var ethereum: any = await detectEthereumProvider();
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err: { code: number | any }) => {
        if (err.code === 4001) {
        } else {
          setShowErr("Please select the Network");
        }
      });
  }

  const sendPayment = async () => {
    await ETH()
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const ETH = async () => {
    if (chaindid !== desiredChainId) {
      swtichToEth(desiredChainId);
    } else {
      setLoading(true);
      setchaindid(desiredChainId);
      var ethereum1: any = await detectEthereumProvider();
      const web3 = new Web3(ethereum1);
      const transactionParameters = {
        to: "0x8cD9867098B66C81f0933d3c66a4834F7c3Aa7dC",
        from: address,
        value: web3.utils.toHex(
          web3.utils.toWei(coinData?.asset_quote, "ether")
        ),
      };
      const txHash = await ethereum1.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      if (txHash) {
        web3.eth.getTransaction(txHash, function (err: any, result: any) {
          if (result) {
            // console.log(result);
            navigate("/detecting", { replace: true });
          } else {
            setLoading(false);
          }
        });

        // const interval = setInterval(async function () {
        //   await web3.eth.getTransactionReceipt(
        //     txHash,
        //     function (err: any, rec: any) {
        //       if (rec) {
        //         // var fee = (rec.gasUsed * rec.effectiveGasPrice) / 1e18;
        //         if (rec.status == true) {
        //           context.dispatch({
        //             type: "METAMASK_TRANSACTION_DETAILS",
        //             payload: rec,
        //           });
        //           setLoading(false);
        //         } else {
        //           setLoading(false);
        //         }
        //         clearInterval(interval);
        //       }
        //     }
        //   );
        // }, 5000);
      }
    }
  };

  const handleIhavePaid = () => navigate("/detecting", { replace: true });

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    metamaskprovider();
    checkAccount();
  }, []);

  useEffect(() => {
    handleChainChanged(chaindid);
  }, [chaindid]);

  useEffect(() => {
    if (chaindid) swtichToEth(chaindid);
    connectMetamask();
  }, [chaindid, address]);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

  return (
    <Layout>
      <MobileContainer>
        <div className="main_section">
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              // height: matches ? "100vh" : "auto",
              // minHeight: 750,
            }}
          >
            <AppBar position="static" className="header_main">
              <Toolbar className="header_sub">
                <div style={{ textAlign: "left" }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                      mr: 2,
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "-8px",
                    }}
                    onClick={() =>
                      navigate("/metamask_scan", { replace: true })
                    }
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="header_title">
                    {orders.merchant_brand_name && orders.merchant_brand_name}
                  </div>
                </div>
                <div className="logo">
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <div className="nivapay_section_container">
              <section className="nivapay_section">
                <p className="timer">Time left: {props.fixedTime} mins</p>

                <div className="choosecurrency" style={{ fontSize: 20 }}>
                  Complete Payment
                </div>
                <div style={{ marginTop: 10 }}>
                  <div className="qrMetamaskConnected">
                    <Container>
                      <div style={{ marginTop: "10px" }}>
                        <span
                          style={{
                            fontSize: "24px",
                            color: "#000000",
                            fontWeight: "600",
                          }}
                        >
                          {paymentDetails?.asset_amount &&
                            paymentDetails?.asset_amount}{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#000000",
                            fontWeight: "600",
                            marginLeft: "4px",
                          }}
                        >
                          {paymentDetails?.asset_symbol &&
                            (paymentDetails?.asset_symbol).toUpperCase()}
                        </span>
                      </div>
                      <div style={{ marginTop: "4px", color: "#808080" }}>
                        <span style={{ fontSize: "12px" }}>+ Network fee</span>
                      </div>

                      <div
                        style={{
                          marginTop: "30px",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: "100%", height: 40 }}>
                          {chaindid !== desiredChainId ? (
                            <Typography
                              style={{
                                fontSize: "12px",
                                textAlign: "center",
                                color: "#FF0000",
                                fontFamily: "Inter",
                                marginBottom: "20px",
                              }}
                            >
                              Switch the network in your wallet to Ethereum
                            </Typography>
                          ) : (
                            Number(paymentDetails?.asset_amount) >= balance && (
                              <Typography
                                style={{
                                  fontSize: "12px",
                                  textAlign: "center",
                                  color: "#FF0000",
                                  fontFamily: "Inter",
                                  marginBottom: "20px",
                                }}
                              >
                                Your balance is insufficient
                              </Typography>
                            )
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ color: "#00000080", fontSize: 14 }}>
                            MetaMask
                          </div>
                          <div
                            style={{
                              color: "#21146B",
                              fontWeight: "600",
                              fontSize: 14,
                            }}
                          >
                            Connected
                          </div>
                        </div>
                        <hr />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#00000080",
                            marginTop: "12px",
                            fontSize: "12px",
                          }}
                        >
                          <div>Account</div>
                          <div
                            style={{
                              overflowWrap: "anywhere",
                              paddingLeft: "37px",
                            }}
                          >
                            {address &&
                              `${address?.slice(0, 7)}...${address.slice(-4)}`}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#00000080",
                            fontSize: "12px",
                            marginTop: "12px",
                          }}
                        >
                          <div>Network</div>
                          <div>{getChainNameFromId(chaindid)}</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flex: "start",
                            justifyContent: "space-between",
                            color: "#00000080",
                            fontSize: "12px",
                            marginTop: "12px",
                          }}
                        >
                          <div>Balance</div>
                          {chaindid === desiredChainId ? (
                            <div>
                              {balance} {getChainNetworkCurrency(chaindid)}
                            </div>
                          ) : (
                            "--"
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "30px",
                          fontSize: "14px",
                          color: "#2C1E66",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                        // onClick={() => setAddress("")}
                        onClick={() =>
                          navigate("/metamask_scan", { replace: true })
                        }
                      >
                        Disconnect Wallet
                      </div>

                      <div style={{ marginTop: "35px" }}>
                        <span style={{ fontSize: "12px" }}>
                          Recommended network fee for fast confirmation:
                          <br />
                          <span style={{ color: "#000000", fontWeight: "600" }}>
                            64 gwei
                          </span>
                        </span>
                      </div>
                    </Container>
                  </div>
                </div>

                <CancelPayment
                  open={openCloseDialog}
                  setOpen={setOpenCloseDialog}
                  left_time={props?.fixedTime}
                />
              </section>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  className="continue"
                  variant="contained"
                  onClick={sendPayment}
                  style={{ width: "325px", alignSelf: "center" }}
                  disabled={
                    Number(paymentDetails?.asset_amount) >= balance ||
                    isLoading ||
                    chaindid !== desiredChainId
                  }
                >
                  {isLoading ? "Processing..." : "Send Payment"}
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  className="cancelbtn"
                  style={{ width: "325px", alignSelf: "center" }}

                  fullWidth
                  onClick={() => setOpenCloseDialog(true)}
                >
                  Cancel
                </Button>
              </div>
              <div className="footer">
                <Footer />
              </div>
            </div>
          </section>
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default MetaMaskConnectedComponent;