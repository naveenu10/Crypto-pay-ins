import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";
import "../../QrScan/QrScanPage.css";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { ExternalProvider } from "@ethersproject/providers";
import getChainNetworkCurrency from "../../../utils/getChainNetworkCurrency";
import CancelPayment from "../../../dialogs/CancelPayment";
import { sendOrderEvent } from "../../../services/depositServices";
import Header from "../../../components/Header";
import TopSection from "./Components/TopSection";
import BottomSection from "./Components/BottomSection";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

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
  const { fixedTime } = props;
  const context = useGlobalContext();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
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
    const hms = fixedTime;
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
      .then((res) => {})
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

      // const gasPriceWei = web3.utils.toWei(
      //   paymentDetails?.gas_price_fast_ethereum_gwei?.toString(),
      //   "gwei"
      // );

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
              gasLimit: paymentDetails?.gasLimit_evm,
              maxPriorityFeePerGas: web3.utils.toWei("0", "gwei"),
              maxFeePerGas: web3.utils.toHex(
                web3.utils.toWei(
                  `${paymentDetails?.gas_price_fast_ethereum_gwei}`,
                  "gwei"
                )
              ),
            });

          const txHash = transaction.transactionHash;
          if (txHash) {
            web3.eth.getTransaction(txHash, function (err: any, result: any) {
              if (result) {
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
          gasLimit: paymentDetails?.gasLimit_evm,
          maxPriorityFeePerGas: web3.utils.toWei("0", "gwei"),
          maxFeePerGas: web3.utils.toHex(
            web3.utils.toWei(
              `${paymentDetails?.gas_price_fast_ethereum_gwei}`,
              "gwei"
            )
          ),

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
    if (fixedTime === "00:00") {
      navigate("/timeout", { replace: true });
    }
  }, [fixedTime]);

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

  const handleBack = () => {
    navigate("/metamask_scan", { replace: true });
  };

  return (
    <div className="main_section" ref={containerRef}>
      <section className="sub-section">
        <Header handleClick={handleBack} isDisabled={false} />
        <div className="nivapay_section_container">
          <TopSection
            fixedTime={fixedTime}
            chaindid={chaindid}
            desiredChainId={desiredChainId}
            balance={balance}
            address={address}
            symbol={symbol}
            setAddress={setAddress}
          />
          <BottomSection
            chaindid={chaindid}
            desiredChainId={desiredChainId}
            balance={balance}
            isLoading={isLoading}
            setOpenCloseDialog={setOpenCloseDialog}
            sendPayment={sendPayment}
          />
        </div>
        {openCloseDialog && (
          <CancelPayment
            open={openCloseDialog}
            setOpen={setOpenCloseDialog}
            left_time={fixedTime}
            containerRef={containerRef}
          />
        )}
      </section>
    </div>
  );
}

export default MetaMaskConnectedComponent;
