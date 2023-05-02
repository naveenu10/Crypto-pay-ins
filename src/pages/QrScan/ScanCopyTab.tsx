// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
// import * as React from 'react';
// import QrScan from '../../assets/images/NIcons/QrScan';
// import { Layout, MobileContainer } from '../../styles/layout';


// function ScanCopyTab() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//     };

//     return (
//         <Layout>
//             <MobileContainer>
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     aria-label="icon position tabs example"
//                     sx={{ width: '176px', height: '37px' }}
//                 >
//                     <Tab icon={<img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg" />} iconPosition="start" label="Scan" />
//                     <Tab icon={< img src="https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg" />} iconPosition="start" label="Copy" />
//                 </Tabs>
//             </MobileContainer>
//         </Layout>
//     );
// }

// export default ScanCopyTab;

// import { Button, Grid } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';


// const useStyles = makeStyles((theme) => ({
//     navBar: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'space-evenly',
//         marginBottom: '5%',
//         marginTop: '5%',
//     },
//     navBarButtons: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         width: '176px',
//     },
// }));

// interface TabData {
//     id: number;
//     name: string;
//     path: string;
//     isActive: boolean;
//     iconUrl: string; // new property for icon URL
// }

// const initData: TabData[] = [
//     {
//         id: 1,
//         name: 'Scan',
//         path: `/QrScan`,
//         isActive: true,
//         iconUrl: 'https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg'
//     },
//     {
//         id: 2,
//         name: 'Copy',
//         path: `/QrScan/Copy`,
//         isActive: false,
//         iconUrl: 'https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg'
//     },
// ];

// const ScanCopyTab = (): JSX.Element => {
//     const classes = useStyles();
//     const [tabs, setTabs] = useState<TabData[]>(initData);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleTabClick = (tab: TabData): void => {
//         navigate(tab.path);
//         setTabs((current) => {
//             return current.map((cur) => {
//                 if (cur.id === tab.id) {
//                     return { ...cur, isActive: true };
//                 }
//                 return { ...cur, isActive: false };
//             });
//         });
//     };

//     return (
//         <Grid item xs={12} sm={6} md={3} className={classes.navBar}>
//             {tabs.map((tab) => {
//                 return (
//                     <Button
//                         className={classes.navBarButtons}
//                         key={tab.id}
//                         variant={tab.path === location.pathname ? 'contained' : 'outlined'}
//                         onClick={() => handleTabClick(tab)}
//                     >
//                         <img src={tab.iconUrl} alt={tab.name} />
//                         {tab.name}
//                     </Button>

//                 );
//             })}
//         </Grid>
//     );
// };

// export default ScanCopyTab;

import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: '5%',
        marginTop: '5%',
    },
    navBarButtons: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '25%',
        width: '176px',
        backgroundColor: '#FFFFFF',
        '&.active': {
            backgroundColor: '#D6D6D6',
        },
    },
    icon: {
        marginRight:1,
    },
}));

interface TabData {
    id: number;
    name: string;
    path: string;
    isActive: boolean;
    iconUrl: string;
}

const initData: TabData[] = [
    {
        id: 1,
        name: 'Scan',
        path: `/QrScan`,
        isActive: true,
        iconUrl: 'https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg',
    },
    {
        id: 2,
        name: 'Copy',
        path: `/QrScan/Copy`,
        isActive: false,
        iconUrl: 'https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg',
    },
];

const ScanCopyTab = (): JSX.Element => {
    const classes = useStyles();
    const [tabs, setTabs] = useState<TabData[]>(initData);
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabClick = (tab: TabData): void => {
        navigate(tab.path);
        setTabs((current) => {
            return current.map((cur) => {
                if (cur.id === tab.id) {
                    return { ...cur, isActive: true };
                }
                return { ...cur, isActive: false };
            });
        });
    };

    return (
        <Grid item xs={12} sm={6} md={3} className={classes.navBar}>
            {tabs.map((tab) => {
                const isActive = tab.path === location.pathname;
                const buttonClasses = `${classes.navBarButtons} ${isActive ? 'active' : ''}`;
                return (
                    <Button
                        className={buttonClasses}
                        key={tab.id}
                        onClick={() => handleTabClick(tab)}
                    >
                        <img src={tab.iconUrl} alt={tab.name} className={classes.icon} />
                        {tab.name}
                    </Button>
                );
            })}
        </Grid>
    );
};

export default ScanCopyTab;
