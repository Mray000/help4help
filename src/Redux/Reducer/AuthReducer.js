import { AuthAPI } from "../../axios/axios";
import { SetError, SetRedirect, set_initial } from "./AppReducer";
import { MessengerConnect } from "./MessengerReducer";

const SET_AUTH_DATA = "auth/SET-AUTH-DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let InintialState = {
  id: null,
  isAuth: false,
};

const AuthReducer = (state = InintialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return { id: action.id, isAuth: action.isAuth };
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.img,
      };
    default:
      return state;
  }
};

export const SetAuthData = (id, isAuth) => ({
  type: SET_AUTH_DATA,
  id: id,
  isAuth: isAuth,
});

export const SetCaptcha = (img) => ({
  type: SET_CAPTCHA,
  img: img,
});

export const GetMeData = () => async (dispatch) => {
  if (!localStorage.getItem("token")) {
    dispatch(SetRedirect("/home"));
    dispatch(set_initial());
  } else {
    let data = await AuthAPI.getMe();
    if (data.no_token) {
      dispatch(SetRedirect("/home"));
      dispatch(set_initial());
    } else {
      await dispatch(SetAuthData(data.id, true));
      dispatch(MessengerConnect(data.id));
    }
  }
};

export const SignUp =
  (
    email,
    password,
    name,
    surname,
    country,
    birthday,
    LessonsForHelping,
    LessonsForLearning
  ) =>
  async (dispatch) => {
    let data = await AuthAPI.signUp({
      email: email,
      password: password,
      name: name,
      surname: surname,
      ava: null,
      online: "online",
      country: country,
      birthday: birthday,
      subjects: {
        to_learn: LessonsForHelping,
        to_teach: LessonsForLearning,
      },
      chat_rooms: [],
      reviews: [],
    });
    if (data.is_registrate) {
      dispatch(SetError("You are registrate!"));
      dispatch(SetRedirect("/login"));
    } else dispatch(SetRedirect("/registration/confirm"));
  };

export const SignIn = (email, password) => async (dispatch) => {
  let data = await AuthAPI.signIn(email, password);
  if (data.no_user) {
    dispatch(SetError("You are not registred!"));
    dispatch(SetRedirect("/registration"));
    return;
  }
  if (data.no_password) dispatch(SetError("Wrong password or login"));
  else {
    localStorage.setItem("token", data.token);
    await dispatch(GetMeData());
  }
};

export const SignOut = () => async (dispatch) => {
  let data = await AuthAPI.logout();
  if (data.resultCode === 0) dispatch(SetAuthData(null, null, null, false));
};

export default AuthReducer;
