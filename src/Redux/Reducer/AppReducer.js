import { GetMeData } from "./AuthReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let InintialState = {
  initialized: false,
};

const AuthReducer = (state = InintialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

const SetInitial = () => ({
  type: INITIALIZED_SUCCESS,
});

export const Initialing = () => async (dispatch) => {
    let promise1 = dispatch(GetMeData());
    Promise.all([promise1]).then(() => dispatch(SetInitial()));
  };


export default AuthReducer;
