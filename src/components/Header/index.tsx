import { AppBar, IconButton, Toolbar } from '@mui/material'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';

function Header(props:any) {
  const { handleClick, isDisabled,orderDetails } = props;
  return (
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
          disabled={isDisabled}
          onClick={handleClick && handleClick}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="header_title">
          {orderDetails?.merchant_brand_name &&
            orderDetails?.merchant_brand_name}
        </div>
      </div>
      <div className="logo">
        <NivapayLogo1 />
      </div>
    </Toolbar>
  </AppBar>
  )
}

export default Header