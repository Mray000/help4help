import { GetMeData } from "./AuthReducer";
import { MessengerConnect } from "./MessengerReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const SET_ERROR = "SET_ERROR";
const SET_REDIRECT = "SET_REDIRECT";

let InintialState = {
  initialized: false,
  error: "",
  redirect: "",
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
    case SET_REDIRECT:
      return {
        ...state,
        redirect: action.redirect,
      };
    default:
      return state;
  }
};

export const SetInitial = () => ({
  type: INITIALIZED_SUCCESS,
});

export const SetError = (error) => ({
  type: SET_ERROR,
  error: error,
});

export const SetRedirect = (redirect) => ({
  type: SET_REDIRECT,
  redirect: redirect,
});

export const Initialing = () => async (dispatch, getState) => {
  await dispatch(GetMeData());
  if (getState().Auth.isAuth) {
    await dispatch(MessengerConnect());
  } else dispatch(SetInitial());
  // window.Comm
  // Promise.all([get_me, socket]).then(() => dispatch(SetInitial()));
};

export default AuthReducer;
