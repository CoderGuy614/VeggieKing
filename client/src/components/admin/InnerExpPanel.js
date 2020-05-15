import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginBottom: "15px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function InnerExpPanel({ userId }) {
  const [profile, setProfile] = useState({});
  const { phone, location, deliveryNotes } = profile;
  const getProfile = async () => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      if (res) {
        setProfile(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    //eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            View Delivery Info
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container>
            <Typography align="left">
              <b>Phone :</b> {phone}
              <br />
              <b>Location: </b>
              {location}
              <br />
              <b>Delivery Notes:</b> {deliveryNotes}
            </Typography>
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
