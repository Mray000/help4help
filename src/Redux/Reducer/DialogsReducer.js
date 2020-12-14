// import src from "*.bmp";

const NEW_MESSAGE = "NEW-MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";

let InintialState = {
  people: [
    { id: 1, name: "Amir" },
    { id: 2, name: "Aynur" },
    { id: 3, name: "Kamill" },
    { id: 4, name: "Diana" },
    { id: 5, name: "ILham" },
    { id: 6, name: "Ruslan" },
    { id: 7, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
    { id: 8, name: "Ruslan" },
  ],
  messages: [
    { id: 1, message: "Hi", whom: "my" },
    { id: 2, message: "What are u doing?", whom: "my" },
    { id: 3, message: "Я хочу кушать", whom: "my" },
    { id: 4, message: "ааааааааа да?", whom: "my" },
    { id: 5, message: "может пук пук?", whom: "my" },
    { id: 6, message: "Hehe", whom: "him" },
    { id: 7, message: "LoKwegwEG Cheburek", whom: "him" },
    { id: 8, message: "я тоже хочу пук пук", whom: "him" },
    { id: 9, message: "длдлдлдлдл", whom: "him" },
    { id: 10, message: "LoL KeK Cwgeweg", whom: "my" },
    { id: 11, message: "GWEGWEG", whom: "him" },
    { id: 12, message: "124235", whom: "him" },
    { id: 13, message: "mgw3krw  jg  reg", whom: "my" },
    { id: 14, message: "фиуууу", whom: "my" },
    { id: 15, message: "дададада", whom: "my" },
    { id: 16, message: "3rgrreg", whom: "him" },
    { id: 17, message: "пока", whom: "him" },
    { id: 18, message: "qeotklwgl", whom: "my" },
    { id: 19, message: "qazplm", whom: "him" },
    { id: 20, message: "zxc123456", whom: "my" },
    { id: 21, message: "fwefwef", whom: "him" },
    { id: 22, message: "909090", whom: "my" },
    { id: 23, message: "аррр", whom: "him" },
    { id: 24, message: "вр", whom: "my" },
    { id: 25, message: "ПоНоС", whom: "him" },
    { id: 26, message: "пАнОс", whom: "my" },
    { id: 27, message: "Сушка", whom: "him" },
    { id: 28, message: "цуаоцу", whom: "my" },
    { id: 29, message: "а я посрал вчера", whom: "him" },
    { id: 30, message: "покакал", whom: "my" },
    { id: 31, message: "панос", whom: "him" },
    { id: 32, message: "пукпукпук", whom: "my" },
    { id: 33, message: "пукпук", whom: "him" },
    { id: 34, message: "пук", whom: "my" },
    { id: 35, message: "птмуклоам", whom: "him" },
    { id: 36, message: "никогла", whom: "my" },
    { id: 37, message: "лололо", whom: "him" },
    { id: 38, message: "ло", whom: "my" },
    { id: 39, message: "лошка", whom: "him" },
    { id: 40, message: "ка", whom: "my" },
    { id: 41, message: "лbлvdvsошка", whom: "him" },
    { id: 42, message: "wmy&\ndfdf", whom: "my" },
  ],
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      let MessageElement = {
        id: Date.now().toString(),
        whom: "my",
        message: action.message,
        photo: action.photo,
        audio: action.audio,
        reply: action.reply,
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
    default:
      return state;
  }
};

const add_message = (
  message = null,
  photo = null,
  audio = null,
  reply = null
) => ({
  type: NEW_MESSAGE,
  message: message,
  photo: photo,
  audio: audio,
  reply: reply,
});

const delete_message = (id) => ({
  type: DELETE_MESSAGE,
  id: id,
});

export const AddMessage = (message, photo, audio, reply) => async (
  dispatch
) => {
  // let data = await ProfileAPI.UpdateStatus(status);
  // if (data.resultCode === 0) {
  //   dispatch(SetStatus(status));
  // }
  dispatch(add_message(message, photo, audio ? audio.blobURL : null, reply));
};

export const DeleteMessage = (id) => async (dispatch) => {
  dispatch(delete_message(id));
};

export default DialogsReducer;
