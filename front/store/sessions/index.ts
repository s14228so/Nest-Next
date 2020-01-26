import { User } from './../../types/index';
import { SessionActionType } from './types';
import { Reducer } from "redux"

export interface State {
  uid?: string
}

export function initialState(injects?: State): State {
  return {
    uid: ""
  }
}


interface SessionAction {
  type: SessionActionType
  payload: User
}

export const reducer: Reducer<State, SessionAction> = (state = initialState(), action: SessionAction): State => {
  switch (action.type) {
    case SessionActionType.SETUSER:
      return action.payload
    case SessionActionType.LOGOUT:
      return state
    default:
      return state
  }
}
