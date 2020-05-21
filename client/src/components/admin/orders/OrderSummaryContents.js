import React from "react";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import AlarmTwoToneIcon from "@material-ui/icons/AlarmTwoTone";
import Moment from "react-moment";

const OrderSummaryContents = ({ order, iconColor }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Icon
          style={{
            color: iconColor,
          }}
        >
          adjust
        </Icon>
        <Typography variant="body2">Order: {order._id.slice(-5)}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <AccountCircleTwoToneIcon />
        <Typography variant="body2">
          {" "}
          From:
          {" " + order.user.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <AlarmTwoToneIcon />
        <Typography variant="body2">
          Placed:<Moment format="LT">{" " + order.date}</Moment>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummaryContents;
