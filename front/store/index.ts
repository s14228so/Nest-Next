import { MessageState } from './messages/index';
import { User } from './../types/index';
import { createStore, Store, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { initialState, reducer } from "./reducer"
import thunk from "redux-thunk";


const middleWares = [thunk];
export type StoreState = ReturnType<typeof initialState>
export type ReduxStoreInstance = Store<StoreState>

export function initStore(state = initialState()) {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(...middleWares)))
}


export interface State {
  user: User,
  message: MessageState
}
