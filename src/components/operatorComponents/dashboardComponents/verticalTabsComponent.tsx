import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: (string|number);
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 300,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        <Tab label="Mission One" {...a11yProps(0)} />
        <Tab label="Mission Two" {...a11yProps(1)} />
        <Tab label="Mission Three" {...a11yProps(2)} />
        <Tab label="Mission Four" {...a11yProps(3)} />
        <Tab label="Mission Five" {...a11yProps(4)} />
        <Tab label="Mission Six" {...a11yProps(5)} />
        <Tab label="Mission Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Mission One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Mission Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Mission Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Mission Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Mission Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Mission Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Mission Seven
      </TabPanel>
    </div>
  );
}