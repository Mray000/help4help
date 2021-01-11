// import src from "*.bmp";

import moment from "moment";

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
    .add(35, "days")
    .format("MMMM D YYYY");
  return basic + " " + h_m;
};
const getData0 = () => {
  let date = new Date(Date.now());
  let h_m = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  let basic = moment(moment().format("MMMM D YYYY"), "MMMM D YYYY")
    .subtract(1, "days")
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
      message: "Hi",
      whom: "my",
      photos: null,
      date: getData0(),
    },
    {
      id: 2,
      message: "What are u doing?",
      whom: "my",
      photos: null,
      date: getData0(),
    },
    {
      id: 3,
      message: "Я хочу кушать",
      whom: "my",
      photos: null,
      date: getData0(),
    },
    {
      id: 4,
      message: "ааааааааа да?",
      whom: "my",
      photos: null,
      date: getData0(),
    },
    {
      id: 5,
      message: "может пук пук?",
      whom: "my",
      photos: null,
      date: getData0(),
    },
    {
      id: 6,
      message: "Hehe",
      whom: "him",
      photos: null,
      date: getData0(),
    },
    {
      id: 7,
      message: "LoKwegwEG Cheburek",
      whom: "him",
      photos: null,
      date: getData0(),
    },
    {
      id: 8,
      message: "я тоже хочу пук пук",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 9,
      message: "длдлдлдлдл",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 10,
      message: "LoL KeK Cwgeweg",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 11,
      message: "GWEGWEG",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 12,
      message: "124235",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 13,
      message: "mgw3krw  jg  reg",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 14,
      message: "фиуууу",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 15,
      message: "дададада",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 16,
      message: "3rgrreg",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 17,
      message: "пока",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 18,
      message: "qeotklwgl",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 19,
      message: "qazplm",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 20,
      message: "zxc123456",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 21,
      message: "fwefwef",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 22,
      message: "909090",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 23,
      message: "аррр",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 24,
      message: "вр",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 25,
      message: "ПоНоС",
      whom: "him",
      photos: null,
      date: getData(),
    },
    {
      id: 26,
      message: "пАнОс",
      whom: "my",
      photos: null,
      date: getData(),
    },
    {
      id: 27,
      message: "Сушка",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 28,
      message: "цуаоцу",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 29,
      message: "а я посрал вчера",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 30,
      message: "покакал",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 31,
      message: "панос",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 32,
      message: "пукпукпук",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 33,
      message: "пукпук",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 34,
      message: "пук",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 35,
      message: "птмуклоам",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 36,
      message: "никогла",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 37,
      message: "лололо",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 38,
      message: "ло",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 39,
      message: "лошка",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 40,
      message: "ка",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 41,
      message: "лbлvdvsошка",
      whom: "him",
      photos: null,
      date: getData2(),
    },
    {
      id: 42,
      message: "wmy&dfdf",
      whom: "my",
      photos: null,
      date: getData2(),
    },
    {
      id: 43,
      message: null,
      whom: "my",
      photos: [
        "https://scontent-hel3-1.cdninstagram.com/v/t51.2885-15/e35/138395924_2789398654631256_330758106058142235_n.jpg?_nc_ht=scontent-hel3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=86CloZvMAyMAX9iRT0r&tp=1&oh=52a0c51fb1f661bd0b174b06ea75989c&oe=6027D902",
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/%D0%97%D0%B0%D0%BA%D0%B0%D1%82_%D0%9F%D0%B0%D0%B0%D0%BD%D0%B0%D1%8F%D1%80%D0%B2%D0%B8.jpg",
        "https://fotogora.ru/wp-content/uploads/2016/12/abstract-1846401_1280.jpg",
        "https://cameralabs.org/media/k2/items/cache/f83c9c315cf89e75d4d5b66c3e25f60b_L.jpg",
      ],
      date: getData2(),
    },
    // {
    //   id: 44,
    //   message: "моя чикса😏",
    //   whom: "my",
    //   photos: [
    //     "https://shelly.kpfu.ru/e-ksu/docs/F1433752806/IMG_1516.jpg?rnd=4558",
    //   ],
    //   date: getData2(),
    // },
  ],
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      let MessageElement = {
        id: Date.now().toString(),
        whom: "my",
        message: action.message,
        photos: action.photos,
        audio: action.audio,
        reply: action.reply,
        date: action.message === "1" ? getData4() : getData3(),
      };
      return {
        ...state,
        messages: [...state.messages, MessageElement],
      };
    case DELETE_MESSAGE:
      let messages1 = state.messages.slice();
      action.id.map((id) => {
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
            m.message = action.text;
            m.date = getData().slice(0, -3) + " edit";
            return m;
          } else {
            return m;
          }
        }),
      };
    default:
      return state;
  }
};

const add_message = (
  message = null,
  photos = null,
  audio = null,
  reply = null
) => ({
  type: NEW_MESSAGE,
  message: message,
  photos: photos,
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

export const AddMessage = (message, photos, audio, reply) => async (
  dispatch
) => {
  // let data = await ProfileAPI.UpdateStatus(status);
  // if (data.resultCode === 0) {
  //   dispatch(SetStatus(status));
  // }
  dispatch(add_message(message, photos, audio ? audio.blobURL : null, reply));
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

export default DialogsReducer;
