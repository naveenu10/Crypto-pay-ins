import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '5%',
        marginTop: '5%',
        width: '94%',
    },
    navBarButtons: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        width: '176px',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        '&.active': {
            backgroundColor: '#D6D6D6',
        },
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
        path: `/QrCopy`,
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
                        <span>
                            <img src={tab.iconUrl} alt={tab.name}  />
                        </span>
                        <span style={{ marginLeft: '6px' }}>
                            {tab.name}
                        </span>
                    </Button>
                );
            })}
        </Grid>
    );
};

export default ScanCopyTab;
