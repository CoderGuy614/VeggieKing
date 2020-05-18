import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NoteIcon from "@material-ui/icons/Note";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
const Profile = ({ user }) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <MailOutlineIcon />
          <Typography variant="body2">{user.user.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TodayIcon style={{ marginTop: "5px" }} />
          <Typography variant="body2">
            Joined: <Moment format="L">{user.date}</Moment>
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <LocationOnIcon />
          <Typography variant="body2">{user.location}</Typography>
        </Grid>
        <Grid item xs={12}>
          <NoteIcon />
          <Typography variant="body2">{user.deliveryNotes}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
