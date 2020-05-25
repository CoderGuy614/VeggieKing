import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ isOpen, setIsOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    isOpen ? setOpen(true) : setOpen(false);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Sign Up for an Account!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be signed in to proceed with ordering. Sign Up or Login
            now!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
