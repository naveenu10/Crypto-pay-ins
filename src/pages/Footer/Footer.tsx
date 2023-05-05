import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import NivaLogo from "../../assets/images/NIcons/NivaLogo";

function Footer() {
    return (
        <div
            style={{
                width: "96%",
                color: "white",
                fontSize: "25px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                padding: "10px auto"
            }}
        >
            <Stack direction={"row"} sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }} spacing={2}>

                <Typography
                    sx={{
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
                        <img src='https://res.cloudinary.com/dhhxyg3tq/image/upload/v1678791990/Vector_6_xalwvp.svg' alt='nivalogo' />
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