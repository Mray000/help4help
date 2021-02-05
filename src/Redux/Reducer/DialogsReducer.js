// import src from "*.bmp";

import moment from "moment";
import { onNewMessage } from "../../axios/axios";

const NEW_MESSAGE = "NEW-MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const EDIT_MESSAGE = "EDIT_MESSAGE";
const getData = () => {
  let date = new Date(Date.now());
  let h_m = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  let basic = moment().format("MMMM D YYYY");
  return basic + " " + h_m;
};
const getData2 = () => {
  let date = new Date(Date.now());
  let h_m = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  let basic = moment(moment().format("MMMM D YYYY"), "MMMM D YYYY")
    .add(15, "days")
    .format("MMMM D YYYY");
  return basic + " " + h_m;
};
const getData3 = () => {
  let date = new Date(Date.now());
  let h_m = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  let basic = moment(moment().format("MMMM D YYYY"), "MMMM D YYYY")
    .add(25, "days")
    .format("MMMM D YYYY");
  return basic + " " + h_m;
};
const getData4 = () => {
  let date = new Date(Date.now());
  let h_m = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  let basic = moment(moment().format("MMMM D YYYY"), "MMMM D YYYY")
    .add(30, "days")
    .format("MMMM D YYYY");
  return basic + " " + h_m;
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
  messages: [
    {
      id: 1,
      text: "Hi",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 2,
      text: "What are u doing?",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 3,
      text: "Я хочу кушать",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 4,
      text: "ааааааааа да?",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 5,
      text: "может пук пук?",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 6,
      text: "Hehe",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 7,
      text: "LoKwegwEG Cheburek",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 8,
      text: "я тоже хочу пук пук",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 9,
      text: "длдлдлдлдл",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 10,
      text: "LoL KeK Cwgeweg",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 11,
      text: "GWEGWEG",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 12,
      text: "124235",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 13,
      text: "mgw3krw  jg  reg",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 14,
      text: "фиуууу",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 15,
      text: "дададада",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 16,
      text: "3rgrreg",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 17,
      text: "пока",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 18,
      text: "qeotklwgl",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 19,
      text: "qazplm",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 20,
      text: "zxc123456",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 21,
      text: "fwefwef",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 22,
      text: "909090",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 23,
      text: "аррр",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 24,
      text: "вр",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 25,
      text: "ПоНоС",
      whom: "him",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 26,
      text: "пАнОс",
      whom: "my",
      photos: null,
      date: getData(),
      files: null,
    },
    {
      id: 27,
      text: "Сушка",
      whom: "him",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 28,
      text: "цуаоцу",
      whom: "my",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 29,
      text: "а я посрал вчера",
      whom: "him",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 30,
      text: "покакал",
      whom: "my",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 31,
      text: "панос",
      whom: "him",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 32,
      text: "пукпукпук",
      whom: "my",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 33,
      text: "пукпук",
      whom: "him",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 34,
      text: "пук",
      whom: "my",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 35,
      text: "птмуклоам",
      whom: "him",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 36,
      text: "никогла",
      whom: "my",
      photos: null,
      date: getData2(),
      files: null,
    },
    {
      id: 37,
      text: "лололо",
      whom: "him",
      photos: null,
      date: getData3(),
      files: null,
    },
    {
      id: 38,
      text: "ло",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 39,
      text: "лошка",
      whom: "him",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 40,
      text: "ка",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 41,
      text: "лbлvdvsошка",
      whom: "him",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 42,
      text: "wmy&dfdf",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 43,
      text: null,
      whom: "my",
      photos: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/%D0%97%D0%B0%D0%BA%D0%B0%D1%82_%D0%9F%D0%B0%D0%B0%D0%BD%D0%B0%D1%8F%D1%80%D0%B2%D0%B8.jpg",
        "https://fotogora.ru/wp-content/uploads/2016/12/abstract-1846401_1280.jpg",
        "https://cameralabs.org/media/k2/items/cache/f83c9c315cf89e75d4d5b66c3e25f60b_L.jpg",
      ],
      date: getData4(),
      files: null,
    },
    {
      id: 45,
      text: "бубу",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 46,
      text: "бубу",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 47,
      text: "бубу",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 48,
      text: "бубу",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    {
      id: 49,
      text: "бубу",
      whom: "my",
      photos: null,
      date: getData4(),
      files: null,
    },
    // {
    //   id: 44,
    //   whom: "my",
    //   photos: [
    //     "https://shelly.kpfu.ru/e-ksu/docs/F1433752806/IMG_1516.jpg?rnd=4558",
    //   ],
    //   date: getData2(),
    // files: null
    // },
  ],
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      let MessageElement = {
        id: state.messages.length + 2,
        whom: "my",
        text: action.text,
        photos: action.photos,
        files: action.files ? [...action.files] : null,
        audio: action.audio,
        reply: action.reply,
        date: getData4(),
      };

      return {
        ...state,
        messages: [...state.messages, MessageElement],
      };
    case DELETE_MESSAGE:
      let messages1 = state.messages.slice();
      action.id.forEach((id) => {
        messages1 = messages1.filter((m) => m.id !== id);
      });
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
    default:
      return state;
  }
};

const add_message = (
  text = null,
  photos = null,
  files = null,
  audio = null,
  reply = null
) => ({
  type: NEW_MESSAGE,
  text: text,
  photos: photos,
  files: files,
  audio: audio,
  reply: reply,
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

export const AddMessage = (text, photos, files, audio, reply) => async (
  dispatch
) => {
  // let data = await ProfileAPI.UpdateStatus(status);
  // if (data.resultCode === 0) {
  //   dispatch(SetStatus(status));
  // }
  dispatch(
    add_message(text, photos, files, audio ? audio.blobURL : null, reply)
  );
};

export const EditMessage = (id, text) => async (dispatch) => {
  // let data = await ProfileAPI.UpdateStatus(status);
  // if (data.resultCode === 0) {
  //   dispatch(SetStatus(status));
  // }
  dispatch(edit_message(id, text));
};

export const DeleteMessage = (id) => async (dispatch) => {
  dispatch(delete_message(id));
};

export const MessagesListenner = () => async (dispatch) => {
  let websocket = await onNewMessage();
  websocket.addEventListener("message", async (e) => {
    let data = JSON.parse(e.data);
    if (data.length > 1) {
      // data.map((m) => dispatch(AddMessage(m.message, [m.photo])));
      data.map((m) => dispatch(AddMessage(m.message)));
    } else {
      // dispatch(AddMessage(data[0].message, [data[0].photo]));
      dispatch(AddMessage(data[0].message));
    }
  });
};

export default DialogsReducer;
