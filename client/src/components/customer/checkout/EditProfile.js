import React, { useContext, useState, useEffect } from "react";
import TextField from "material-ui/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import AuthContext from "../../../context/auth/authContext";

const EditProfile = ({ user, handleEditProfile, setAlert }) => {
  const authContext = useContext(AuthContext);
  const { postProfile } = authContext;
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
    handleEditProfile(false);
  };

  return (
    <Paper>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange("location")}
              hintText="Enter Your Location"
              floatingLabelText="location"
              defaultValue={user.profile ? user.profile.location : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange("phone")}
              hintText="Enter Your Phone Number"
              floatingLabelText="phone"
              defaultValue={user.profile ? user.profile.phone : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange("deliveryNotes")}
              hintText="Enter an Optional Delivery Instruction"
              floatingLabelText="Delivery Special Instruction"
              defaultValue={user.profile ? user.profile.deliveryNotes : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ margin: "10px" }}
              onClick={() => handleSubmitProfile(profile)}
              variant="contained"
              color="primary"
            >
              Save Info
            </Button>
            <Button
              style={{ margin: "10px" }}
              onClick={() => handleEditProfile(false)}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default EditProfile;
