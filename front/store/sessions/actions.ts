import axios from '../../plugins/axios';
import { User } from './../../types';

import { SessionActionType } from "./types"
import { auth } from "../../plugins/firebase"
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from "redux-thunk";



export const setUser = (user: User) => {
  return {
    type: SessionActionType.SETUSER,
    payload: user
  }
}



interface PromiseAction {
  type: SessionActionType
  amount?: number
}

export const login: ActionCreator<
  ThunkAction<void, typeof SessionActionType, null, PromiseAction>
> = (email, password) => {
  return (dispatch: Dispatch) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user.user) {
          axios.get(`/v1/users?uid=${user.user.uid}`).then(res => {
            console.log("これ:", res.data)
            dispatch(setUser(res.data))
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
  }
}



export const authCheck: ActionCreator<
  ThunkAction<void, typeof SessionActionType, null, PromiseAction>
> = () => {
  return (dispatch: Dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        axios.get(`/v1/users?uid=${user.uid}`).then(res => {
          console.log("これ:", res.data)
          dispatch(setUser(res.data))
        })
      } else {
      }
    });
  }
}

export const postData = (user: User) => {
  return {
    type: SessionActionType.POSTDATA,
    payload: user
  }
}




export const signup: ActionCreator<
  ThunkAction<void, typeof SessionActionType, null, PromiseAction>
> = (name, email, password) => {

  return (dispatch: Dispatch) => {
    axios.post("/v1/users", {
      name, email, password
    }).then(res => {
      console.log("これ:", res.data)
      dispatch(setUser(res.data))
      router.push("/")
    })
  }
}




export const logut = () => {
  return {
    type: SessionActionType.LOGOUT,
  }
}


