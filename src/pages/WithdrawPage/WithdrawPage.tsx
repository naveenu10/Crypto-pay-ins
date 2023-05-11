import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1';
import { useGlobalContext } from '../../context/context';
import BackButton from '../../dialogs/BackButton';
import { Layout, MobileContainer } from '../../styles/layout';
import Footer from '../Footer/Footer';
import './WithdrawPage.css';

function WithdrawPage() {
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
                                <Typography style={{ fontStyle: 'normal', fontWeight: 500, fontSize: '16px', lineHeight: '30px', textAlign: 'center', letterSpacing: '0.06em', color: '#000000', fontFamily: 'Inter', padding: '10px' }}>
                                    {/* Time left 15:00 mins */}
                                    Time left: {" "}
                                    <Countdown date={Date.now() + 900000} renderer={renderer} /> mins
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '18px', lineHeight: '32px', display: 'flex', justifyContent: 'center', color: '#2C1E66', gap: '8px' }}>
                                    User id:
                                    <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 700, fontSize: '18px', lineHeight: '32px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#2C1E66' }}>
                                        daemonx13
                                    </Typography>
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '32px', display: 'flex', color: '#2C1E66', justifyContent: 'center', padding: '10px' }}>
                                    Pay
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 500, fontSize: '24px', lineHeight: '29px', display: 'flex', color: '#2C1E66', justifyContent: 'center', padding: '5px' }}>
                                    USD 100.00
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '32px', display: 'flex', color: '#2C1E66', justifyContent: 'center', padding: '5px' }}>
                                    worth of crypto to
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 700, fontSize: '18px', lineHeight: '32px', display: 'flex', justifyContent: 'center', color: '#2C1E66' }}>
                                    Cryptogames
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, paddingTop: '5rem', fontSize: '16px', lineHeight: '19px', display: 'flex', letterSpacing: '0.06em', color: '#21146B' }}>
                                    <Typography>
                                        Email Address*
                                        <input
                                            className="input-wrap"
                                            name="userName"
                                            style={{ fontSize: '16px', }}
                                            onChange={(e) => { setUserName(e.target.value) }}
                                            value={userName}
                                        />
                                    </Typography>
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '12px', lineHeight: '15px', letterSpacing: '0.06em', color: '#21146B', paddingTop: '0.5rem' }}>
                                    Transaction status updates will be sent to this email address
                                </Typography>
                                <Typography style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '13px', lineHeight: '15px', display: 'flex', alignItems: 'center', letterSpacing: '0.06em', color: 'rgba(0, 0, 0, 0.5)', padding: '0.5rem', marginTop: '3.5rem', flexWrap: 'wrap', gap: '4px' }} component='div'>
                                    By clicking “Continue”, I agree to Nivapay’s <a href='www.goodle.com' style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Terms of Service</a> and <a href='www.goodle.com' style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Privacy Policy.</a>
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        className='continue'
                                        variant='contained'
                                        onClick={onContinue}
                                        disabled={!userName || !re.test(userName)}
                                    >
                                        Continue
                                    </Button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button className="cancelbtn">
                                        Cancel
                                    </Button>
                                </div>
                                <BackButton open={openCloseDialog} setOpen={setOpenCloseDialog} />
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

export default WithdrawPage;