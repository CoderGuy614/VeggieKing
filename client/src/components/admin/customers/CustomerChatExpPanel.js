import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import Chat from "./chat/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "10px 12px",
    background: "#0B72B9",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CustomerExpPanel({
  user,
  messages,
  admins,
  handleNewMessage,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ padding: "0px" }}
        >
          <Grid justify="center" container>
            <Grid item xs={12} sm={6}>
              <AccountCircleTwoToneIcon />
              <Typography variant="body2">{user.user.name}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <Chat
                messages={messages}
                admins={admins}
                user={user}
                handleNewMessage={handleNewMessage}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
