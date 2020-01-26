
import { Reducer } from "redux"

import { MessageActionType } from "./types"

export interface MessageState {
  body: string,
  type: "success" | "error"
}

export function initialState(injects?: MessageState): MessageState {
  console.log(injects)
  return {
    body: "",
    type: "success"
  }
}

interface MessageAction {
  type: MessageActionType
  payload: MessageState
}

export const reducer: Reducer<MessageState, MessageAction> = (state = initialState(), action: MessageAction): MessageState => {
  switch (action.type) {
    case MessageActionType.SET_MESSAGE:
      return action.payload
    default:
      return state
  }
}
