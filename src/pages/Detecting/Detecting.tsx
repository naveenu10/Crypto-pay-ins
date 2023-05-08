import React from 'react'
import { Layout, MobileContainer } from '../../styles/layout'
import { AppBar, Box, Button, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Processing from '../../assets/images/NIcons/Processing';
import './Detecting.css'
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';




function Detecting() {
    const navigate = useNavigate()
    function backtoCrypto() {
        navigate('/success')
    }
    return (
        <Layout>
            <MobileContainer>
                <div style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                    <section style={{ display: "flex", flexDirection: "column", height: "100vh", }}>
                        <AppBar position="static" style={{ backgroundColor: '#279FFE', boxShadow: 'none' }}>
                            <Toolbar style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', paddingLeft: '22px' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        disabled
                                        sx={{
                                            mr: 2,
                                            border: '1px solid',
                                            borderRadius: '20%',
                                            padding: '5px',
                                            marginLeft: '-8px'
                                        }}
                                    >
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Typography variant="h5" component="h3" style={{
                                        textTransform: 'capitalize',
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        textAlign: 'center',
                                        color: '#FFFFFF',
                                        letterSpacing: '0.05rem'
                                    }}>Cryptogames</Typography>
                                </div>
                                <div style={{ width: "30px", height: '30px' }}>
                                    <NivapayLogo1 />
                                </div>
                            </Toolbar>
                        </AppBar>
                        <div style={{ flex: 1, height: '50vh', overflowY: 'auto' }}>
                            <section className='nivapay_ramp'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8%' }}>
                                    <div style={{ width: '30%' }}>
                                        <Processing />
                                    </div>
                                </div>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 600, fontSize: '24px', lineHeight: '29px', padding: '1rem', display: 'flex', color: '#2C1E66', justifyContent: 'center' }}>
                                    Detecting...
                                </Typography>
                                <Typography style={{
                                    fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '11px', lineHeight: '15px', display: 'flex', alignItems: 'center', textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'
                                }}>
                                    We are scanning the network to detect your transaction.This process may take up to 30 mins to complete.
                                </Typography>
                                <div style={{ marginTop: '30%' }}>
                                    <Divider />
                                </div>
                                <div>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Order id</Typography>
                                        <Typography className='info'>SDF23323</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>User id</Typography>
                                        <Typography className='info'>demonx12</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Action</Typography>
                                        <Typography className='info'>Payment</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Order Amount(crypto)</Typography>
                                        <Typography className='info'>0.003334 BTC</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Destination Wallet</Typography>
                                        <Typography className='info'>37UPTD8u...mRgT</Typography>
                                    </Stack>
                                </div>
                                <div style={{ marginTop: '2%' }}>
                                    <Divider />
                                </div>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '12px', lineHeight: '15px', textAlign: 'center', letterSpacing: '0.06em', color: '#808080', marginTop: '6%' }}>
                                    You may close this window or go back by clicking the button below. We are processing this transaction and will update you the final status through email.
                                </Typography>
                                <div style={{ display: "flex", justifyContent: 'center', marginTop: '12%' }}>
                                    <Button
                                        variant='contained'
                                        className="cryptobtn"
                                        onClick={backtoCrypto}
                                    >
                                        {" "}
                                        Back to Cryptogames{" "}
                                    </Button>
                                </div>
                            </section>
                        </div>
                        <div style={{ justifyContent: "flex-end", }}>
                            <Footer />
                        </div>
                    </section>
                </div>
            </MobileContainer >
        </Layout >
    )
}

export default Detecting