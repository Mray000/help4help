import ProfileReducer from "./Reducer/ProfileReducer";
import DialogsReducer from "./Reducer/DialogsReducer";
let store = {
  subscribeCall() {},
  subscribe(observer) {
    this.subscribeCall = observer;
  },
  getState() {
    return this._state;
  },
  _state: {
    Dialogs: {
      people: [
        { id: 1, name: "Amir" },
        { id: 2, name: "Aynur" },
        { id: 3, name: "Kamill" },
        { id: 4, name: "Diana" },
        { id: 5, name: "ILham" },
        { id: 6, name: "Arslan" },
        { id: 7, name: "Sasha" },
        { id: 8, name: "Arslan" },
      ],

      message: [
        { id: 1, message: "Hi" },
        { id: 2, message: "What are u doing?" },
        { id: 3, message: "Hehe" },
        { id: 4, message: "LoL KeK Cheburek" },
      ],
      message_symbols: [ ],
    },

    Profile: {
      posts: [
        { id: 1, text: "blabla", likeCount: 12 },
        { id: 2, text: "axaxxax", likeCount: 16 },
        { id: 3, text: "box-foy", likeCount: 1 },
      ],
      post_symbols: [],
    },
  },

  dispatch(action) {
    this._state.Profile = ProfileReducer(this._state.Profile, action);
    this._state.Dialogs = DialogsReducer(this._state.Dialogs, action);
    this.subscribeCall(this._state);
  },
};




window.store = this;
export default store;
