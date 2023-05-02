import { Box, Stack, Typography } from "@mui/material";
// import { NLogo } from "nivapay-ui";
import React from "react";
import NivapayLogo from "../assets/images/NIcons/NivapayLogo";
import NivaLogo from "../assets/images/NIcons/NivaLogo";

function Footer() {
    return (
        <div
            style={{
                // backgroundColor: "#f9fafe",
                // borderTop: "2px solid red",
                // position: "fixed",
                width: "96%",
                color: "white",
                fontSize: "25px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                padding: "10px auto"
                // height: "4%",
                // marginTop: "4%",
                // marginTop: "150px"
            }}
        >
            <Stack direction={"row"} sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }} spacing={2}>

                {/* <div style={{ width: "20px" }}>
                    <NivaLogo />
                </div> */}
                <Typography
                    sx={{
                        // fontWeight: "400",
                        // fontSize: "12px",
                        // lineHeight: "15px",
                        // color: "#21146B",
                        // display: 'flex'
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#2C1E66',
                        opacity: 0.75,
                    }}
                >


                    Powered by
                    <div style={{ width: "20px", padding: '0px 5px', lineHeight: '0px' }}>
                        <NivaLogo />
                    </div> <span style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#735EE8',
                        opacity: 0.75,
                    }}>NivaPay</span>
                </Typography>
            </Stack>
        </div >
    );
}

export default Footer;