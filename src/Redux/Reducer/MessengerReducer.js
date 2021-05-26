import notification_mp3 from "../../images/notification.mp3";
import moment from "moment";
import { MessengerAPI, ProfileAPI } from "../../axios/axios";
import { getCurrentSelf } from "../../utils/GetCurrentSelf";
import {
  SetError,
  set_initial,
  SetRedirect,
  set_window_focus,
} from "./AppReducer";
import { Socket } from "socket.io-client";

const ADD_MESSAGE = "ADD-MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const EDIT_MESSAGE = "EDIT_MESSAGE";
const ERROR_MESSAGE = "ERROR_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_DIALOGS = "SET_DIALOGS";
const ADD_DIALOG_USER = "ADD_DIALOG_USER";
const SET_DIALOG_MESSAGES = "SET_DIALOG_MESSAGES";
const ADD_DIALOG_MESSAGE = "SET_DIALOG_MESSAGE";
const SET_TYPING = "SET_TYPING";
const DELETE_TYPING = "DELETE_TYPING";
const SET_LAST_MESSAGE = "SET_LAST_MESSAGE";
const SET_CURRENT_SELF_ID = "SET_CURRENT_SELF_ID";
const SET_DIALOG_INDEX = "SET_DIALOG_INDEX";
const SET_DIALOG_NEW_MESSAGES = "SET_DIALOG_NEW_MESSAGES";
const SET_DIALOG_UNREAD_MESSAGES = "SET_DIALOG_UNREAD_MESSAGES";
const RESET_MESSENGER = "RESET_MESSENGER";
const SET_ONLINE_CONNECT = "SET_ONLINE_CONNECT";
const SET_ONLINE_DISCONNECT = "SET_ONLINE_DISCONNECT";

let InintialState = {
  dialogs: null,
  messages: null,
  error_messages: [],
  isTyping: [],
  dialog_index: 0,
  current_self_id: 0,
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    //изменения сообщений
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };

    case ADD_MESSAGE:
      let NewDialogs = [...state.dialogs];
      NewDialogs[state.dialog_index].last_message = action.message;
      NewDialogs[state.dialog_index].messages = [
        ...NewDialogs[state.dialog_index].messages,
        action.message,
      ];
      if (action.my) NewDialogs[state.dialog_index].unread_messages++;
      return {
        ...state,
        messages: [...state.messages, action.message],
        dialogs: NewDialogs,
      };

    case DELETE_MESSAGE:
      let d_index;
      return {
        ...state,
        dialogs: state.dialogs.map((d, i) => {
          if (d.id === action.d_id) {
            let minus_message = 0;
            d_index = i;
            if (action.me) {
              action.m_ids.forEach((m_id) => {
                if (
                  [...d.messages].reverse().findIndex((m) => m.id === m_id) <
                  d.unread_messages
                ) {
                  minus_message--;
                }
              });
              d.unread_messages += minus_message;
              if (d.messages) {
                d.messages = d.messages.filter(
                  (m) => !action.m_ids.includes(m.id)
                );
              }
              d.last_message = d.messages[d.messages.length - 1];
            } else {
              if (d.messages) {
                d.messages = d.messages.filter(
                  (m) => !action.m_ids.includes(m.id)
                );
              }
              d.last_message = action.last_message || d.last_message;
              d.new_messages += action.minus_message;
            }
          }
          return d;
        }),
        messages:
          d_index === state.dialog_index
            ? state.messages.filter((m) => !action.m_ids.includes(m.id))
            : state.messages,
      };

    case EDIT_MESSAGE:
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.self.id === action.s_id) {
            if (d.messages) {
              d.messages = d.messages.map((m) => {
                if (action.m_id === m.id)
                  return { ...m, text: action.new_text };
                return m;
              });
            }
            if (d.last_message.id === action.m_id) {
              d.last_message = {
                ...d.last_message,
                text: action.new_text,
              };
            }
          }
          return d;
        }),
        messages:
          action.s_id === state.current_self_id
            ? state.messages.map((m) => {
                if (action.m_id === m.id)
                  return { ...m, text: action.new_text };
                return m;
              })
            : state.messages,
      };

    //изменения диалогов
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
          {
            self: action.user,
            id: null,
            messages: [],
            user_id: action.user.id,
            new_messages: 0,
            unread_messages: 0,
          },
        ],
        messages: !action.is_to_me ? [] : state.messages,
        dialog_index: !action.is_to_me
          ? state.dialogs.length
          : state.dialog_index,
        current_self_id: !action.is_to_me
          ? action.user.id
          : state.current_self_id,
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
          if (d.id === action.d_id) {
            d.messages.push(action.message);
            d.last_message = action.message;
            d.new_messages++;
            return { ...d };
          }
          return d;
        }),
      };
    }

    case SET_LAST_MESSAGE: {
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.id === action.d_id) {
            d.last_message = action.message;
            d.new_messages++;
          }
          return d;
        }),
      };
    }

    case SET_DIALOG_NEW_MESSAGES: {
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.self.id === action.s_id) d.new_messages = 0;
          return d;
        }),
      };
    }

    case SET_DIALOG_UNREAD_MESSAGES: {
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.self.id === action.s_id) d.unread_messages = 0;
          return d;
        }),
      };
    }

    //общие действия
    case SET_DIALOG_INDEX: {
      return {
        ...state,
        dialog_index: action.index,
      };
    }

    case SET_CURRENT_SELF_ID: {
      return {
        ...state,
        current_self_id: action.s_id,
      };
    }

    case SET_TYPING: {
      return {
        ...state,
        isTyping: [
          ...state.isTyping,
          { from: action.from, type: action.typing_type },
        ],
      };
    }

    case DELETE_TYPING: {
      return {
        ...state,
        isTyping: state.isTyping.filter((t) => t.from !== action.from),
      };
    }

    case ERROR_MESSAGE:
      return {
        ...state,
        error_messages:
          action.method === "add"
            ? [...state.error_messages, action.id]
            : state.error_messages.filter((id) => id !== action.id),
      };

    case SET_ONLINE_CONNECT:
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.self.id === action.s_id) d.self.online = "online";
          return d;
        }),
      };

    case SET_ONLINE_DISCONNECT:
      return {
        ...state,
        dialogs: state.dialogs.map((d) => {
          if (d.self.id === action.s_id) d.self.online = action.date;
          return d;
        }),
      };
    case RESET_MESSENGER:
      return InintialState;

    default:
      return state;
  }
};

//менять состояние сообщений
const add_message = (added_message, my = false) => ({
  type: ADD_MESSAGE,
  message: added_message,
  my: my,
});

const delete_message = (d_id, m_ids, me, minus_message, last_message) => ({
  type: DELETE_MESSAGE,
  m_ids: m_ids,
  d_id: d_id,
  me: me,
  minus_message: minus_message,
  last_message: last_message,
});

export const edit_message = (from, m_id, new_text) => ({
  type: EDIT_MESSAGE,
  s_id: from,
  m_id: m_id,
  new_text: new_text,
});

const set_messages = (m) => ({
  type: SET_MESSAGES,
  messages: m,
});

//менять состояние диалогов
const set_dialogs = (d) => ({
  type: SET_DIALOGS,
  dialogs: d,
});

const set_dialog_new_messages = (s_id) => ({
  type: SET_DIALOG_NEW_MESSAGES,
  s_id: s_id,
});

const set_dialog_unread_messages = (s_id) => ({
  type: SET_DIALOG_UNREAD_MESSAGES,
  s_id: s_id,
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

const add_dialog_user = (u, is_to_me) => ({
  type: ADD_DIALOG_USER,
  user: u,
  is_to_me: is_to_me,
});

//общие сеттеры
const set_last_message = (d_id, m) => ({
  type: SET_LAST_MESSAGE,
  d_id: d_id,
  message: m,
});

export const set_dialog_index = (index) => ({
  type: SET_DIALOG_INDEX,
  index: index,
});

export const set_current_self_id = (s_id) => ({
  type: SET_CURRENT_SELF_ID,
  s_id: s_id,
});

const set_typing = (from, type) => ({
  type: SET_TYPING,
  from: from,
  typing_type: type,
});

const delete_typing = (from) => ({
  type: DELETE_TYPING,
  from: from,
});

const set_online_connect = (from) => ({
  type: SET_ONLINE_CONNECT,
  s_id: from,
});

const set_online_disconnect = (from, date) => ({
  type: SET_ONLINE_DISCONNECT,
  s_id: from,
  date: date,
});

const reset_messenger = () => ({ type: RESET_MESSENGER });

export const SetMessages = (id) => async (dispatch, getState) => {
  let dialogs = getState().Messenger.dialogs;
  let finded_dialog = dialogs.find((d) => d.id === id);
  if (finded_dialog.messages) {
    dispatch(set_messages(finded_dialog.messages));
    dispatch(set_current_self_id(finded_dialog.self.id));
  } else {
    let data = await MessengerAPI.getMessages(id);
    dispatch(set_messages(data.messages));
    dispatch(set_current_self_id(finded_dialog.self.id));
    if (dialogs) dispatch(set_dialog_messages(id, data.messages));
  }
};

export const AddMessage =
  (text = null, photos = null, files = null, audio = null, reply = null) =>
  async (dispatch, getState) => {
    let id = Date.now().toString();
    let date = moment().format("MMMM D YYYY HH:mm");
    let whom = getState().Auth.id;
    let to = getCurrentSelf();
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
    dispatch(add_message(added_message, true));
    MessengerAPI.addMessage(whom, to, added_message);
  };

export const GetSocket = () => MessengerAPI.getSocket();

export const SetMessagesRead = (from, to, c_r_id) => (dispatch) => {
  MessengerAPI.messagesRead(from, to, c_r_id);
  dispatch(set_dialog_new_messages(to));
};

export const DeleteMessage =
  (from, d_id, m_ids) => async (dispatch, getState) => {
    MessengerAPI.deleteMessage(
      from,
      d_id,
      m_ids,
      getState().Messenger.dialogs.find((d) => d.id === d_id).unread_messages
    );
    dispatch(delete_message(d_id, m_ids, true));
  };

export const EditMessage =
  (from, to, d_id, m_id, new_text) => async (dispatch) => {
    MessengerAPI.editMessage(from, to, d_id, m_id, new_text);
    dispatch(edit_message(to, m_id, new_text));
  };

export const AddDialogUser =
  (id, is_to_me = false) =>
  async (dispatch, getState) => {
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
      dispatch(
        add_dialog_user(
          {
            id: data.id,
            name_surname: data.name + " " + data.surname,
            online: data.online,
            ava: data.ava,
          },
          is_to_me
        )
      );
      dispatch(set_messages([]));
    }
  };

export const ResetMessenger = () => async (dispatch) => {
  dispatch(reset_messenger());
  MessengerAPI.disconnect();
};

export const IsTyping = (from, to, type) => () =>
  MessengerAPI.IsTyping(from, to, type);

export const NotTyping = (from, to) => () => MessengerAPI.NotTyping(from, to);

export const MessengerConnect = () => async (dispatch, getState) => {
  //конектимся к сокету
  let io = await MessengerAPI.connect(getState().Auth.id);

  //количество пришедших сообщений
  let messages_notification_count = 0;

  //добавляем уведомление
  let notification = new Audio(notification_mp3);

  //слушатели за страницей
  window.addEventListener("blur", () => dispatch(set_window_focus(false)));
  window.addEventListener("focus", () => {
    messages_notification_count = 0;
    document.title = "Help4Help";
    dispatch(set_window_focus(true));
  });

  //при удачном конекте
  io.on("connection", async (c_r) => {
    if (c_r.length) {
      if (window.location.pathname === "/messenger") {
        let self_id = getCurrentSelf();
        let finded_dialog = c_r.find((d) => d.self.id === self_id);
        let chat_room_id = finded_dialog?.id;

        if (!chat_room_id) {
          dispatch(set_messages([]));
          dispatch(set_dialogs(c_r));
          dispatch(set_current_self_id(self_id));
          await dispatch(AddDialogUser(self_id));
        } else {
          let chat_room = c_r.find((d) => d.id === chat_room_id);
          chat_room.messages = (
            await MessengerAPI.getMessages(chat_room_id)
          ).messages;
          await dispatch(set_messages(chat_room.messages));
          dispatch(set_dialogs(c_r));
          dispatch(set_current_self_id(self_id));
        }
      } else {
        dispatch(set_dialogs(c_r));
      }
    } else {
      dispatch(set_messages([]));
      dispatch(set_dialogs([]));
    }
    dispatch(set_initial());
  });

  //новое сообщение
  io.on("message", async (m) => {
    //смотрим текущего собеседнкиа
    let current_self_id = getCurrentSelf();

    //если сообщение от него, то добавляем новое сообщение в стек
    if (current_self_id === m.whom) {
      dispatch(add_message(m));
      dispatch(
        SetMessagesRead(
          getState().Auth.id,
          current_self_id,
          getState().Messenger.dialogs.find(
            (d) => d.self.id === current_self_id
          ).id
        )
      );
      dispatch(delete_typing(m.whom));
    }
    //иначе находим диалог с ним и добавялем сообщение в даилог
    else {
      let dialog = getState().Messenger.dialogs.find(
        (d) => d.self.id === m.whom
      );
      dispatch(delete_typing(m.whom));
      if (dialog)
        dialog.messages
          ? dispatch(add_dialog_message(dialog.id, m))
          : dispatch(set_last_message(dialog.id, m));
      //если диалога нет, значит это новый собеседник
      else {
        //создаем нвоый диалог
        await dispatch(AddDialogUser(m.whom, true));
        //находим его
        let dialog = getState().Messenger.dialogs.find(
          (d) => d.self.id === m.whom
        );
        //добавляем сообщение в него
        dispatch(add_dialog_message(dialog.id, m));
      }
    }
    //если полбзователь не на сайте, уведомляем его
    if (!getState().App.focus) {
      messages_notification_count++;
      document.title = messages_notification_count + " new message!";
      notification.play();
    }
  });

  //тайпинг и антайпинг
  io.on("typing", ({ from, type }) => dispatch(set_typing(from, type)));
  io.on("not_typing", ({ from }) => dispatch(delete_typing(from)));
  io.on("message_read", ({ from }) =>
    dispatch(set_dialog_unread_messages(from))
  );
  io.on(
    "online_connect",
    ({ from }) =>
      getState().Messenger.dialogs && dispatch(set_online_connect(from))
  );
  io.on(
    "online_disconnect",
    ({ from, date }) =>
      getState().Messenger.dialogs &&
      dispatch(set_online_disconnect(from, date))
  );
  io.on("delete_message", ({ d_id, m_ids, minus_message, last_message }) =>
    dispatch(delete_message(d_id, m_ids, false, minus_message, last_message))
  );
  io.on("edit_message", ({ from, m_id, new_text }) => {
    dispatch(edit_message(from, m_id, new_text));
    dispatch(delete_typing(from));
  });
};

export default DialogsReducer;
