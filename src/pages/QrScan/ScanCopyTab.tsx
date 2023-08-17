import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: any) => ({
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    // marginBottom: "5px",
    // marginTop: "5%",
    width: "100%",
  },
  navBarButtons: {
    display: "flex",
    alignItems: "center",
    borderRadius: "12px!important",
    width: "176px",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    color: "#2C1E66",
    "&.active": {
      backgroundColor: "#D6D6D6",
      color: "#2C1E66",
      '&:hover': {
          backgroundColor: '#D6D6D6',
          color: "#2C1E66",
      },
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
    name: "Scan",
    path: `/QrScan`,
    isActive: true,
    iconUrl:
      "https://res.cloudinary.com/dolpotacg/image/upload/v1683011634/Vector_mqrntq.svg",
  },
  {
    id: 2,
    name: "Copy",
    path: `/QrCopy`,
    isActive: false,
    iconUrl:
      "https://res.cloudinary.com/dolpotacg/image/upload/v1683014498/Vector_2_aghej8.svg",
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
    <Grid className={classes.navBar}>
      {tabs.map((tab) => {
        const isActive = tab.path === location.pathname;
        const buttonClasses = `${classes.navBarButtons} ${
          isActive ? "active" : ""
        }`;
        return (
          <Button
            className={buttonClasses}
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            style={{margin:5, color: "#2C1E66"}}
          >
            <span>
              <img src={tab.iconUrl} alt={tab.name} />
            </span>
            <span style={{ marginLeft: "6px"}}>{tab.name}</span>
          </Button>
        );
      })}
    </Grid>
  );
};

export default ScanCopyTab;
