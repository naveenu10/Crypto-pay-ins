import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Button, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import Countdown, { zeroPad } from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';
import SuccessLogo from '../../assets/images/NIcons/SuccessLogo';
import { Layout, MobileContainer } from '../../styles/layout';
import Footer from '../Footer/Footer';
import './LowBalSuccess.css';


function LowBalSuccess() {
    const navigate = useNavigate()
    const backtoCrypto = () => {
        navigate('/failure')
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
                                        <SuccessLogo />
                                    </div>
                                </div>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 600, fontSize: '24px', lineHeight: '29px', padding: '1rem', display: 'flex', color: '#2C1E66', justifyContent: 'center' }}>
                                    Success
                                </Typography>
                                <Typography style={{
                                    fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '11px', lineHeight: '15px', display: 'flex', alignItems: 'center', textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'
                                }}>
                                    We have received a higher amount than anticipated. Please contact the merchant to reconcile.
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
                                        <Typography className='currency'>Order Amount (crypto)</Typography>
                                        <Typography className='info'>0.003334 BTC</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Destination Wallet</Typography>
                                        <Typography className='info'>37UPTD8u...mRgT</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Received amount (crypto)</Typography>
                                        <Typography className='info1'>0.003367 BTC</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'space-between', padding: '6px' }}>
                                        <Typography className='currency'>Transaction Hash</Typography>
                                        <Typography className='info' style={{ gap: '5px' }}> <img
                                            src='https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683182823/ph_copy_lnoksz.svg' alt='copyimage' />
                                            <img src='https://res.cloudinary.com/dhhxyg3tq/image/upload/v1683183469/Icon_lrkziq.svg' alt='redirect' />
                                        </Typography>
                                    </Stack>
                                    <Typography style={{
                                        fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '14px', lineHeight: '17px', letterSpacing: '0.06em', color: 'rgba(0, 0, 0, 0.5)'
                                    }}>
                                        f0478d2b40a35e455ae640ec1b0762df8c46
                                        b975cb19672b63aaf236ad7ca2b9
                                    </Typography>
                                </div>
                                <div style={{ marginTop: '2%' }}>
                                    <Divider />
                                </div>
                                <Typography style={{
                                    fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 500, fontSize: '14px', lineHeight: '17px', textAlign: 'center', letterSpacing: '0.06em', color: '#21146B', marginTop: '15%'
                                }}>
                                    {/* Redirecting in <span style={{ color: '#279FFE' }}>30</span> secs... */}
                                    Redirecting in{" "}
                                    <span style={{ color: "#279FFE" }}>
                                        <Countdown date={Date.now() + 30000} renderer={renderer} />
                                    </span>{" "}
                                    <span>secs...</span>
                                </Typography>
                                <div style={{ display: "flex", justifyContent: 'center', marginTop: '3%' }}>
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
                        <div style={{ justifyContent: "flex-end" }}>
                            <Footer />
                        </div>
                    </section>
                </div>
            </MobileContainer >
        </Layout >
    )
}

export default LowBalSuccess