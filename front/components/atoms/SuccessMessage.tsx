
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../store'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';



const Message: React.FC = () => {

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    console.log(event)
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: "SET_MESSAGE",
      payload: {
        body: "",
      }
    })

    setOpen(false);
  };

  const messageSelector = (state: State) => state.message
  const message = useSelector(messageSelector)
  useEffect(() => {
    if (message.body) {
      setOpen(true);
    }
    return () => {
    };
  })


  // return (
  //   <MessageBox>
  //     {error && (
  //       <p>{error.message}</p>)}
  //   </MessageBox>
  // )

  return (
    <div className={classes.root}>
      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            <p>{message.body}</p>
          </Alert>
        </Snackbar>
      )}
    </div>
  );

}


export default Message





function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



