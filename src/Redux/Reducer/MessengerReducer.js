// import src from "*.bmp";

import moment from "moment";
import { MessengerAPI, ProfileAPI } from "../../axios/axios";
import { SetError, SetInitial, SetRedirect } from "./AppReducer";

const ADD_MESSAGE = "ADD-MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const EDIT_MESSAGE = "EDIT_MESSAGE";
const ERROR_MESSAGE = "ERROR_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_DIALOGS = "SET_DIALOGS";
const ADD_DIALOG_USER = "ADD_DIALOG_USER";
const SET_DIALOG_MESSAGES = "SET_DIALOG_MESSAGES";
const ADD_DIALOG_MESSAGE = "SET_DIALOG_MESSAGE";

const getCurrentSelf = () =>
  new URL(window.location.href).searchParams.get("self");

const CheckOnline = async () => {
  return fetch(
    "https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d=1"
  )
    .then(() => true)
    .catch(() => false);
};

let InintialState = {
  dialogs: null,
  messages: null,
  error_messages: [],
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case SET_DIALOGS: {
      return {
        ...state,
        dialogs: action.dialogs,
      };
    }
    case ADD_DIALOG_USER: {
      return {
        ...state,
        dialogs: [
          ...state.dialogs,
          { self: action.user, id: null, messages: [] },
        ],
      };
    }
    case SET_DIALOG_MESSAGES: {
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.id === action.d_id) d.messages = action.messages;
          return d;
        }),
      };
    }
    case ADD_DIALOG_MESSAGE: {
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.id === action.d_id) d.messages.push(action.message);
          return d;
        }),
      };
    }
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
            m.text = action.text;
            m.date = moment().format("MMMM D YYYY HH:mm") + " edit";
          }
          return m;
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
  type: ADD_MESSAGE,
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

const set_dialogs = (d) => ({
  type: SET_DIALOGS,
  dialogs: d,
});

const set_dialog_messages = (id, m) => ({
  type: SET_DIALOG_MESSAGES,
  d_id: id,
  messages: m,
});

const add_dialog_message = (id, m) => ({
  type: ADD_DIALOG_MESSAGE,
  d_id: id,
  message: m,
});

const add_dialog_user = (u) => ({
  type: ADD_DIALOG_USER,
  user: u,
});

export const SetMessages = (id) => async (dispatch, getState) => {
  let dialog_messages;
  let dialogs = getState().Messenger.dialogs;
  if (dialogs) dialog_messages = dialogs.find((d) => d.id === id).messages;
  if (dialog_messages) {
    setTimeout(() => {
      dispatch(set_messages(dialog_messages));
    }, 0);
  } else {
    let data = await MessengerAPI.getMessages(id);
    dispatch(set_messages(data.messages));
    if (dialogs) dispatch(set_dialog_messages(id, data.messages));
  }
};

export const AddMessage = (
  text = null,
  photos = null,
  files = null,
  audio = null,
  reply = null,
  to = null
) => async (dispatch, getState) => {
  let id = Date.now().toString();
  let date = moment().format("MMMM D YYYY HH:mm");
  let whom = getState().Auth.id;
  let added_message = {
    id: id,
    whom: whom,
    text: text,
    photos: photos,
    files: files,
    audio: audio,
    reply: reply,
    date: date,
  };
  dispatch(add_message(added_message));
  let to = getCurrentSelf();
  MessengerAPI.addMessage(whom, to, added_message);
  // if (await CheckOnline())
  //   await MessengerAPI.addMessage(whom, to, added_message);
  // else {
  //   if (!getState().Dialogs.error_messages.length) {
  //     interval = setInterval(async () => {
  //       if (await CheckOnline()) {
  //         let error_messages_mass = getState().Dialogs.messages.filter((m) =>
  //           getState().Dialogs.error_messages.includes(m.id)
  //         );
  //         for (let m of error_messages_mass) {
  //           await MessengerAPI.addMessage(m);
  //           dispatch(set_error_messages(m.id, "delete"));
  //         }
  //         clearInterval(interval);
  //       }
  //     }, 3000);
  //   }
  //   dispatch(set_error_messages(id, "add"));
  // }
};

export const EditMessage = (id, text) => async (dispatch) => {
  dispatch(edit_message(id, text));
};

export const DeleteMessage = (id) => async (dispatch) => {
  dispatch(delete_message(id));
};

export const AddDialogUser = (id) => async (dispatch, getState) => {
  let data = await ProfileAPI.getProfile(id);
  if (data.no_user) {
    dispatch(SetError("No user😕"));
    let dialogs = getState().Messenger.dialogs;
    dispatch(
      SetRedirect(
        dialogs.length
          ? "messenger/self=" + dialogs[0].self.id
          : "profile/" + getState().Auth.id
      )
    );
  } else {
    // dispatch(set_messages([]));
    dispatch(
      add_dialog_user({
        id: data.id,
        name_surname: data.name + " " + data.surname,
        ava: data.ava ? data.ava : null,
      })
    );
  }
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

export const MessengerConnect = () => async (dispatch, getState) => {
  let io = await MessengerAPI.connect(getState().Auth.id);
  io.on("connection", async (c_r) => {
    if (c_r.length) {
      if (window.location.pathname === "/messenger") {
        let chat_room_id = 0;
        let self_id = getCurrentSelf();
        let finded_dialog = c_r.find((d) => d.self.id === self_id);
        if (finded_dialog) chat_room_id = finded_dialog.id;

        if (chat_room_id === 0) {
          dispatch(set_messages([]));
          dispatch(set_dialogs(c_r));
          await dispatch(AddDialogUser(self_id));
        } else {
          c_r.find((d) => d.id === chat_room_id).messages = (
            await MessengerAPI.getMessages(chat_room_id)
          ).messages;
          // console.log(c_r.find((d) => d.id === chat_room_id).messages);

          await dispatch(
            set_messages(c_r.find((d) => d.id === chat_room_id).messages)
          );
          dispatch(set_dialogs(c_r));
        }
      } else {
        c_r.find((d) => d.id === c_r[0].id).messages = (
          await MessengerAPI.getMessages(c_r[0].id)
        ).messages;
        await dispatch(
          set_messages(c_r.find((d) => d.id === c_r[0].id).messages)
        );
        dispatch(set_dialogs(c_r));
      }
    } else {
      dispatch(set_messages([]));
      dispatch(set_dialogs([]));
    }
    dispatch(SetInitial());
  });
  io.on("message", async (m) => {
    let current_self_id = getCurrentSelf();
    if (current_self_id === m.whom) {
      dispatch(add_message(m));
      dispatch(add_dialog_message(current_self_id, m));
    } else {
      let dialog = getState().Messenger.dialogs.find(
        (d) => d.self.id === m.whom
      );
      if (dialog) {
        if (dialog.messages) dispatch(add_dialog_message(dialog.id, m));
      } else {
        await dispatch(AddDialogUser(m.whom));
        let dialog = getState().Messenger.dialogs.find(
          (d) => d.self.id === m.whom
        );
        dispatch(add_dialog_message(dialog.id, m));
      }
    }
  });
};

export default DialogsReducer;
