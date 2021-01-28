import { AuthAPI, SecurityAPI } from "../../axios/axios";
import { stopSubmit } from "redux-form";
import { SetError } from "./AppReducer";

const SET_AUTH_DATA = "auth/SET-AUTH-DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let InintialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captcha: null,
};

const AuthReducer = (state = InintialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.img,
      };
    default:
      return state;
  }
};

export const SetAuthData = (id, email, login, isAuth) => ({
  type: SET_AUTH_DATA,
  data: { id: id, email: email, login: login, isAuth: isAuth },
});

export const SetCaptcha = (img) => ({
  type: SET_CAPTCHA,
  img: img,
});

export const GetMeData = () => async (dispatch) => {
  let data = await AuthAPI.getMe();
  let { id, email, login } = data.data;
  if (data.resultCode === 0) {
    dispatch(SetAuthData(id, email, login, true));
  }
};
export const SignIn = (
  email,
  password,
  name,
  surname,
  age,
  LessonsForHelping,
  LessonsForLearning
) => async (dispatch) => {
  let data = await AuthAPI.signIn(
    email,
    password,
    name,
    surname,
    age,
    LessonsForHelping,
    LessonsForLearning
  );
  if (data.error) {
    dispatch(SetError(data.error));
    return;
  }
  console.log(data);
};
export const LoginAuth = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let data = await AuthAPI.login(email, password, rememberMe, captcha);
  console.log(data);
  switch (data.resultCode) {
    case 0:
      dispatch(GetMeData());
      dispatch(SetCaptcha(null));
      break;
    case 1:
      dispatch(
        stopSubmit("login", {
          _error: data.messages[0],
        })
      );
      dispatch(SetCaptcha(null));
      break;
    case 10:
      let captchaData = await SecurityAPI.getCaptcha();
      dispatch(
        stopSubmit("login", {
          _error: data.messages[0],
        })
      );
      dispatch(SetCaptcha(captchaData.url));
      break;
    default:
      return;
  }
};

export const LogoutAuth = () => async (dispatch) => {
  let data = await AuthAPI.logout();
  if (data.resultCode === 0) {
    dispatch(SetAuthData(null, null, null, false));
  }
};

export default AuthReducer;
