import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import axios from '../plugins/axios';
import { useSelector, useDispatch } from "react-redux"
import { State } from '../store';
import { postData } from '../store/sessions/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
        justifyContent: "center",
        flexDirection: "column",
        marginRight: theme.spacing(2),
        alignItems: "center"
      },
    },
    btn: {
      width: 50,
      marginTop: 16,
      fontSize: 12
    }
  }),
);
const loginUser = (state: State) => state.user

export default function AddPost() {
  const classes = useStyles();
  const [post, setPost] = useState("")

  const user = useSelector(loginUser)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setPost("")
    const data = {
      userId: user.id,
      body: post
    }
    await axios.post("v1/posts", data)
    const newUser = { ...user, posts: [...user.posts, data] }

    dispatch(postData(newUser))
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Outlined" value={post} variant="outlined" onChange={e => {
        setPost(e.target.value)
      }} />
      <Button className={classes.btn} variant="contained" color="primary" onClick={handleSubmit}>
        投稿
      </Button>
    </form>
  );
}