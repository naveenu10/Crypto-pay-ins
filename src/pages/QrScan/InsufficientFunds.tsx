import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from "react";
import { useNavigate } from 'react-router';
import { Layout, MobileContainer } from '../../styles/layout';
import ScanCopyTab from './ScanCopyTab';

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
        marginTop: '117px'
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
        marginTop: '65px',
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


                            <div className={classes.QrDiv} >
                                <Container>
                                    <div style={{ marginTop: '16px' }}>
                                        <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>ETH</span>
                                    </div>
                                    <div style={{ marginTop: '4px' }}>
                                        <span style={{ fontSize: '12px' }}>+ Network fee </span>
                                    </div>


                                    <div style={{ marginTop: '49px', fontSize: '12px', color: '#FF0000' }}>
                                        <span>Your balance is insufficient</span>
                                    </div>
                                    <div style={{ marginTop: '28px', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ color: '#00000080' }}>MetaMask</div>
                                            <div style={{ color: '#21146B' }}>Connected</div>
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

                                        <span style={{ fontSize: '14px', color: '#21146B' }}>
                                            Disconnect Wallet
                                        </span>
                                    </div>

                                    <div style={{ marginTop: '35px' }}>

                                        <span style={{ fontSize: '12px' }}>
                                            Recommended network fee for fast confirmation:<br /><span style={{ color: '#21146B' }}>64 gwei
                                            </span>
                                        </span>
                                    </div>
                                </Container>
                            </div>


                            <div className={classes.btnDiv}>
                                <Button variant="contained"
                                    className={classes.btn}
                                    sx={{ textTransform: 'inherit' }}
                                >Send Payment</Button>
                            </div>
                            <div className={classes.cancelDiv}>
                                <Button className={classes.cancelbtn}>Cancel</Button>
                            </div>
                        </div>
                    </Container>
                </section>}
            </MobileContainer>
        </Layout >
    );
}

export default Home;