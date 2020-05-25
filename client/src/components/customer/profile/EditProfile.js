import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const EditProfile = ({ user, setEditProfile }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { postProfile } = authContext;
  const { setAlert } = alertContext;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user.profile) {
      const { phone, location, deliveryNotes } = user.profile;
      setProfile({ phone, location, deliveryNotes });
    } else {
      setProfile({ phone: "", location: "", deliveryNotes: "" });
    }
    //eslint-disable-next-line
  }, []);

  const handleChange = (input) => (e) => {
    setProfile({ ...profile, [input]: e.target.value });
  };

  const handleSubmitProfile = (profile) => {
    if (profile.phone === "" || profile.location === "") {
      return setAlert("Please provide a phone number and location", "danger");
    }
    postProfile(profile);
    setEditProfile(false);
  };

  return (
    <div>
      <Paper>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                style={{ margin: 8 }}
                onChange={handleChange("location")}
                helperText="Enter Your Location"
                label="location"
                defaultValue={user.profile ? user.profile.location : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                style={{ margin: 8 }}
                onChange={handleChange("phone")}
                helperText="Enter Your Phone Number"
                label="phone"
                defaultValue={user.profile ? user.profile.phone : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                style={{ margin: 8 }}
                onChange={handleChange("deliveryNotes")}
                helperText="Enter an Optional Delivery Instruction"
                label="Delivery Notes"
                defaultValue={user.profile ? user.profile.deliveryNotes : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ margin: "10px" }}
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmitProfile(profile);
                }}
              >
                Save Info
              </Button>
              <Button
                style={{ margin: "10px" }}
                onClick={() => setEditProfile(false)}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};

export default EditProfile;
