// import src from "*.bmp";

const NEW_MESSAGE = "NEW-MESSAGE";

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
    { id: 2, message: "Я хочу кушать", whom: "my" },
    { id: 2, message: "ааааааааа да?", whom: "my" },
    { id: 2, message: "может пук пук?", whom: "my" },
    { id: 3, message: "Hehe", whom: "him" },
    { id: 5, message: "LoKwegwEG Cheburek", whom: "him" },
    { id: 5, message: "я тоже хочу пук пук", whom: "him" },
    { id: 5, message: "длдлдлдлдл", whom: "him" },
    { id: 6, message: "LoL KeK Cwgeweg", whom: "my" },
    { id: 7, message: "GWEGWEG", whom: "him" },
    { id: 8, message: "124235", whom: "him" },
    { id: 9, message: "mgw3krw  jg  reg", whom: "my" },
    { id: 9, message: "фиуууу", whom: "my" },
    { id: 9, message: "дададада", whom: "my" },
    { id: 9, message: "3rgrreg", whom: "him" },
    { id: 9, message: "пока", whom: "him" },
    { id: 10, message: "qeotklwgl", whom: "my" },
    { id: 11, message: "qazplm", whom: "him" },
    { id: 12, message: "zxc123456", whom: "my" },
    { id: 13, message: "fwefwef", whom: "him" },
    { id: 14, message: "909090", whom: "my" },
    { id: 14, message: "аррр", whom: "him" },
    { id: 14, message: "вр", whom: "my" },
    { id: 14, message: "ПоНоС", whom: "him" },
    { id: 14, message: "пАнОс", whom: "my" },
    { id: 14, message: "Сушка", whom: "him" },
    { id: 14, message: "цуаоцу", whom: "my" },
    { id: 14, message: "а я посрал вчера", whom: "him" },
    { id: 14, message: "покакал", whom: "my" },
    { id: 14, message: "панос", whom: "him" },
    { id: 14, message: "пукпукпук", whom: "my" },
    { id: 14, message: "пукпук", whom: "him" },
    { id: 14, message: "пук", whom: "my" },
    { id: 14, message: "птмуклоам", whom: "him" },
    { id: 14, message: "никогла", whom: "my" },
    { id: 14, message: "лололо", whom: "him" },
    { id: 14, message: "ло", whom: "my" },
    { id: 14, message: "лошка", whom: "him" },
    { id: 14, message: "ка", whom: "my" },
    { id: 14, message: "лbлvdvsошка", whom: "him" },
    { id: 14, message: "wmy&\ndfdf", whom: "my" },
  ],
};

const DialogsReducer = (state = InintialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      let MessageElement = {
        id: 15,
        whom: "my",
        message: action.message,
        photo: action.photo,
        audio: action.audio,
      };
      return {
        ...state,
        messages: [...state.messages, MessageElement],
      };
    default:
      return state;
  }
};

const add_message = (message = null, photo = null, audio = null) => ({
  type: NEW_MESSAGE,
  message: message,
  photo: photo,
  audio: audio,
});

export const AddMessage = (message, photo, audio) => async (dispatch) => {
  // let data = await ProfileAPI.UpdateStatus(status);
  // if (data.resultCode === 0) {
  //   dispatch(SetStatus(status));
  // }
  dispatch(add_message(message, photo, audio ? audio.blobURL : null));
};

export default DialogsReducer;
