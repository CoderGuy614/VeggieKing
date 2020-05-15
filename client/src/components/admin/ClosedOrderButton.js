import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
const ClosedOrderButton = ({ toggleShowClosedOrders, showClosedOrders }) => {
  const hideText = "Show Closed Orders";
  const showText = "Hide Closed Orders";
  return (
    <Container>
      <Button
        style={{ marginTop: "5px" }}
        variant="text"
        color="primary"
        fullWidth
        onClick={toggleShowClosedOrders}
      >
        {" "}
        {showClosedOrders ? showText : hideText}
      </Button>
    </Container>
  );
};

export default ClosedOrderButton;
