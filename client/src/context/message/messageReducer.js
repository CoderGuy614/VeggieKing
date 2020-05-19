import {
  GET_MESSAGES,
  GET_USER_MESSAGES,
  SEND_MESSAGE,
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
    case GET_USER_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(
          (msg) =>
            msg.from._id === action.payload.id ||
            msg.to._id === action.payload.id
        ),
        loading: false,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false,
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
