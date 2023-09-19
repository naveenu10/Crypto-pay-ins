import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import getNumericPrecision from "../../utils/getCryptoPrecision";
import { sendOrderEvent } from "../../services/depositServices";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

// const tokenABI: any = [
//   {
//     constant: true,
//     inputs: [
//       {
//         name: "who",
//         type: "address",
//       },
//     ],
//     name: "balanceOf",
//     outputs: [
//       {
//         name: "",
//         type: "uint256",
//       },
//     ],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
// ];

const tokenABI: any = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
  },
];

const tokenSendABI: any = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

function MetaMaskConnectedComponent(props: any) {
  const context = useGlobalContext();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const orders = context?.state?.orderDetails;
  const token = context?.state?.token;
  const paymentDetails = context?.state?.qrData;
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [address, setAddress] = useState<any | null>("");
  const [showErr, setShowErr] = useState("");
  const [chaindid, setchaindid] = useState(paymentDetails?.chain_id);
  const [balance, setBalance] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [desiredChainId, setDesiredChainId] = useState(
    Number(paymentDetails?.chain_id)
  );

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
      navigate("/metamask_scan", { replace: true });
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      setAddress(currentAccount);
      getBalance(currentAccount);
    }
  }

  async function getBalance(account: any) {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);

    if (paymentDetails?.asset_contract_address) {
      const tokenInst = new web3.eth.Contract(
        tokenABI,
        paymentDetails?.asset_contract_address
      );
      const balance = await tokenInst.methods.balanceOf(address).call();
      const etherValueNew = Web3.utils.fromWei(balance, "ether");
      setBalance(etherValueNew);
    } else {
      web3.eth.getBalance(account).then((res) => {
        const etherValue = Web3.utils.fromWei(res, "ether");
        setBalance(Number(etherValue));
      });
    }
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

  const onIhavePaid = async () => {
    const hms = props.fixedTime;
    const a = hms.split(":");
    const seconds = +a[0] * 60 + +a[1];
    const now = new Date().toISOString();

    const payload = {
      user_event: "user.action.transactionInitiated",
      asset_network: paymentDetails?.asset_network,
      asset_symbol: paymentDetails?.asset_symbol,
      asset_amount: paymentDetails?.asset_amount,
      session_time_left_seconds: seconds,
      event_time: now,
    };
    const res: any = await sendOrderEvent(payload, token);
    if (res.status === 201) {
      navigate("/detecting", { replace: true });
    } else {
      // setLoading(false);
    }
  };

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

      const gasPriceWei = web3.utils.toWei(
        paymentDetails?.gas_price_fast_ethereum_gwei?.toString(),
        "gwei"
      );
      const priorityFeePerGas = 0;
      const maxPriorityFee = web3.utils.toWei(
        priorityFeePerGas.toString(),
        "gwei"
      );

      if (paymentDetails?.asset_contract_address) {
        try {
          const usdtContract = new web3.eth.Contract(
            tokenSendABI,
            paymentDetails?.asset_contract_address
          );

          const amountToSend = web3.utils.toWei(
            paymentDetails?.asset_amount,
            // "mwei"
            "ether"
          );

          // Send tokens
          const transaction = await usdtContract.methods
            .transfer(paymentDetails?.wallet_address, amountToSend)
            .send({
              from: address,
              // gasPrice: gasPriceWei,
              maxPriorityFeePerGas: maxPriorityFee,
              maxFeePerGas: gasPriceWei,
            });

          const txHash = transaction.transactionHash;
          if (txHash) {
            web3.eth.getTransaction(txHash, function (err: any, result: any) {
              if (result) {
                // navigate("/detecting", { replace: true });
                onIhavePaid();
              } else {
                setLoading(false);
              }
            });
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        const transactionParameters = {
          to: paymentDetails?.wallet_address,
          from: address,
          // gasPrice: gasPriceWei,
          maxPriorityFeePerGas: maxPriorityFee,
          maxFeePerGas: gasPriceWei,
          value: web3.utils.toHex(
            web3.utils.toWei(paymentDetails?.asset_amount, "ether")
          ),
        };
        const txHash = await ethereum1.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        if (txHash) {
          web3.eth.getTransaction(txHash, function (err: any, result: any) {
            if (result) {
              // navigate("/detecting", { replace: true });
              onIhavePaid();
            } else {
              setLoading(false);
            }
          });
        }
      }
    }
  };

  const getSymbol = async () => {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);

    if (paymentDetails?.asset_contract_address) {
      const tokenContract = new web3.eth.Contract(
        [
          {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [{ name: "", type: "string" }],
            type: "function",
          },
        ],
        paymentDetails?.asset_contract_address
      );

      // Call the 'symbol' function of the ERC20 token contract to get the symbol
      const tokenSymbol = await tokenContract.methods.symbol().call();

      setSymbol(tokenSymbol);
    } else {
      setSymbol(getChainNetworkCurrency(chaindid));
    }
  };

  const handlePrecision = () => {
    const val = getNumericPrecision(
      paymentDetails?.asset_symbol.toUpperCase(),
      paymentDetails?.asset_network
    );
    const formattedBalance = Number(balance)?.toFixed(val);
    return formattedBalance;
  };

  useEffect(() => {
    if (!token) {
      navigate("/error", { replace: true });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    metamaskprovider();
    checkAccount();
    connectMetamask();
  }, []);

  useEffect(() => {
    handleChainChanged(chaindid);
  }, [chaindid]);

  useEffect(() => {
    if (chaindid) {
      swtichToEth(chaindid);
      getSymbol();
    }
  }, [chaindid, address, paymentDetails?.asset_contract_address]);

  useEffect(() => {
    if (address) {
      getBalance(address);
    }
  }, [address, paymentDetails?.asset_contract_address]);

  useEffect(() => {
    setDesiredChainId(Number(paymentDetails?.chain_id));
  }, [paymentDetails?.chain_id]);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

  useEffect(() => {
    if (openCloseDialog) {
      window.onbeforeunload = null;
      return;
    }
    window.onbeforeunload = function () {
      const msg = "Are you sure you want to leave?";
      return msg;
    };

    return () => {
      window.onbeforeunload = null;
      setBalance("");
    };
  }, [openCloseDialog]);

  return (
    <Layout>
      <MobileContainer>
        <div className="main_section" ref={containerRef}>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
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
                      border: "1px solid",
                      borderRadius: "20%",
                      padding: "5px",
                      marginLeft: "0px",
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
                <div
                  className="logo"
                  onClick={() => window.open("https://nivapay.com/")}
                >
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            <div className="nivapay_section_container">
              <section className="nivapay_section">
                <p className="timer">
                  Time left:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {props.fixedTime} mins
                  </span>
                </p>
                <div className="choosecurrency" style={{ fontSize: 20 }}>
                  Complete Payment
                </div>
                <div className="m-qr-card">
                  <div className="qrMetamaskConnected">
                    <Container>
                      <div style={{ marginTop: "10px" }}>
                        <span
                          style={{
                            fontSize: "24px",
                            color: "#000000",
                            fontWeight: 600,
                          }}
                        >
                          {paymentDetails?.asset_amount &&
                            paymentDetails?.asset_amount}{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#000000",
                            fontWeight: 600,
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
                              Switch the network in your wallet to{" "}
                              {paymentDetails?.asset_network}
                            </Typography>
                          ) : (
                            balance &&
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
                              fontWeight: 600,
                              fontSize: 14,
                            }}
                          >
                            {/* { error ? "Connected" : "Disconnected } */}
                            {address ? "Connected" : "Disconnected"}
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
                              {balance ? (
                                <>
                                  {handlePrecision()} {symbol}
                                </>
                              ) : (
                                <div style={{ width: 80 }}>
                                  <Skeleton />
                                </div>
                              )}
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
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setAddress("");
                          navigate("/metamask_scan", { replace: true });
                        }}
                      >
                        Disconnect Wallet
                      </div>

                      <div style={{ marginTop: "35px" }}>
                        <span style={{ fontSize: "12px" }}>
                          Recommended network fee for fast confirmation:
                          <br />
                          <span style={{ color: "#000000", fontWeight: 700 }}>
                            {paymentDetails?.gas_price_fast_ethereum_gwei} gwei
                          </span>
                        </span>
                      </div>
                    </Container>
                  </div>
                </div>

                <div className="footer">
                  <div
                    style={{
                      marginBottom: "35px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      className="continue"
                      variant="contained"
                      onClick={sendPayment}
                      disabled={
                        Number(paymentDetails?.asset_amount) >= balance ||
                        isLoading ||
                        chaindid !== desiredChainId
                      }
                    >
                      {isLoading ? "Processing..." : "Send Payment"}
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
              </section>
            </div>
          </section>
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={props?.fixedTime}
            containerRef={containerRef}
          />
        </div>
      </MobileContainer>
    </Layout>
  );
}

export default MetaMaskConnectedComponent;
