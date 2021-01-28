import { GetMeData } from "./AuthReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const SET_ERROR = "SET_ERROR";

let InintialState = {
  initialized: false,
  error: "",
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
    default:
      return state;
  }
};

const SetInitial = () => ({
  type: INITIALIZED_SUCCESS,
});

export const SetError = (error) => ({
  type: SET_ERROR,
  error: error,
});

export const Initialing = () => async (dispatch) => {
  let promise1 = dispatch(GetMeData());
  Promise.all([promise1]).then(() => dispatch(SetInitial()));
};

export default AuthReducer;
