import { AuthAPI } from "../../axios/axios";
import { SetError, SetRedirect } from "./AppReducer";
import { SetProfile } from "./ProfileReducer";

const SET_AUTH_DATA = "auth/SET-AUTH-DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let InintialState = {
  email: null,
  login: null,
  isAuth: false,
  captcha: null,
};

const AuthReducer = (state = InintialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return action.data;
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
export const SignUp = (
  email,
  password,
  name,
  surname,
  birthday,
  LessonsForHelping,
  LessonsForLearning
) => async (dispatch) => {
  let data = await AuthAPI.signUp({
    email: email,
    password: password,
    name: name,
    surname: surname,
    birthday: birthday,
    subjects: {
      to_learn: LessonsForHelping,
      to_teach: LessonsForLearning,
    },
  });
  if (data.is_registrate) {
    dispatch(SetError("You are registrate!"));
    dispatch(SetRedirect("/login"));
  } else dispatch(SetRedirect("/registration/confirm"));
};
// export const LoginAuth = (email, password, rememberMe, captcha) => async (
//   dispatch
// ) => {
//   let data = await AuthAPI.login(email, password, rememberMe, captcha);
//   console.log(data);
//   switch (data.resultCode) {
//     case 0:
//       dispatch(GetMeData());
//       dispatch(SetCaptcha(null));
//       break;
//     case 1:
//       dispatch(
//         stopSubmit("login", {
//           _error: data.messages[0],
//         })
//       );
//       dispatch(SetCaptcha(null));
//       break;
//     case 10:
//       let captchaData = await SecurityAPI.getCaptcha();
//       dispatch(
//         stopSubmit("login", {
//           _error: data.messages[0],
//         })
//       );
//       dispatch(SetCaptcha(captchaData.url));
//       break;
//     default:
//       return;
//   }
// };

export const SignIn = (email, password) => async (dispatch) => {
  let data = await AuthAPI.signIn(email, password);
  console.log(data);
  if (data.no_user) {
    dispatch(SetError("You are not registred!"));
    dispatch(SetRedirect("/registration"));
    return;
  }
  if (data.no_password) dispatch(SetError("Wrong password or login"));
  else {
    dispatch(SetAuthData(data._id, data.email, data.login, true));
    dispatch(
      SetProfile({
        id: data._id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        birthday: data.birthday,
        subjects: {
          to_learn: data.to_learn,
          to_teach: data.to_teach,
        },
      })
    );
    dispatch(SetRedirect("/profile"));
  }
};

export const SignOut = () => async (dispatch) => {
  let data = await AuthAPI.logout();
  if (data.resultCode === 0) dispatch(SetAuthData(null, null, null, false));
};

export default AuthReducer;
