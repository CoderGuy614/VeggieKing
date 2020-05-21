import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import ProductTable from "./products/ProductTable";
import OrderList from "./orders/OrderList";
import ClosedOrderButton from "./orders/ClosedOrderButton";
import ClosedOrderList from "./orders/ClosedOrderList";
import CustomerProfileList from "./customers/CustomerProfileList";
import CustomerChatList from "./customers/CustomerChatList";
import ListAltIcon from "@material-ui/icons/ListAlt";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import GroupIcon from "@material-ui/icons/Group";
import ChatIcon from "@material-ui/icons/Chat";

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

export default function SimpleTabs({ orders, users }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [showClosedOrders, setShowClosedOrders] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowClosedOrders = () => {
    setShowClosedOrders(!showClosedOrders);
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
          <Tab icon={<ListAltIcon />} label="Orders" {...a11yProps(0)} />
          <Tab icon={<FastfoodIcon />} label="Products" {...a11yProps(1)} />
          <Tab icon={<ChatIcon />} label="Chats" {...a11yProps(2)} />
          <Tab icon={<GroupIcon />} label="Customers" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container>
          <OrderList
            orders={orders.filter(
              (order) => order.status === "new" || order.status === "inProcess"
            )}
          />

          <ClosedOrderButton
            toggleShowClosedOrders={toggleShowClosedOrders}
            showClosedOrders={showClosedOrders}
          />

          {showClosedOrders && (
            <ClosedOrderList
              orders={orders.filter((order) => order.status === "closed")}
            />
          )}
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CustomerChatList users={users.filter((user) => !user.isAdmin)} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CustomerProfileList users={users.filter((user) => !user.isAdmin)} />
      </TabPanel>
    </div>
  );
}
