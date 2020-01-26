import { combineReducers } from "redux"
import * as Sessions from "./sessions"
import * as Messages from "./messages"

export function initialState() {
  return {
    user: Sessions.initialState(),
    error: Messages.initialState()
  }
}

export const reducer = combineReducers({
  user: Sessions.reducer,
  message: Messages.reducer
})