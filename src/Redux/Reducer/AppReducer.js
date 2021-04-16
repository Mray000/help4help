import { GetMeData, SetAuthData } from "./AuthReducer";
import { MessengerConnect, ResetMessenger } from "./MessengerReducer";
import { reset_profile } from "./ProfileReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const SET_ERROR = "SET_ERROR";
const SET_REDIRECT = "SET_REDIRECT";
const SET_WINDOW_FOCUS = "SET_WINDOW_FOCUS";

let InintialState = {
  initialized: false,
  error: "",
  redirect: "",
  focus: true,
};

const AuthReducer = (state = InintialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_WINDOW_FOCUS:
      return {
        ...state,
        focus: action.focus,
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: action.redirect,
      };
    default:
      return state;
  }
};

export const set_initial = () => ({
  type: INITIALIZED_SUCCESS,
});

export const set_window_focus = (focus) => ({
  type: SET_WINDOW_FOCUS,
  focus: focus,
});

export const SetError = (error) => ({
  type: SET_ERROR,
  error: error,
});

export const SetRedirect = (redirect) => ({
  type: SET_REDIRECT,
  redirect: redirect,
});

export const ResetData = () => (dispatch) => {
  dispatch(ResetMessenger());
  dispatch(reset_profile());
  dispatch(SetAuthData(null, false));
};

export const Initialing = () => async (dispatch) => dispatch(GetMeData());

export default AuthReducer;
