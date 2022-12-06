import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import HelpIcon from '@mui/icons-material/Help';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>
        <HelpIcon />
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="has-font">{"It's Chihuahua Time!"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            className="has-font"
            id="alert-dialog-slide-description"
          >
            Isn't Cookie just the greatest dog in the world?
            <br />
            Match the Cookies to win this fun game!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Sounds Good!</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
