import { NLabel } from "nivapay-ui";
import { useState } from "react";
import { Layout, MobileContainer } from "../../styles/layout";
import Input from "@mui/material/Input";
import "./Welcome.scss";
import {
  Alert,
  AppBar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../config";
import Loader from "../../utils/Loader";

const currency = [
  { label: "USD", value: "usd" },
  { label: "AUD", value: "aud" },
  { label: "EUR", value: "eur" },
  { label: "BRL", value: "brl" },
  { label: "GBP", value: "gbp" },
];

const crypto = [
  { label: "BTC", value: "btc" },
  { label: "LTC", value: "ltc" },
  { label: "ETH", value: "eth" },
  { label: "BCH", value: "bch" },
  { label: "Doge", value: "doge" },
  { label: "USDC", value: "usdc" },
  { label: "USDT", value: "usdt" },
];

function WelcomePage() {
  const [withdrawOption, setWithdrawOption] = useState("Fiat");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    user_first_name: "arun",
    user_last_name: "kumar",
    email: "aruns@nu10.co",
    merchant_name: "cryptogames",
    fiat: "usd",
    crypto: "btc",
    amount: 1,
    epoch: Date.now(),
    user_id: "1xdev",
    merchant_id: "M1307305",
    merchant_redirect_url: "https://nivapay.com",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name !== "amount")
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    else {
      setUserDetails({
        ...userDetails,
        [name]: parseFloat(e.target.value).toFixed(2),
      });
    }
  };

  const submitDetails = async () => {
    setLoading(true);
    try {
      if (withdrawOption == "Fiat") {
        const userData = {
          order_amount: userDetails?.amount,
          order_currency: userDetails.fiat,
          order_currency_type: withdrawOption?.toLowerCase(),
          action: "deposit",
          user_id: userDetails.user_id,
          user_email_id: userDetails.email?.toLowerCase(),
          user_first_name: userDetails.user_first_name,
          user_last_name: userDetails.user_last_name,
          merchant_id: userDetails.merchant_id,
          merchant_redirect_url: userDetails.merchant_redirect_url,
          merchant_brand_name: userDetails.merchant_name,
        };

        const response = await axios.post(
          `${BASE_URL}/merchant/sdk/deposit/order`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );
        if (response.status === 201) {
          setLoading(false);
          navigate(
            `/deposit?order_id=${response?.data?.order_id}&hash=${response?.data?.hash}`,
            { replace: true }
          );
        }
        setLoading(false);
      }
      if (withdrawOption == "Crypto") {
        const userData = {
          order_amount: JSON.stringify(userDetails?.amount),
          order_currency: userDetails.crypto,
          order_currency_type: withdrawOption?.toLowerCase(),
          action: "deposit",
          user_id: userDetails.user_id,
          user_email_id: userDetails.email?.toLowerCase(),
          user_first_name: userDetails.user_first_name,
          user_last_name: userDetails.user_last_name,
          merchant_id: userDetails.merchant_id,
          merchant_redirect_url: userDetails.merchant_redirect_url,
          merchant_brand_name: userDetails.merchant_name,
        };

        const response = await axios.post(
          `${BASE_URL}/merchant/sdk/deposit/order`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );
        if (response.status === 201) {
          setLoading(false);
          navigate(
            `/deposit?order_id=${response?.data?.order_id}&hash=${response?.data?.hash}`
          );
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Layout>
          <MobileContainer>
            {isLoading ? (
              <Loader />
            ) : (
              <section
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  fontFamily: "inter",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar
                    position="static"
                    style={{
                      backgroundColor: "rgb(39, 159, 254)",
                      boxShadow: "none",
                    }}
                  >
                    <Toolbar
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                      }}
                    >
                      <div></div>
                      <div style={{ textAlign: "center" }}>
                        <Typography
                          variant="h5"
                          component="h3"
                          style={{
                            textTransform: "capitalize",
                            textAlign: "center",
                          }}
                        >
                          Tenet Name
                        </Typography>
                      </div>
                    </Toolbar>
                  </AppBar>
                </Box>
                <div className="paymentcontent-wrap">
                  <div>
                    <NLabel
                      text={"First Name"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      disabled={false}
                      className="input-wrap"
                      name="user_first_name"
                      onChange={handleInputChange}
                      value={userDetails.user_first_name}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"Last Name"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      disabled={false}
                      className="input-wrap"
                      name="user_last_name"
                      onChange={handleInputChange}
                      value={userDetails.user_last_name}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"Email"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      type="email"
                      disabled={false}
                      className="input-wrap"
                      name="email"
                      onChange={handleInputChange}
                      value={userDetails.email}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"Merchant"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      disabled={false}
                      className="input-wrap"
                      name="merchant_name"
                      onChange={handleInputChange}
                      value={
                        userDetails?.merchant_name?.charAt(0).toUpperCase() +
                        userDetails.merchant_name?.slice(1)
                      }
                    />
                  </div>
                  <div>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={withdrawOption}
                      >
                        <FormControlLabel
                          value="Fiat"
                          control={
                            <Radio
                              onChange={(e) =>
                                setWithdrawOption(e.target.value)
                              }
                            />
                          }
                          label="Fiat"
                        />
                        <FormControlLabel
                          value="Crypto"
                          control={
                            <Radio
                              onChange={(e) =>
                                setWithdrawOption(e.target.value)
                              }
                            />
                          }
                          label="Crypto"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {withdrawOption == "Fiat" && (
                    <div style={{ marginTop: 25 }}>
                      <FormControl sx={{ borderRadius: "4px", width: "100%" }}>
                        <InputLabel id="demo-controlled-open-select-label">
                          {" "}
                          Currency
                        </InputLabel>
                        <Select
                          required
                          name="fiat"
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          value={userDetails?.fiat}
                          label="Countries"
                          onChange={handleInputChange}
                        >
                          {currency.map((el: any) => (
                            <MenuItem key={el.value} value={el.value}>
                              {el.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                  {withdrawOption == "Crypto" && (
                    <div style={{ marginTop: 25 }}>
                      <FormControl sx={{ borderRadius: "4px", width: "100%" }}>
                        <InputLabel id="demo-controlled-open-select-label">
                          {" "}
                          Crypto
                        </InputLabel>
                        <Select
                          required
                          name="crypto"
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          value={userDetails.crypto}
                          label="Countries"
                          onChange={handleInputChange}
                        >
                          {crypto.map((el: any) => (
                            <MenuItem key={el.value} value={el.value}>
                              {el.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"Amount"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      disabled={false}
                      type="number"
                      className="input-wrap"
                      name="amount"
                      onChange={handleInputChange}
                      value={
                        userDetails.amount == 1
                          ? Number(userDetails.amount)?.toFixed(2)
                          : userDetails.amount
                      }
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"Merchant Id"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      disabled={false}
                      type="text"
                      className="input-wrap"
                      name="merchant_id"
                      onChange={handleInputChange}
                      value={userDetails.merchant_id}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"User Id"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      type="text"
                      className="input-wrap"
                      name="user_id"
                      onChange={handleInputChange}
                      value={userDetails.user_id}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <NLabel
                      text={"Merchant Redirect Url"}
                      isBold={false}
                      fontSize={16}
                      isLabelDark={false}
                      isLabelLight={false}
                      isLabelBlackShade1={false}
                      isLabelBlackShade2={false}
                      isTextCenter={false}
                    />
                    <Input
                      required
                      disabled={false}
                      type="text"
                      className="input-wrap"
                      name="merchant_redirect_url"
                      onChange={handleInputChange}
                      value={userDetails.merchant_redirect_url}
                    />
                  </div>
                  {errorMsg && (
                    <div style={{ marginTop: "10px" }}>
                      <Alert variant="filled" severity="error">
                        {errorMsg}
                      </Alert>
                    </div>
                  )}
                  <div>
                    <Button
                      variant="contained"
                      className="receiptPay"
                      style={{
                        backgroundColor: "rgb(39, 159, 254)",
                        marginTop: 20,
                        marginBottom: 40,
                      }}
                      onClick={submitDetails}
                    >
                      {" "}
                      Pay{" "}
                    </Button>
                  </div>
                </div>
              </section>
            )}
          </MobileContainer>
        </Layout>
      </div>
    </>
  );
}

export default WelcomePage;
