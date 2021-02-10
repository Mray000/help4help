// import src from "*.bmp";

import moment from "moment";
import { MessengerAPI } from "../../axios/axios";
import { getMessages } from "../Selectors/DialogsSelector";

const NEW_MESSAGE = "NEW-MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const EDIT_MESSAGE = "EDIT_MESSAGE";
const ERROR_MESSAGE = "ERROR_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const getData = () => {
  let date = new Date(Date.now());
  let h_m = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  let basic = moment().format("MMMM D YYYY");
  return basic + " " + h_m;
};

const CheckOnline = async () => {
  return fetch(
    "https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d=1"
  )
    .then(() => true)
    .catch(() => false);
};

let InintialState = {
  people: [
    { id: 1, name: "Amir" },
    { id: 2, name: "Aynur" },
    { id: 3, name: "Kamill" },
    { id: 4, name: "Diana" },
    { id: 5, name: "ILham" },
    { id: 6, name: "Ruslan" },
    { id: 7, name: "Ruslan" },
    { id: 9, name: "Ruslan" },
    { id: 10, name: "Ruslan" },
    { id: 11, name: "Ruslan" },
    { id: 12, name: "Ruslan" },
    { id: 13, name: "Ruslan" },
    { id: 14, name: "Ruslan" },
    { id: 15, name: "Ruslan" },
    { id: 16, name: "Ruslan" },
    { id: 17, name: "Ruslan" },
    { id: 18, name: "Ruslan" },
    { id: 19, name: "Ruslan" },
    { id: 20, name: "Ruslan" },
    { id: 21, name: "Ruslan" },
    { id: 22, name: "Ruslan" },
    { id: 23, name: "Ruslan" },
    { id: 24, name: "Ruslan" },
  ],
  messages: [],
  error_messages: [],
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case DELETE_MESSAGE:
      let messages1 = state.messages.slice();
      action.id.forEach(
        (id) => (messages1 = messages1.filter((m) => m.id !== id))
      );
      return {
        ...state,
        messages: messages1,
      };
    case EDIT_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((m) => {
          if (m.id === action.id) {
            let NewMessage = Object.assign({}, m);
            NewMessage.text = action.text;
            NewMessage.date = getData().slice(0, -3) + " edit";
            return NewMessage;
          } else return m;
        }),
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        error_messages:
          action.method === "add"
            ? [...state.error_messages, action.id]
            : state.error_messages.filter((id) => id !== action.id),
      };
    default:
      return state;
  }
};

const add_message = (added_message) => ({
  type: NEW_MESSAGE,
  message: added_message,
});

const delete_message = (id) => ({
  type: DELETE_MESSAGE,
  id: id,
});

export const edit_message = (id, text) => ({
  type: EDIT_MESSAGE,
  id: id,
  text: text,
});

const set_error_messages = (id, method) => ({
  type: ERROR_MESSAGE,
  id: id,
  method: method,
});

const set_messages = (m) => ({
  type: SET_MESSAGES,
  messages: m,
});

export const SetMessages = () => async (dispatch) => {
  let data = await MessengerAPI.getMessages();
  dispatch(set_messages(data));
};

export const AddMessage = (
  text = null,
  photos = null,
  files = null,
  audio = null,
  reply = null
) => async (dispatch, getState) => {
  let id = Date.now().toString();
  let date = getData();
  let whom = getState().Auth.name;
  let added_message = {
    id: id,
    whom: "my",
    text: text,
    photos: photos,
    files: files,
    audio: audio,
    reply: reply,
    date: date,
  };
  dispatch(add_message(added_message));

  let interval;
  if (await CheckOnline()) await MessengerAPI.addMessage(added_message);
  else {
    if (!getState().Dialogs.error_messages.length) {
      interval = setInterval(async () => {
        if (await CheckOnline()) {
          let error_messages_mass = getState().Dialogs.messages.filter((m) =>
            getState().Dialogs.error_messages.includes(m.id)
          );
          for (let m of error_messages_mass) {
            await MessengerAPI.addMessage(m);
            dispatch(set_error_messages(m.id, "delete"));
          }
          clearInterval(interval);
        }
      }, 3000);
    }
    dispatch(set_error_messages(id, "add"));
  }
};

export const EditMessage = (id, text) => async (dispatch) => {
  dispatch(edit_message(id, text));
};

export const DeleteMessage = (id) => async (dispatch) => {
  dispatch(delete_message(id));
};

// export const MessagesListenner = () => async (dispatch) => {
//   let websocket = await onNewMessage();
//   websocket.addEventListener("message", async (e) => {
//     let data = JSON.parse(e.data);
//     if (data.length > 1) {
//       // data.map((m) => dispatch(AddMessage(m.message, [m.photo])));
//       data.map((m) => dispatch(AddMessage(m.message)));
//     } else {
//       // dispatch(AddMessage(data[0].message, [data[0].photo]));
//       dispatch(AddMessage(data[0].message));
//     }
//   });
// };

export default DialogsReducer;
