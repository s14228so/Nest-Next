import { User } from './../../types/index';

import { SessionActionType } from "./types"
import { auth } from "../../plugins/firebase"
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from "redux-thunk";

export const setUser = (user: firebase.User) => {
  console.log({ uid: user.uid })
  return {
    type: SessionActionType.SETUSER,
    payload: { uid: user.uid } as User
  }

}



interface PromiseAction {
  type: SessionActionType
  amount?: number
}


export const login: ActionCreator<
  ThunkAction<void, typeof SessionActionType, null, PromiseAction>
> = () => {
  return (dispatch: Dispatch) => {
    auth.signInAnonymously()
      .then(user => {
        if (user.user) {
          dispatch(setUser(user.user))
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
        dispatch(setUser(user))
      } else {
      }
    });
  }
}





export const logut = () => {
  return {
    type: SessionActionType.LOGOUT,
  }
}


