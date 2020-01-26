import axios from '../../plugins/axios';
import { User } from './../../types/index';

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




export const signup: ActionCreator<
  ThunkAction<void, typeof SessionActionType, null, PromiseAction>
> = ({ email, password }) => {
  return (dispatch: Dispatch) => {
    auth.createUserWithEmailAndPassword(email, password).then(user => {
      if (user.user) {
        axios.get(`/v1/users?uid=${user.user.uid}`).then(res => {
          console.log("これ:", res.data)
          dispatch(setUser(res.data))
        })
      }
    })
  }
}




export const logut = () => {
  return {
    type: SessionActionType.LOGOUT,
  }
}


