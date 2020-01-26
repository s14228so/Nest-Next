import { MessageActionType } from "./types"
import { MessageState } from "./"

export function setMessage(message: MessageState) {
  return {
    type: MessageActionType.SET_MESSAGE,
    payload: message
  }
}
