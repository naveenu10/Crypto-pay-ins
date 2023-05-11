import React, { useEffect, useState } from 'react'
import { Layout, MobileContainer } from '../../styles/layout'
import { AppBar, Box, Button, CardHeader, IconButton, Toolbar, Typography, Container } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';
import '../QrScan/QrScanPage.css'
import { useNavigate } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import { useGlobalContext } from '../../context/context';
import BackButton from '../../dialogs/BackButton';
import Footer from '../Footer/Footer';
import QrCode from '../QrScan/QrCode';

function MetaMaskPage() {
    const context = useGlobalContext();
    const [userName, setUserName] = useState('laxmi@gmail.com')
    const [openCloseDialog, setOpenCloseDialog] = useState(false)
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate();
    const onContinue = () => {
        navigate('/quickpay')
    }

    const Completionist = () => <span>You are good to go!</span>;
    const renderer = ({ minutes, seconds, completed }: { minutes: any, seconds: any, completed: any }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    // const date = new Date(Date.now() + 900000);
    // const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    // console.log(`${minutes}:${seconds}`);
    // const getDate = (`${minutes}:${seconds}`)
    // const timestamp = Date.now() + 900000; // Add 900000 ms to the current timestamp to get a timestamp 15 minutes in the future
    // const date = new Date(timestamp);
    // const options = { hour12: false, hour: 'numeric', minute: 'numeric' };
    // const localTime = date.toLocaleTimeString('en-US', options);

    // console.log(localTime);


    // useEffect(() => {
    //     context.dispatch({
    //         type: 'IS_TIMER',
    //         payload: getDate
    //     })
    // }, [date])

    return (
        <Layout>
            <MobileContainer>
                <div className='appBar'>
                    <section style={{ display: "flex", flexDirection: "column", height: "100vh", }}>
                        <AppBar position="static" style={{ backgroundColor: '#279FFE', boxShadow: 'none' }}>
                            <Toolbar style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', paddingLeft: '22px' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{
                                            mr: 2,
                                            border: '1px solid',
                                            borderRadius: '20%',
                                            padding: '5px',
                                            marginLeft: '-8px'
                                        }}
                                        onClick={() => setOpenCloseDialog(true)}
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
                                <Container>
                                    <Typography style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '30px', textAlign: 'center', letterSpacing: '0.06em', color: '#000000', fontFamily: 'Inter', }}>
                                        {/* Time left 15:00 mins */}
                                        Time Left: {" "}
                                        <Countdown date={Date.now() + 900000} renderer={renderer} /> mins
                                    </Typography>
                                    <div className="choosecurrency">Complete Payment</div>
                                    <div style={{ alignItems: 'center' }}>
                                        <div className='qrCodeDiv'>
                                            <Container>
                                                <div style={{ marginTop: '16px' }}>
                                                    <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>ETH</span>
                                                </div>
                                                <div style={{ marginTop: '4px', color: '#808080', }}>
                                                    <span style={{ fontSize: '12px' }}>+ Network fee </span>
                                                </div>
                                                <div style={{ marginTop: '12px' }}>
                                                    <span style={{ fontSize: '12px' }}>
                                                        Scan this QR code using your MetaMask wallet or connect it using the button below
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: '35px' }}>
                                                    <span style={{ height: '270px', width: "196px", justifyContent: 'center' }}>
                                                        <QrCode />
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: '35px' }}>
                                                    <span style={{ fontSize: '13px' }}>
                                                        Recommended network fee for fast confirmation: 64 gwei
                                                    </span>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '104px' }}>
                                        <Button
                                            className='continue'
                                            variant='contained'
                                            onClick={onContinue}
                                            disabled={!userName || !re.test(userName)}
                                        >
                                            Open MetaMask
                                        </Button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <Button className="cancelbtn" onClick={() => setOpenCloseDialog(true)}>
                                            Cancel
                                        </Button>
                                    </div>
                                    <BackButton open={openCloseDialog} setOpen={setOpenCloseDialog} />
                                </Container>
                            </section>
                        </div>

                    </section>
                    <div style={{ justifyContent: "flex-end" }}>
                        <Footer />
                    </div>
                </div>
            </MobileContainer >
        </Layout >
    )
}

export default MetaMaskPage;