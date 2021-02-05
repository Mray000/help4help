import ProfileReducer from "./Reducer/ProfileReducer";
import DialogsReducer from "./Reducer/DialogsReducer";
import UsersReducer from "./Reducer/UserReducer";
import AuthReducer from "./Reducer/AuthReducer";
import AppReducer from "./Reducer/AppReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
const {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} = require("redux");

let reducers = combineReducers({
  Profile: ProfileReducer,
  Dialogs: DialogsReducer,
  Users: UsersReducer,
  Auth: AuthReducer,
  App: AppReducer,
  form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
