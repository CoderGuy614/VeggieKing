import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";

import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import TodayIcon from "@material-ui/icons/Today";
import ChatDisplay from "./ChatDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "10px 3px",
    background: "#0B72B9",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CustomerExpPanel({ user, messages, admins }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container>
            <AccountCircleTwoToneIcon style={{ marginRight: "10px" }} />{" "}
            {user.user.name}
          </Grid>

          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            direction="row"
          >
            <Typography className={classes.heading}>
              <TodayIcon />
              Joined: <Moment format="L">{user.date}</Moment>
            </Typography>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <ChatDisplay messages={messages} admins={admins} />
              <Button fullWidth variant="contained" color="secondary">
                {" "}
                Chat Now
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
