import React, { useState } from 'react';
import { NextPage } from "next";
import { useDispatch } from "react-redux"

import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { signup } from '../store/sessions/actions';

const SignUpPage: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();

  return (
    <Paper style={styles.container}>
      <div>
        <h2>Sign Up</h2>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="email" label="Email" value={email} type="email" fullWidth autoFocus required onChange={(e) => {
              setEmail(e.target.value)
            }} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="password" label="Password" value={password} type="password" fullWidth required onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <FormControlLabel control={
              <Checkbox
                color="primary"
              />
            } label="Remember me" />
          </Grid>
          <Grid item>
            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={() => {
            dispatch(signup(email, password))
          }}>SignUp</Button>
        </Grid>
      </div>
    </Paper>
  );
}

const styles = {
  container: {
    width: "50%",
    margin: "30px auto",
    padding: "20px"
  }
}

export default SignUpPage