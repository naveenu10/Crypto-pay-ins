
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';
import { useGlobalContext } from '../../context/context';
import BackButton from '../../dialogs/BackButton';
import { Layout, MobileContainer } from '../../styles/layout';
import Footer from '../Footer/Footer';
import './QrScanPage.css';
import MetaMaskPage from '../metaMask/MetaMaskPage';

function MetamaskError() {
    const context = useGlobalContext();
    const [userName, setUserName] = useState('laxmi@gmail.com')
    const [openCloseDialog, setOpenCloseDialog] = useState(false)
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
                                        sx={{
                                            mr: 2,
                                            border: '1px solid',
                                            borderRadius: '20%',
                                            padding: '5px',
                                            marginLeft: '-8px'
                                        }}
                                        onClick={() => navigate(-1)}
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
                                <Container maxWidth="lg">
                                    <Typography style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '30px', textAlign: 'center', letterSpacing: '0.06em', color: '#000000', fontFamily: 'Inter', }}>
                                        {/* Time left 15:00 mins */}
                                        Time Left: {" "}
                                        <Countdown date={Date.now() + 900000} renderer={renderer} /> mins
                                    </Typography>
                                    <div className="choosecurrency">Complete Payment</div>
                                    <div style={{ paddingLeft: '10px' }}>

                                        <div className='qrCodeDiv'>
                                            <Container>
                                                <div style={{ marginTop: '16px' }}>
                                                    <span style={{ fontSize: "24px", color: '#000000', fontWeight: '600' }}>0.05446</span><span style={{ fontSize: "12px", color: '#000000', fontWeight: '600', marginLeft: '4px' }}>ETH</span>
                                                </div>
                                                <div style={{ marginTop: '4px', color: '#808080', }}>
                                                    <span style={{ fontSize: '12px' }}>+ Network fee</span>
                                                </div>


                                                <div style={{ marginTop: '28px', justifyContent: 'center' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ color: '#00000080' }}>MetaMask</div>
                                                        <div style={{ color: '#21146B', fontWeight: '600' }}>Connected</div>
                                                    </div>
                                                    <hr />

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00000080', marginTop: '12px', fontSize: '12px' }}>
                                                        <div>Account</div>
                                                        <div>0xFBeCa3...09D0</div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00000080', fontSize: '12px', marginTop: '12px' }}>
                                                        <div>Network</div>
                                                        <div>Ethereum</div>
                                                    </div>
                                                    <div style={{ display: 'flex', flex: 'start', justifyContent: 'space-between', color: '#00000080', fontSize: '12px', marginTop: '12px' }}>
                                                        <div>Balance</div>
                                                        <div>1.05 ETH</div>
                                                    </div>

                                                </div>
                                                <div style={{ marginTop: '16px' }}>

                                                    <span style={{ fontSize: '14px', color: '#2C1E66', fontWeight: '700' }}>
                                                        Disconnect Wallet
                                                    </span>
                                                </div>


                                                <div style={{ marginTop: '20px' }}>

                                                    <span style={{ fontSize: '12px' }}>
                                                        Recommended network fee for fast confirmation:<br /><span style={{ color: '#000000', fontWeight: '600' }}>64 gwei
                                                        </span>
                                                    </span>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '104px' }}>
                                        <Button
                                            className='continue'
                                            variant='contained'
                                            onClick={onIhavePaid}
                                            disabled={!userName || !re.test(userName)}
                                        >
                                            Send Payment </Button>
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

export default MetamaskError;