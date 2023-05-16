import InfoIcon from '@mui/icons-material/Info';
import { Button, Divider, Paper, Stack, Typography, styled } from '@mui/material';
import * as React from 'react';
import { useGlobalContext } from '../../context/context';
import InfoModal from '../../dialogs/InfoModal';
import './ImageList.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function StandardImageList(props: { showmask: any; setShowMask: any; showEth: any; setShowEth: any, selectedCoinName: any, setselectedCoinName: any }) {
    const { showmask, setShowMask, showEth, setShowEth, selectedCoinName, setselectedCoinName } = props;
    const [selectedCoin, setSelectedCoin] = React.useState('');
    const [selectedInd, setselectedInd] = React.useState(null);
    const [coinImage, setCoinImage] = React.useState('');
    const [currencyList, setCurrencyList] = React.useState<any[]>([])
    const [openInfo, setOpenInfo] = React.useState(false)
    const [loadData, setLoadData] = React.useState(false);
    const context = useGlobalContext()

    function selectCoin(i: any, item: any) {
        if (item) {
            console.log(item)
            setselectedInd(i)
            setSelectedCoin(item.heading)
            context.dispatch({
                type: 'UPDATE_NETWORK',
                payload: item.heading
            })
        }
    }

    return (
        <div >
            <Stack direction={"row"} sx={{ justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '17px', fontFamily: 'Inter', color: 'rgba(0, 0, 0, 0.75);' }}>Currency & <span style={{
                    background: 'rgba(214, 214, 214, 0.5)',
                    borderRadius: '10%', padding: '3px', color: '#595959'
                }}>Network</span></Typography>
                <Typography
                    sx={{ fontSize: '17px', display: 'flex', fontFamily: 'Inter', color: 'rgba(0, 0, 0, 0.75);' }}>
                    You pay<Button style={{ color: 'rgba(0, 0, 0, 0.5)', padding: '0px', minWidth: '0px' }}
                        onClick={() => setOpenInfo(true)}>
                        <InfoIcon /></Button></Typography>
            </Stack>
            <Divider style={{ marginTop: '1%' }} />
            <div style={{ maxHeight: '430px', overflowY: 'scroll' }}>
                {itemData.map((item, i) => (
                    <Stack direction={'row'} sx={{
                        justifyContent: "space-around",
                        // backgroundColor: selectedInd == i || context.state.paymentRecipt.crypto == item.coin ? "#ADCFFF" : "", 
                        backgroundColor: selectedInd == i ? '#E5F0FF' : "",
                        borderRadius: '10px', padding: '4px'
                    }}
                        // onClick={() => ShowMetamask(i, item)}
                        onClick={() => selectCoin(i, item)}
                    >

                        <div style={{ width: "57%" }}>
                            <div style={{
                                display: "flex", justifyContent: "start", alignItems: "start", margin: '5px'
                            }}>
                                <div style={{ display: "flex", gap: ".5rem" }}>
                                    <div style={{ paddingTop: '5px' }}><img src={item.img} alt="img" width={28} height={28} /></div>
                                    <div>
                                        <div style={{ display: 'flex', padding: '5px' }}>
                                            <div style={{ color: '#2C1E66', fontWeight: '600', fontSize: '14px' }}>{item.heading}</div> <span style={{ paddingLeft: '7px', color: 'rgba(0, 0, 0, 0.5)', fontSize: '14px', fontWeight: 400 }}>{item.name}</span>
                                        </div>
                                        <Button variant="contained" sx={{
                                            fontWeight: 400,
                                            fontSize: '10px',
                                            lineHeight: '150%',
                                            background: 'rgba(214, 214, 214, 0.5)',
                                            borderRadius: '4px',
                                            padding: '2px 8px',
                                            color: '#595959',
                                            boxShadow: 'none',
                                            textTransform: 'capitalize'
                                        }}>{item.title}</Button>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div style={{ width: "50%" }}>

                            <div style={{ display: "flex", justifyContent: 'end', margin: '5px' }} >
                                <div>
                                    <div style={{ color: '#21146B', fontSize: '16px', fontWeight: '600', padding: '2px', textAlign: "end", lineHeight: '48px' }}>{item.amount}</div>
                                    {/* <div style={{ color: '#808080', fontSize: '14px', fontWeight: '500', padding: '5px', textAlign: "end" }}>{item.fiat}</div> */}
                                </div>
                            </div>
                        </div>
                    </Stack>
                ))}
            </div>
            <Divider />
            {openInfo &&
                <InfoModal openInfo={openInfo} setOpenInfo={setOpenInfo} />
            }
        </div >
    );
}

const itemData = [
    {
        img: 'https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673250859/bitcoin_hkrwcs.svg',
        heading: "BTC",
        title: 'Bitcoin',
        name: 'Bitcoin',
        bgColor: "",
        amount: 0.1233456,
        fiat: "~USD 28.00",
        currentCurrency: "btc",
        availableNetworks: ["Bitcoin"],
    },
    {
        img: 'https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673258424/Ellipse_2_ya5eea.svg',
        heading: "LTC",
        title: 'Litecoin',
        name: 'Litecoin',
        bgColor: "",
        amount: 0.2334,
        fiat: "~USD 18.00",
        currentCurrency: "ltc",
        availableNetworks: ["Litecoin"],

    },
    {
        img: 'https://res.cloudinary.com/dhhxyg3tq/image/upload/v1675225099/Eth_sdkkcj.png',
        heading: "ETH",
        title: 'Ethereum',
        name: 'Ether',
        bgColor: "",
        amount: 0.334456,
        fiat: "~USD 22.00",
        currentCurrency: "eth",
        availableNetworks: ["Ethereum"],

    },
    {
        img: 'https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673258770/BitcoinCash_athemu.svg',
        heading: "BCH",
        title: 'Bitcoin Cash',
        name: 'Bitcoin Cash',
        bgColor: "",
        amount: 0.12334,
        fiat: "~USD 3.00",
        currentCurrency: "bch",
        availableNetworks: ["Bitcoin Cash"],

    },
    {
        img: 'https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673258953/Dogecoin_w718kx.svg',
        heading: "DOGE",
        title: 'Dogecoin',
        name: 'Dogecoin',
        bgColor: "",
        amount: 0.1,
        fiat: "~USD 98.00",
        currentCurrency: 'doge',
        availableNetworks: ["Dogecoin"],

    },
    {
        img: "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673505288/tether-usdt-logo_yxfrk7.png",
        heading: "USDT",
        title: 'Usdt',
        name: 'Tether',
        bgColor: "",
        amount: 0.12,
        fiat: "~USD 98.00",
        currentCurrency: 'doge',
        availableNetworks: ["Dogecoin"],
    },
    {
        img: "https://res.cloudinary.com/dhhxyg3tq/image/upload/v1673505004/usd-coin-usdc-logo_h37q0s.png",
        heading: "USDC",
        title: 'Usdc',
        name: 'Usdc',
        bgColor: "",
        amount: 0.12,
        fiat: "~USD 98.00",
        currentCurrency: 'doge',
        availableNetworks: ["Dogecoin"],
    },
];