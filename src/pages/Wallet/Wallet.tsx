import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from "react";
import { useNavigate } from 'react-router';
import { Layout, MobileContainer } from '../../styles/layout';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1'
import Footer from '../Footer/Footer';


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
        marginTop: '260px'
    },
    btn: {
        width: '325px',
        height: '55px',
        fontSize: '20px',
        weight: '700',
        fontFamily: 'Inter',
        lineHeight: '28.08px',
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
    }
}));

const Wallet = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [scannerOpen, setScannerOpen] = React.useState(false);

    const onBackbtn = () => {
        navigate('/')
    }
    const handleProceed = () => {
        navigate('/QrScanPage')


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
                        <Container>
                            <div className={classes.mainDiv}>
                                <div style={{ marginTop: '16px' }}>
                                    <span className={classes.timeLeft}>Time Left: 10:40 mins</span>
                                </div>
                                <div style={{ marginTop: '24px' }}>
                                    <span className={classes.selectWallet}>Select Wallet</span>
                                </div>
                                <div className={classes.metaMask}>
                                    <span className={classes.WalletsText}>

                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="metamask logo" />
                                    </span>
                                    <span className={classes.MetaMaskText}>MetaMask</span>
                                    <span className={classes.rightArrow}>
                                        <ChevronRightIcon style={{ fontSize: '40px' }} />
                                    </span>
                                </div>
                                <div className={classes.otherWallets}>
                                    <div className={classes.WalletSvG}>
                                        <img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683539144/bitcoin-wallet_1_2_s3dfsh.svg" alt="metamask logo" />

                                    </div>
                                    <span className={classes.MetaMaskText}>Other&nbsp;Wallets</span>
                                    <span className={classes.rightArrow}>
                                        <ChevronRightIcon style={{ fontSize: '40px' }} />
                                    </span>
                                </div>

                                <div>
                                    <Button
                                        onClick={handleProceed}
                                        variant='contained' style={{
                                            width: '325px',
                                            height: '55px',
                                            fontSize: '18px',
                                            fontFamily: 'Inter',
                                            fontWeight: 700,
                                            lineHeight: '28.08px',
                                            textTransform: 'initial',
                                            marginTop: '210px'
                                        }}>I have Paid</Button>
                                </div>
                                <div className={classes.cancelDiv}>
                                    <Button
                                        style={{
                                            width: '325px',
                                            color: '#2C1E66',
                                            height: '55px',
                                            fontSize: '18px',
                                            fontFamily: 'Inter',
                                            fontWeight: 800,
                                            lineHeight: '28.08px',
                                            textTransform: 'initial',
                                        }}>Cancel</Button>
                                </div>
                            </div>
                        </Container>
                        <div style={{ justifyContent: "flex-end" }}>
                            <Footer />
                        </div>
                    </section>
                </div>

            </MobileContainer>
        </Layout>
    );
}

export default Wallet;