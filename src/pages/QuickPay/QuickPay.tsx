import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import NivapayLogo1 from '../../assets/images/NIcons/NivapayLogo1'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './QuickPay.css'
import StandardImageList from '../ImageList/ImageList';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Layout, MobileContainer } from '../../styles/layout';
import { useGlobalContext } from '../../context/context';
import Countdown, { zeroPad } from 'react-countdown';


function QuickPay() {
    const [showmask, setShowMask] = React.useState(false);
    const [showEth, setShowEth] = useState(false);
    const [selectedCoinName, setselectedCoinName] = useState('');
    const navigate = useNavigate()
    const context = useGlobalContext()

    const onContinue = () => {
        navigate('/wallet')
    }

    const Completionist = () => <span>You are good to go!</span>;
    const renderer = ({ minutes, seconds, completed }: { minutes: any, seconds: any, completed: any }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };


    console.log(context.state.selectedCoin)

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
                        <div style={{ flex: 1, height: '50vh', overflowY: 'auto' }}>
                            <section className='nivapay_ramp'>
                                <Typography style={{ fontStyle: 'normal', fontWeight: 500, fontSize: '16px', lineHeight: '30px', textAlign: 'center', letterSpacing: '0.06em', color: '#000000', fontFamily: 'Inter', padding: '10px' }}>
                                    {/* Time left 15:00 mins */}
                                    Time left: {" "}
                                    <Countdown date={Date.now() + 900000} renderer={renderer} /> mins
                                </Typography>
                                <div style={{ boxSizing: "border-box", position: "relative" }}>
                                    <div className="choosecurrency">Select Currency to Withdraw</div>
                                    <div
                                    // style={{ maxHeight: '430px', overflowY: 'scroll' }}
                                    >
                                        <StandardImageList
                                            showmask={showmask}
                                            setShowMask={setShowMask}
                                            showEth={showEth}
                                            setShowEth={setShowEth}
                                            selectedCoinName={selectedCoinName}
                                            setselectedCoinName={setselectedCoinName}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: "flex", marginTop: "10%" }}>
                                    <Button
                                        variant="contained"
                                        className="continue_btn"
                                        onClick={onContinue}
                                        disabled={!context.state.selectedCoin}
                                    >
                                        {" "}
                                        Continue{" "}
                                    </Button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button className="cancelbtn">
                                        Cancel
                                    </Button>
                                </div>
                            </section>
                        </div>
                        <div style={{ justifyContent: "flex-end" }}>
                            <Footer />
                        </div>
                    </section>
                </div>
            </MobileContainer>
        </Layout>

    )
}

export default QuickPay