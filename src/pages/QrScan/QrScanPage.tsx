import React, { useEffect, useState } from 'react'
import { Layout, MobileContainer } from '../../styles/layout'
import { AppBar, Box, Button, CardHeader, IconButton, Toolbar, Typography, Container } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';
import './QrScanPage.css'
import { useNavigate } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import { useGlobalContext } from '../../context/context';
import BackButton from '../../dialogs/BackButton';
import NetWorkFee from '../../dialogs/NetWorkfee';
import Footer from '../Footer/Footer';
import ScanCopyTab from './ScanCopyTab';
import QrCode from './QrCode';

function QrScanPage() {
    const context = useGlobalContext();
    const [userName, setUserName] = useState('laxmi@gmail.com')
    const [openCloseDialog, setOpenCloseDialog] = useState(false);
    const [openNetworkDialog, setOpenNetworkDialog] = useState(false);

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate();
    const onIhavePaid = () => {
        navigate('/detecting')
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
        <Layout >
            <MobileContainer>
                <div className='appBar'>
                    <section style={{ display: "flex", flexDirection: "column", height: "100%", }}>
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
                                    <div style={{ paddingLeft: '10px' }}>
                                        <div style={{ marginTop: '20px', display: 'flex' }}>
                                            <ScanCopyTab />
                                        </div>
                                        <div className='qrCodeDiv'>
                                            <Container>
                                                <div style={{ marginTop: '16px' }}>
                                                    <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>ETH</span>
                                                </div>
                                                <div style={{ marginTop: '4px', color: 'blue', textDecoration: 'underline' }}>
                                                    <span style={{ fontSize: '12px' }} onClick={() => setOpenNetworkDialog(true)}>+ Network fee <span className='circle'>i</span> </span>
                                                </div>
                                                <div style={{ marginTop: '12px' }}>
                                                    <span style={{ fontSize: '12px' }}>
                                                        Scan this QR code using your wallet and transfer the above amount
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: '35px' }}>
                                                    <span style={{ height: '270px', width: "196px", justifyContent: 'center' }}>
                                                        <QrCode />
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: '35px' }}>
                                                    <span style={{ fontSize: '13px' }}>
                                                        Only send ETH using the Ethereum network, else the funds may get lost
                                                    </span>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '50px', fontSize: '13px', fontWeight: 500, fontFamily: 'Inter', lineHeight: '14.52px', marginLeft: '20px' }}>
                                        <span>Click the below button once you have triggered the transaction</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                                        <Button
                                            className='continue'
                                            variant='contained'
                                            onClick={onIhavePaid}
                                            disabled={!userName || !re.test(userName)}
                                        >
                                            I have Paid </Button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <Button className="cancelbtn" onClick={() => setOpenCloseDialog(true)}>
                                            Cancel
                                        </Button>
                                    </div>
                                    <BackButton open={openCloseDialog} setOpen={setOpenCloseDialog} />
                                    <NetWorkFee openNetWorkfee={openNetworkDialog}setOpenNetworkfee={setOpenNetworkDialog}/>
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

export default QrScanPage;