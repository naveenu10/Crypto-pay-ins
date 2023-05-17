import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';
import { useGlobalContext } from '../../context/context';
import BackButton from '../../dialogs/BackButton';
import { Layout, MobileContainer } from '../../styles/layout';
import Footer from '../Footer/Footer';
import QrCode from '../QrScan/QrCode';
import '../QrScan/QrScanPage.css';
import { useMetaMask } from 'metamask-react';
import MetamaskError from '../QrScan/MetamaskError';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

function MetaMaskPage() {
    const context = useGlobalContext();
    const [userName, setUserName] = useState('laxmi@gmail.com')
    const [openCloseDialog, setOpenCloseDialog] = useState(false)
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate();
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    console.log(status, "status", connect, "connect", account, "account", chainId, "chainId", ethereum, "ethereum")
    const [chainid, setChainId] = useState(0)
    const onContinue = () => {
        // navigate('/Metamask')
        // metamaskIntegration()
    }

    let coinName = context.state.selectedCoin;


    const Completionist = () => <span>You are good to go!</span>;
    const renderer = ({ minutes, seconds, completed }: { minutes: any, seconds: any, completed: any }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    const metamaskIntegration = () => {
        console.log('first')
        if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

        if (status === "unavailable") return <div>MetaMask not available </div>

        // if (status === "notConnected") return <button onClick={connect}>Open Metamask</button>

        if (status === "connecting") return <div>Connecting...</div>

        // if (status === "connected") return <div>Connected account {account} on chain ID {chainId}</div>

        return null;
    }

    function switchChain(chainId: any): void {
        setChainId(chainId)
        console.log(chainId, "chainID")
    }

    useEffect(() => {
        switchChain(chainId)
    }, [chainId])

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
                                                    <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>{coinName}</span>
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
                                        {status === "notConnected" &&
                                            <Button
                                                className='continue'
                                                variant='contained'
                                                onClick={connect}
                                                disabled={!userName || !re.test(userName)}
                                            >
                                                Open MetaMask
                                            </Button>
                                        }
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
                {status === "connected" && <MetamaskError />}
            </MobileContainer >
        </Layout >
    )
}

export default MetaMaskPage;