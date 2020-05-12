import React, { Component, useContext } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthContext from "../../../context/auth/authContext";
import { List, ListItem } from "material-ui/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ConfirmTable from "./ConfirmTable";
import Grid from "@material-ui/core/Grid";
import RaisedButton from "material-ui/RaisedButton";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";

export class Confirm extends Component {
  state = {
    phone: "",
    location: "",
    deliveryNotes: "",
    profile: this.props.profile,
    data: this.props.data,
  };
  static contextType = AuthContext;

  continue = (e) => {
    console.log("CONTINUE");
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { location, deliveryNotes, phone } = this.state;
      const res = await axios.post(
        "/api/profile",
        { location, deliveryNotes, phone },
        config
      );
      if (res) {
        this.setState({ profile: res.data });
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => console.log(error.msg));
      }
    }
  };

  render() {
    // const { data, profile } = this.props;
    const { user } = this.context;
    const { phone, location, deliveryNotes, data, profile } = this.state;
    const values = { phone, location, deliveryNotes };
    return (
      <MuiThemeProvider>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container>
              {profile ? (
                <ShowProfile />
              ) : (
                <EditProfile
                  values={values}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              )}
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">Your Order Details:</Typography>
            <ConfirmTable data={data} />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};

export default Confirm;
