import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from "react";
import { useNavigate } from 'react-router';
import NivapayLogo1 from '../../assets/images/NIcons/NivapyLogo1';
import Footer from "../../components/footer";
import { Layout, MobileContainer } from '../../styles/layout';
import QrScan from '../../assets/images/NIcons/QrScan';
import ScanCopyTab from './ScanCopyTab';
import QrCode from './QrCode';

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    timeLeft: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        marginTop: '16px',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        lineHeight: '17px',
        color: '#000000',
    },
    selectWallet: {
        marginTop: '57px',
        fontSize: '20px',
        color: '#2C1E66',
        fontWeight: 500,
        lineHeight: '24px',
    },
    metaMask: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '73px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '24px',
        width: '360px',
        height: '104px',
        textAlign: 'center',
    },
    otherWallets: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '16px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '24px',
        width: '360px',
        height: '104px',
        textAlign: 'center',
    },
    WalletsText: {
        height: '56px',
        width: '56px',
        display: 'flex',
        alignItems: 'center',
        color: '#000000',
    },

    WalletSvG: {
        // marginTop: 'auto',
        height: '56px',
        width: '56px',
        display: 'flex',
        alignItems: 'initial',
        color: '#000000',
    },
    MetaMaskText: {
        fontSize: '20px',
        fontWeight: 400,
        fontFamily: 'Inter',
    },
    btnDiv: {
        marginTop: '8px'
    },
    btn: {
        width: '325px',
        height: '55px',
        fontSize: '20px',
        weight: '700',
        fontFamily: 'Inter',
        lineHeight: '28.08px',
        textTransform: 'inherit'
    },
    cancelbtn: {
        width: '325px',
        height: '55px',
        fontSize: '20px',
        weight: '700',
        lineHeight: '28.08px',
        fontFamily: 'Inter',
    },
    rightArrow: {
        width: "28px", height: "40px"
    },
    cancelDiv: {
        marginTop: "20px"
    },
    QrDiv: {
        height: '388px',
        width: '360px',
        border: '1px solid white',
        marginTop: '8px',
        borderRadius: '24px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
    },

    btnTopText: {
        marginTop: '66px',
        fontSize: '14px',
        color: "rgba(0, 0, 0, 0.5)",
        lineHeight: '18px',
        letterSpacing: '0.09em',
        fontWeight: 400,
        marginLeft: '20px'
    },
    circle: {
        display: 'inline-block',
        textAlign: 'center',
        border: '2px solid blue',
        borderRadius: '50%',
        width: '0.9em',
        height: '0.9em',
        lineHeight: '1em',
        margin: 0,
        color: '#FFFFFF',
        backgroundColor: 'blue'

    }
}));

const Home = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [scannerOpen, setScannerOpen] = React.useState(false);

    const onBackbtn = () => {
        navigate('/')
    }


    return (

        <Layout>
            <MobileContainer>
                {!scannerOpen && <section className='media'>
                    <Box sx={{ flexGrow: 1 }}>
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
                                        onClick={onBackbtn}
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
                    </Box>
                    <Container maxWidth="xl">
                        <div className={classes.mainDiv}>
                            <div style={{ marginTop: '16px' }}>
                                <span className={classes.timeLeft}>Time Left: 10:40 mins</span>
                            </div>
                            <div style={{ marginTop: '24px' }}>
                                <span className={classes.selectWallet}>Complete Payment</span>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <ScanCopyTab />
                            </div>

                            <div className={classes.QrDiv} >
                                <Container>
                                    <div style={{ marginTop: '16px' }}>
                                        <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>ETH</span>
                                    </div>
                                    <div style={{ marginTop: '4px', color: 'blue', textDecoration: 'underline' }}>
                                        <span style={{ fontSize: '12px' }}>+ Network fee <span className={classes.circle}>i</span> </span>
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
                            <div className={classes.btnTopText}>
                                <p>
                                    Click the below button once you have triggered the transaction
                                </p>
                            </div>

                            <div className={classes.btnDiv}>
                                <Button variant="contained"
                                    className={classes.btn}
                                    sx={{ textTransform: 'inherit' }}
                                >I have Paid</Button>
                            </div>
                            <div className={classes.cancelDiv}>
                                <Button className={classes.cancelbtn}>Cancel</Button>
                            </div>
                        </div>
                    </Container>
                    <Footer />
                </section>}
                {/* )} */}
            </MobileContainer>
        </Layout >
    );
}

export default Home;