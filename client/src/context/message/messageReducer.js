import {
  GET_MESSAGES,
  SEND_MESSAGE,
  CLEAR_NOTIFICATIONS,
  MESSAGE_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        unread:
          action.payload.length > 0
            ? action.payload.filter((msg) => !msg.seen)
            : [],
        loading: false,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        unread: [],
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
