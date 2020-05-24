import React, { Fragment, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthContext from "../../context/auth/authContext";

export default function DeleteAccount({ id }) {
  const authContext = useContext(AuthContext);
  const { deleteAccount } = authContext;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteAccount(id);
  };

  return (
    <Fragment>
      <Container>
        <Paper>
          <Button
            fullWidth
            style={{ backgroundColor: "#DC143C", color: "white" }}
            variant="outlined"
            // color="secondary"
            onClick={handleClickOpen}
          >
            Delete My Account
          </Button>
        </Paper>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes, Delete my account.
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No, I want to stay!
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
