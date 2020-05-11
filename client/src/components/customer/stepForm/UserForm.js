import React, { Component } from "react";

import FormDeliveryInfo from "./FormDeliveryInfo";
import Confirm from "./Confirm";
import Success from "./Success";

export class UserForm extends Component {
  state = {
    step: 1,
    location: "",
    phone: "",
    message: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { location, phone, message } = this.state;
    const values = { location, phone, message };

    switch (step) {
      case 1:
        return (
          <FormDeliveryInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            data={this.props.data}
          />
        );
      case 3:
        return <Success />;
      default:
        return <Success />;
    }
  }
}

export default UserForm;
