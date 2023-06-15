import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useNavigate } from "react-router-dom";
import NivapayLogo1 from "../../assets/images/NIcons/NivapayLogo1";
import { useGlobalContext } from "../../context/context";
import BackButton from "../../dialogs/BackButton";
import { Layout, MobileContainer } from "../../styles/layout";
import Footer from "../Footer/Footer";
import QrCode from "../QrScan/QrCode";
import "../QrScan/QrScanPage.css";
import MetamaskError from "../QrScan/MetamaskError";
import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { ExternalProvider } from "@ethersproject/providers";
import { fontWeight } from "@mui/system";
import QRCode from "qrcode.react";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

function MetaMaskPage(props: any) {
  const context = useGlobalContext();
  const [userName, setUserName] = useState("laxmi@gmail.com");
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [address, setAddress] = useState<any | null>("");
  const [showErr, setShowErr] = useState("");
  const [chaindid, setchaindid] = useState(0);
  const [balance, setBalance] = useState<any | null>(null);
  const [requestAmount, setRequestedAmount] = useState<any | null>(0.05446);
  const [serviceFee, setServiceFee] = useState<any | null>(0.000000064);

  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();
  const onContinue = () => {
    // navigate('/Metamask')
    // metamaskIntegration()
  };

 
  let coinName = context.state.selectedCoin;

  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: any;
    seconds: any;
    completed: any;
  }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const startApp = (provider: any) => {
    if (provider !== window.ethereum) {
      console.log("provider--->>", provider);
    }
  };

  async function metamaskprovider() {
    var provider: any = await detectEthereumProvider();
    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);
    if (provider) {
      startApp(provider);
    } else {
    }
  }

  async function handleChainChanged(_chaindid: any) {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    const chain = web3.utils.hexToNumber(_chaindid);
    setchaindid(Number(chain));
    console.log(chain, "chainId");
  }

  let currentAccount: string;

  function handleAccountsChanged(accounts: string | any[]) {
    console.log(accounts, "accounts");
    if (accounts.length === 0) {
      setAddress("");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      setAddress(currentAccount);
      console.log(currentAccount, "Account Address");
      getBalance(currentAccount);
    }
  }

  async function getBalance(account: any) {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    web3.eth.getBalance(account).then((res) => {
      console.log(res, "bal");
      const etherValue = Web3.utils.fromWei(res, "ether");
      console.log(Number(etherValue)?.toFixed(6));
      setBalance(Number(etherValue)?.toFixed(6));
    });
  }

  async function checkAccount() {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    web3.eth.getAccounts(function (err: any, accounts: any) {
      if (err != null) console.error("An error occurred: " + err);
      else if (accounts.length == 0) {
        console.log("User is not logged in to MetaMask");
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
    // if (network.length !== 0) {
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
    // }
    // else {
    //     setShowErr("Please select the Network")
    // }
  }

  async function ETH() {
    var ethereum1: any = await detectEthereumProvider();
    const web3 = new Web3(ethereum1);
    const transactionParameters = {
      to: "0x5215E5e0061A302886543d6AD286CDc15a36Fd1E",
      from: address,
      // value: web3.utils.toHex(web3.utils.toWei(`${"updatedData.ethamount"}`, 'ether')),
      value: web3.utils.toHex(web3.utils.toWei("0.0000001", "ether")),
    };
    const txHash = await ethereum1.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    if (txHash) {
      web3.eth.getTransaction(txHash, function (err: any, result: any) {});
      const interval = setInterval(async function () {
        await web3.eth.getTransactionReceipt(
          txHash,
          function (err: any, rec: any) {
            if (rec) {
              var fee = (rec.gasUsed * rec.effectiveGasPrice) / 1e18;
              if (rec.status == true) {
                // setStatus('paid');
                // TransactionDetails(rec.transactionHash, updatedData.ethamount, fee, updatedData.nivapayaddess, updatedData.chaindid, rec.from)
                // setLoadPay(false)
              } else {
                // setStatus('expired')
              }
              clearInterval(interval);
            }
          }
        );
      }, 5000);
    }
  }

  useEffect(() => {
    metamaskprovider();
    checkAccount();
  }, []);

  useEffect(() => {
    handleChainChanged(chaindid);
  }, [chaindid]);

  useEffect(() => {
    if (props.fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [props.fixedTime]);

  return (
    <Layout>
      <MobileContainer>
        <div className="appBar">
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              // height: "100vh",
            }}
          >
            <AppBar
              position="static"
              style={{ backgroundColor: "#279FFE", boxShadow: "none" }}
            >
              <Toolbar
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  paddingLeft: "22px",
                }}
              >
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
                    onClick={() => navigate(-1)}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "20px",
                      lineHeight: "24px",
                      textAlign: "center",
                      color: "#FFFFFF",
                      letterSpacing: "0.05rem",
                    }}
                  >
                    Cryptogames
                  </Typography>
                </div>
                <div style={{ width: "30px", height: "30px" }}>
                  <NivapayLogo1 />
                </div>
              </Toolbar>
            </AppBar>
            {address !== "" ? (
              <div style={{ flex: 1, height: "auto" }}>
                <section className="nivapay_ramp">
                  <Typography
                    style={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "14px",
                      lineHeight: "17px",
                      textAlign: "center",
                      letterSpacing: "0.06em",
                      color: "#000000",
                      fontFamily: "Inter",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Time left 15:00 mins */}
                    Time Left: {props.fixedTime} mins
                  </Typography>
                  <div className="choosecurrency" style={{ fontSize: 20 }}>
                    Complete Payment
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <div className="qrCodeDiv">
                      <Container>
                        <div style={{ marginTop: "16px" }}>
                          <span
                            style={{
                              fontSize: "24px",
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            {requestAmount}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#000000",
                              fontWeight: "600",
                              marginLeft: "4px",
                            }}
                          >
                            ETH
                          </span>
                        </div>
                        <div style={{ marginTop: "4px", color: "#808080" }}>
                          <span style={{ fontSize: "12px" }}>
                            + Network fee
                          </span>
                        </div>

                        <div
                          style={{
                            marginTop: "55px",
                            justifyContent: "center",
                          }}
                        >
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
                                `${address?.slice(0, 7)}...${address.slice(
                                  -4
                                )}`}
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
                            <div>Ethereum</div>
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
                            <div>{balance} ETH</div>
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
                          onClick={() => setAddress("")}
                        >
                          Disconnect Wallet
                        </div>

                        <div style={{ marginTop: "45px" }}>
                          <span style={{ fontSize: "12px" }}>
                            Recommended network fee for fast confirmation:
                            <br />
                            <span
                              style={{ color: "#000000", fontWeight: "600" }}
                            >
                             {serviceFee / 0.000000001} gwei
                            </span>
                          </span>
                        </div>
                      </Container>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "64px",
                    }}
                  >
                    <Button
                      className="continue"
                      variant="contained"
                      // onClick={ETH}
                      disabled={(requestAmount + serviceFee).toFixed(6)>=balance}
                    >
                      Send Payment{" "}
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      className="cancelbtn"
                      fullWidth
                      onClick={() => setOpenCloseDialog(true)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <BackButton
                    open={openCloseDialog}
                    setOpen={setOpenCloseDialog}
                  />
                </section>
              </div>
            ) : (
              <div style={{ flex: 1, height: "auto" }}>
                <section className="nivapay_ramp">
                  <Typography
                    style={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "14px",
                      lineHeight: "17px",
                      textAlign: "center",
                      letterSpacing: "0.06em",
                      color: "#000000",
                      fontFamily: "Inter",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Time left 15:00 mins */}
                    Time Left: {props.fixedTime} mins
                  </Typography>
                  <div className="choosecurrency" style={{ fontSize: 20 }}>
                    Complete Payment
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <div className="qrCodeDiv">
                      <Container>
                        <div style={{ marginTop: "16px" }}>
                          <span
                            style={{ fontSize: "24px", fontWeight: "600px" }}
                          >
                           {requestAmount}
                          </span>
                          <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                            {coinName}
                          </span>
                        </div>
                        <div style={{ marginTop: "4px", color: "#808080" }}>
                          <span style={{ fontSize: "12px" }}>
                            + Network fee{" "}
                          </span>
                        </div>
                        <div style={{ marginTop: "12px" }}>
                          <span style={{ fontSize: "12px" }}>
                            Scan this QR code using your MetaMask wallet or
                            connect it using the button below
                          </span>
                        </div>
                        <div
                          style={{
                            marginTop: "15px",
                            display: "flex",
                            height: "auto",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          {/* have to change once qr url come from api response */}
                          {/* <QrCode /> */}

                          <QRCode
                            value={
                              "https://metamask.app.link/send/0x2f7f783ec8c70E6614AD1bc3C6Fd9CD206B3C054@1?value=5.446e16&gasPrice=64&label=Nivapay%2063ffa75b-af3b-45b1-9abb-a310e3352e28"
                            }
                            size={180}
                          />
                        </div>
                        <div style={{ marginTop: "15px" }}>
                          <span style={{ fontSize: "13px" }}>
                            Recommended network fee for fast
                            <br />
                            confirmation: <b>64 gwei</b>
                          </span>
                        </div>
                      </Container>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "64px",
                    }}
                  >
                    <Button
                      className="continue"
                      variant="contained"
                      onClick={connectMetamask}
                    >
                      Open Metamask
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      className="cancelbtn"
                      onClick={() => setOpenCloseDialog(true)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <BackButton
                    open={openCloseDialog}
                    setOpen={setOpenCloseDialog}
                  />
                </section>
              </div>
            )}
            <div style={{ justifyContent: "flex-end", marginBottom: 10 }}>
              <Footer />
            </div>
          </section>
        </div>
        {/* {status === "connected" && <MetamaskError />} */}
      </MobileContainer>
    </Layout>
  );
}

export default MetaMaskPage;
