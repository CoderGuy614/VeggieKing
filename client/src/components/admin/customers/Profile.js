import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NoteIcon from "@material-ui/icons/Note";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
const Profile = ({ user }) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <MailOutlineIcon />
          <Typography variant="body2">{user.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TodayIcon style={{ marginTop: "5px" }} />
          <Typography variant="body2">
            Joined: <Moment format="L">{user.date}</Moment>
          </Typography>
        </Grid>
      </Grid>
      {user.profile && (
        <Container>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <LocationOnIcon style={{ marginTop: "10px" }} />
              <Typography variant="body2">{user.profile.location}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <NoteIcon style={{ marginTop: "10px" }} />
              <Typography variant="body2">
                {user.profile.deliveryNotes}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <PhoneAndroidIcon style={{ marginTop: "10px" }} />
              <Typography variant="body2">{user.profile.phone}</Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </Container>
  );
};

export default Profile;
