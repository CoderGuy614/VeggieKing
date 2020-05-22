import React from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import AlarmTwoToneIcon from "@material-ui/icons/AlarmTwoTone";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Moment from "react-moment";

const OrderSummaryContents = ({ order, orderTotal }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Icon
          style={{
            color: "red",
          }}
        >
          adjust
        </Icon>
        <Typography variant="body2">Order: {order._id.slice(-5)}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <AlarmTwoToneIcon />
        <Typography variant="body2">
          Placed:<Moment format="llll">{" " + order.date}</Moment>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <MonetizationOnIcon />
        <Typography variant="body2">
          Total: $ {(orderTotal / 4000).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummaryContents;
