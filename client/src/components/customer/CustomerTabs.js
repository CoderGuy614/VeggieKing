import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import ListAltIcon from "@material-ui/icons/ListAlt";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import GroupIcon from "@material-ui/icons/Group";
import ChatIcon from "@material-ui/icons/Chat";

import Chat from "./chat/Chat";
import ShopTab from "./ShopTab";
import OrderList from "./orders/OrderList";
import EditUserInfo from "./profile/EditUserInfo";
import EditProfileInfo from "./profile/EditProfileInfo";
import DeleteAccount from "./profile/DeleteAccount";
import EditProfile from "./profile/EditProfile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CustomerTabs({
  user,
  admins,
  isAuthenticated,
  setAlert,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = useState([]);
  const [editProfile, setEditProfile] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getOrdersByUser(user._id);
  }, []);

  const getOrdersByUser = (userId) => {
    axios
      .get(`/api/orders/${userId}`)
      .then((response) => setOrders(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ marginTop: "10px" }} position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab icon={<FastfoodIcon />} label="Shop" {...a11yProps(0)} />
          <Tab icon={<ChatIcon />} label="Chats" {...a11yProps(1)} />
          <Tab icon={<ListAltIcon />} label="My Orders" {...a11yProps(2)} />
          <Tab icon={<GroupIcon />} label="My Profile" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ShopTab
          user={user}
          admins={admins}
          isAuthenticated={isAuthenticated}
          setAlert={setAlert}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chat user={user} admins={admins} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderList user={user} orders={orders} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EditUserInfo user={user} />
        {user.profile && <EditProfileInfo user={user} />}
        {!user.profile && (
          <EditProfile user={user} setEditProfile={setEditProfile} />
        )}

        <DeleteAccount id={user._id} />
      </TabPanel>
    </div>
  );
}
