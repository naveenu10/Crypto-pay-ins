// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { AppBar, Box, Button, Container, IconButton, InputAdornment, TextField, Toolbar, FormControl, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import React from "react";
// import { useNavigate } from 'react-router';
// import { Layout, MobileContainer } from '../../styles/layout';
// import ScanCopyTab from './ScanCopyTab';
// import Footer from '../Footer/Footer';

// const useStyles = makeStyles((theme) => ({
//     mainDiv: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//     },
//     timeLeft: {
//         fontFamily: 'Inter',
//         fontStyle: 'normal',
//         marginTop: '16px',
//         fontSize: '14px',
//         fontWeight: 500,
//         letterSpacing: '0.06em',
//         lineHeight: '17px',
//         color: '#000000',
//     },
//     selectWallet: {
//         marginTop: '57px',
//         fontSize: '20px',
//         color: '#2C1E66',
//         fontWeight: 500,
//         lineHeight: '24px',
//     },
//     metaMask: {
//         display: 'flex',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         marginTop: '73px',
//         background: '#FFFFFF',
//         boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.2)',
//         borderRadius: '24px',
//         width: '360px',
//         height: '104px',
//         textAlign: 'center',
//     },
//     otherWallets: {
//         display: 'flex',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         marginTop: '16px',
//         background: '#FFFFFF',
//         boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.2)',
//         borderRadius: '24px',
//         width: '360px',
//         height: '104px',
//         textAlign: 'center',
//     },
//     WalletsText: {
//         height: '56px',
//         width: '56px',
//         display: 'flex',
//         alignItems: 'center',
//         color: '#000000',
//     },

//     WalletSvG: {
//         // marginTop: 'auto',
//         height: '56px',
//         width: '56px',
//         display: 'flex',
//         alignItems: 'initial',
//         color: '#000000',
//     },
//     MetaMaskText: {
//         fontSize: '20px',
//         fontWeight: 400,
//         fontFamily: 'Inter',
//     },
//     btnDiv: {
//         marginTop: '8px'
//     },
//     btn: {
//         width: '325px',
//         height: '55px',
//         fontSize: '20px',
//         weight: '700',
//         fontFamily: 'Inter',
//         lineHeight: '28.08px',
//         textTransform: 'inherit'
//     },
//     cancelbtn: {
//         width: '325px',
//         height: '55px',
//         fontSize: '20px',
//         weight: '700',
//         lineHeight: '28.08px',
//         fontFamily: 'Inter',
//     },
//     rightArrow: {
//         width: "28px", height: "40px"
//     },
//     cancelDiv: {
//         marginTop: "20px"
//     },
//     QrDiv: {
//         height: '388px',
//         width: '360px',
//         border: '1px solid white',
//         marginTop: '8px',
//         borderRadius: '24px',
//         background: '#FFFFFF',
//         boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.2)',
//         textAlign: 'center',
//     },

//     btnTopText: {
//         marginTop: '66px',
//         fontSize: '14px',
//         color: "rgba(0, 0, 0, 0.5)",
//         lineHeight: '18px',
//         letterSpacing: '0.09em',
//         fontWeight: 400,
//         marginLeft: '20px'
//     },
//     circle: {
//         display: 'inline-block',
//         textAlign: 'center',
//         border: '2px solid blue',
//         borderRadius: '50%',
//         width: '0.9em',
//         height: '0.9em',
//         lineHeight: '1em',
//         margin: 0,
//         color: '#FFFFFF',
//         backgroundColor: 'blue'

//     },


//     input: {
//         border: '1px solid #ccc',
//         padding: '5px'
//     },

//     img: {
//         border: '1px solid #ccc',
//         verticalAlign: 'middle',
//         marginLeft: '-20px'
//     },

//     span: {
//         display: 'inline - block',
//         border: '1px solid #ccc',
//         padding: '5px'
//     },
//     addressField: {

//     },
//     AmountField: {

//     },

// }));

// const Copy = () => {

//     const navigate = useNavigate();
//     const classes = useStyles();

//     const [scannerOpen, setScannerOpen] = React.useState(false);

//     const onBackbtn = () => {
//         navigate('/')
//     }


//     return (

//         <Layout>
//             <MobileContainer>
//                 {!scannerOpen && <section className='media'>
//                     <Box sx={{ flexGrow: 1 }}>
//                         <AppBar position="static" style={{ backgroundColor: '#279FFE', boxShadow: 'none' }}>
//                             <Toolbar style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', paddingLeft: '22px' }}>
//                                 <div style={{ textAlign: 'left' }}>
//                                     <IconButton
//                                         size="large"
//                                         edge="start"
//                                         color="inherit"
//                                         aria-label="menu"
//                                         sx={{
//                                             mr: 2,
//                                             border: '1px solid',
//                                             borderRadius: '20%',
//                                             padding: '5px',
//                                             marginLeft: '-8px'
//                                         }}
//                                         onClick={onBackbtn}
//                                     >
//                                         <ArrowBackIosNewIcon />
//                                     </IconButton>
//                                 </div>
//                                 <div style={{ textAlign: 'right' }}>
//                                     <Typography variant="h5" component="h3" style={{
//                                         textTransform: 'capitalize',
//                                         fontFamily: 'Inter',
//                                         fontStyle: 'normal',
//                                         fontWeight: '700',
//                                         fontSize: '20px',
//                                         lineHeight: '24px',
//                                         textAlign: 'center',
//                                         color: '#FFFFFF',
//                                         letterSpacing: '0.05rem'
//                                     }}>Cryptogames</Typography>
//                                 </div>
//                                 <div style={{ width: "30px", height: '30px' }}>
//                                 </div>
//                             </Toolbar>
//                         </AppBar>
//                     </Box>
//                     <Container maxWidth="xl">
//                         <div className={classes.mainDiv}>
//                             <div style={{ marginTop: '16px' }}>
//                                 <span className={classes.timeLeft}>Time Left: 10:40 mins</span>
//                             </div>
//                             <div style={{ marginTop: '24px' }}>
//                                 <span className={classes.selectWallet}>Complete Payment</span>
//                             </div>
//                             <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
//                                 <ScanCopyTab />
//                             </div>

//                             <div className={classes.QrDiv} >
//                                 <Container>
//                                     <div style={{ marginTop: '16px' }}>
//                                         <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>ETH</span>
//                                     </div>
//                                     <div style={{ marginTop: '4px', color: 'blue', textDecoration: 'underline' }}>
//                                         <span style={{ fontSize: '12px' }}>+ Network fee <span className={classes.circle}>i</span> </span>
//                                     </div>
//                                     <div style={{ marginTop: '12px' }}>
//                                         <span style={{ fontSize: '12px', fontWeight: 400 }}>
//                                             Copy-paste below details to your wallet and complete the payment
//                                         </span>
//                                     </div>

//                                     <div style={{ marginTop: '35px' }}>
//                                         <div style={{ fontSize: '12px', fontWeight: 400, display: 'flex', marginLeft: '10px' }}>Send to this address</div>
//                                         <Box sx={{ minWidth: 120, display: "flex" }}>
//                                             <FormControl sx={{ m: 1, borderRadius: "4px", width: "95%" }}>
//                                                 <TextField
//                                                     style={{}}
//                                                     InputProps={{
//                                                         sx: {
//                                                             color: "#2C1E66",
//                                                             height: 35
//                                                         },
//                                                         endAdornment: (
//                                                             <div
//                                                                 style={{}}>
//                                                                 <InputAdornment position="end">
//                                                                     <Button style={{ padding: '9px', marginRight: '-14px', minWidth: '0px', color: '#808080', boxSizing: 'border-box', backgroundColor: '#D6D6D6' }} >
//                                                                         <img
//                                                                             src='https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg' />
//                                                                     </Button>
//                                                                 </InputAdornment>
//                                                             </div>
//                                                         ),
//                                                         disableUnderline: true,
//                                                     }}
//                                                 />
//                                             </FormControl>
//                                         </Box>
//                                     </div>


//                                     <div style={{ marginTop: '5px' }}>
//                                         <div style={{ fontSize: '12px', fontWeight: 400, display: 'flex', marginLeft: '10px' }}>Amount (excludes network fee)</div>
//                                         <Box sx={{ minWidth: 120, display: "flex" }}>
//                                             <FormControl sx={{ m: 1, borderRadius: "4px", width: "95%" }}>
//                                                 <TextField

//                                                     InputProps={{
//                                                         sx: {
//                                                             color: "#2C1E66",
//                                                             height: 35
//                                                         },
//                                                         endAdornment: (
//                                                             <InputAdornment position="end">
//                                                                 <Button style={{ padding: '9px', marginRight: '-14px', minWidth: '0px', backgroundColor: '#D6D6D6' }} >
//                                                                     <img src='https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg' />
//                                                                 </Button>
//                                                             </InputAdornment>
//                                                         ),
//                                                         disableUnderline: true,
//                                                     }}
//                                                 />
//                                             </FormControl>
//                                         </Box>
//                                     </div>

//                                     <div style={{ marginTop: '48px' }}>
//                                         <span style={{ fontSize: '12px' }}>
//                                             Only send ETH using the Ethereum network, else the funds may get lost
//                                         </span>
//                                     </div>
//                                 </Container>
//                             </div>
//                             <div className={classes.btnTopText}>
//                                 <p>
//                                     Click the below button once you have triggered the transaction
//                                 </p>
//                             </div>

//                             <div>
//                                 <Button variant='contained' style={{
//                                     width: '325px',
//                                     height: '55px',
//                                     fontSize: '18px',
//                                     fontFamily: 'Inter',
//                                     fontWeight: 700,
//                                     lineHeight: '28.08px',
//                                     textTransform: 'initial',
//                                 }}>I have Paid</Button>
//                             </div>
//                             <div className={classes.cancelDiv}>
//                                 <Button
//                                     style={{
//                                         width: '325px',
//                                         color: '#2C1E66',
//                                         height: '55px',
//                                         fontSize: '18px',
//                                         fontFamily: 'Inter',
//                                         fontWeight: 800,
//                                         lineHeight: '28.08px',
//                                         textTransform: 'initial',
//                                     }}>Cancel</Button>
//                             </div>
//                         </div>
//                     </Container>
//                 </section>}
//                 <div style={{ justifyContent: "flex-end" }}>
//                     <Footer />
//                 </div>
//             </MobileContainer>
//         </Layout >
//     );
// }

// export default Copy;





import React, { useEffect, useState } from 'react'
import { Layout, MobileContainer } from '../../styles/layout'
import { AppBar, Box, Button, Container, IconButton, InputAdornment, TextField, Toolbar, FormControl, Typography } from '@mui/material';
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

function QrCopy() {
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
                                <Container maxWidth="lg">
                                    <Typography style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '16px', lineHeight: '30px', textAlign: 'center', letterSpacing: '0.06em', color: '#000000', fontFamily: 'Inter', }}>
                                        {/* Time left 15:00 mins */}
                                        Time Left: {" "}
                                        <Countdown date={Date.now() + 900000} renderer={renderer} /> mins
                                    </Typography>
                                    <div className="choosecurrency">Complete Payment</div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <div style={{ marginTop: '20px', display: 'flex' }}>
                                            <ScanCopyTab />
                                        </div>
                                        <div className='qrCodeDiv'>
                                            <Container>
                                                <div style={{ marginTop: '16px' }}>
                                                    <span style={{ fontSize: "24px" }}>0.05446</span><span style={{ fontSize: "12px", marginLeft: '4px' }}>ETH</span>
                                                </div>
                                                <div style={{ marginTop: '4px', color: 'blue', textDecoration: 'underline' }}>
                                                    <span  onClick={() => setOpenNetworkDialog(true)} style={{ fontSize: '12px' }}>+ Network fee <span className='circle'>i</span> </span>
                                                </div>
                                                <div style={{ marginTop: '12px' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: 400 }}>
                                                        Copy-paste below details to your wallet and complete the payment
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: '35px' }}>
                                                    <div style={{ fontSize: '12px', fontWeight: 400, display: 'flex', marginLeft: '10px' }}>Send to this address</div>
                                                    <Box sx={{ minWidth: 120, display: "flex" }}>
                                                        <FormControl sx={{ m: 1, borderRadius: "4px", width: "95%" }}>
                                                            <TextField
                                                                style={{}}
                                                                InputProps={{
                                                                    sx: {
                                                                        color: "#2C1E66",
                                                                        height: 35
                                                                    },
                                                                    endAdornment: (
                                                                        <div
                                                                            style={{}}>
                                                                            <InputAdornment position="end">
                                                                                <Button style={{ padding: '9px', marginRight: '-14px', minWidth: '0px', color: '#808080', boxSizing: 'border-box', backgroundColor: '#D6D6D6' }} >
                                                                                    <img
                                                                                        src='https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg' />
                                                                                </Button>
                                                                            </InputAdornment>
                                                                        </div>
                                                                    ),
                                                                    disableUnderline: true,
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </Box>
                                                </div>


                                                <div style={{ marginTop: '5px' }}>
                                                    <div style={{ fontSize: '12px', fontWeight: 400, display: 'flex', marginLeft: '10px' }}>Amount (excludes network fee)</div>
                                                    <Box sx={{ minWidth: 120, display: "flex" }}>
                                                        <FormControl sx={{ m: 1, borderRadius: "4px", width: "95%" }}>
                                                            <TextField

                                                                InputProps={{
                                                                    sx: {
                                                                        color: "#2C1E66",
                                                                        height: 35
                                                                    },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <Button style={{ padding: '9px', marginRight: '-14px', minWidth: '0px', backgroundColor: '#D6D6D6' }} >
                                                                                <img src='https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg' />
                                                                            </Button>
                                                                        </InputAdornment>
                                                                    ),
                                                                    disableUnderline: true,
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </Box>
                                                </div>

                                                <div style={{ marginTop: '48px' }}>
                                                    <span style={{ fontSize: '12px' }}>
                                                        Only send ETH using the Ethereum network, else the funds may get lost
                                                    </span>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '50px', fontSize: '13px', fontWeight: 500, fontFamily: 'Inter', lineHeight: '14.52px', marginLeft: '20px' }}>
                                        <span>Click the below button once you have triggered the transaction</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', }}>
                                        <Button
                                            className='continue'
                                            variant='contained'
                                            onClick={onIhavePaid}
                                            disabled={!userName || !re.test(userName)}
                                        >
                                            I have Paid
                                        </Button>
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
                    </section >
                    <div style={{ justifyContent: "flex-end" }}>
                        <Footer />
                    </div>
                </div >
            </MobileContainer >
        </Layout >
    )
}

export default QrCopy;