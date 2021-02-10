import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header.jsx";
import { Redirect, Route } from "react-router-dom";
import WithSuspence from "./utils/WithSuspence";
import Profile from "./Components/Profile/Profile";
import Messenger from "./Components/Messenger/Messenger";
import Error from "./mini-components/Error";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "./Redux/Selectors/AppSelectors";
import { SetRedirect } from "./Redux/Reducer/AppReducer";
import Test from "./Components/Test";
const Login = React.lazy(() => import("./Components/Login/Login.jsx"));
const Registration = React.lazy(() =>
  import("./Components/Login/Registration/Registration.jsx")
);
const Video = React.lazy(() => import("./Components/Video/Video.jsx"));

// useEffect(() => {
//   Initialing();
// }, [Initialing]);s
// if (!initialized) return <Preloader />;

const App = () => {
  const dispatch = useDispatch();
  const redirect = useSelector(getRedirect);
  if (redirect) {
    setTimeout(() => {
      dispatch(SetRedirect(""));
    }, 0);
    return <Redirect to={redirect} />; //тут происходит редирект
  }

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
    ? true
    : false;

  return (
    <div className="app-wrapper">
      <Header mobile={mobile} />
      <div className="container  app_wraper_content">
        <Route path="/login" render={WithSuspence(Login)} />
        <Route path="/profile" render={() => <Profile mobile={mobile} />} />
        <Route path="/messenger" render={() => <Messenger mobile={mobile} />} />
        <Route path="/registration" render={WithSuspence(Registration)} />
        <Route path="/video" render={WithSuspence(Video)} />
        <Route path="/test" render={() => <Test />} />
      </div>
      <Error />
    </div>
  );
};

export default App;
