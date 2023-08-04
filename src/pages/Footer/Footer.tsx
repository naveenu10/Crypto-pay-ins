import { Stack, Typography } from "@mui/material";
// import nivapay_logo from 'assets/images/nivapay_logo.png';
const logo = require("./logo.png");
function Footer() {
  return (
    <div
      style={{
        width: "100%",
        color: "white",
        fontSize: "25px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        padding: "10px auto",
        marginBottom: 20
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
        spacing={2}
      >
        <img src={logo} alt="nivalogo" width={100} />
      </Stack>
    </div>
  );
}

export default Footer;
