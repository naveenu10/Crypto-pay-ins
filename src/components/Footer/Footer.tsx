import { Stack } from "@mui/material";
import logo from "./logo.png";
function Footer() {
  return (
    <div className="footer-img-container">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <img src={logo} alt="nivalogo" width={100} />
      </Stack>
    </div>
  );
}

export default Footer;
