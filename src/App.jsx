import React, { useEffect } from "react";
import "./App.scss";
import Header from "./Components/Header/Header.jsx";
import { Redirect, Route, Switch } from "react-router-dom";
import WithSuspence from "./utils/WithSuspence";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import Messenger from "./Components/Messenger/Messenger";
import Error from "./mini-components/Error";
import { useDispatch, useSelector } from "react-redux";
import { getRedirect } from "./Redux/Selectors/AppSelectors";
import { Initialing, SetError, SetRedirect } from "./Redux/Reducer/AppReducer";
import Test from "./Components/Test";
import Preloader from "./mini-components/Preloader";
import PageNotFound from "./mini-components/PageNotFound";
import { getAuthId } from "./Redux/Selectors/AuthSelectors";
import Users from "./Components/Users/Users";
const Login = React.lazy(() => import("./Components/Login/Login.jsx"));

const Registration = React.lazy(() =>
  import("./Components/Login/Registration/Registration.jsx")
);
const Video = React.lazy(() => import("./Components/Video/Video.jsx"));

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.App.initialized);
  const redirect = useSelector(getRedirect);
  const my_id = useSelector(getAuthId);
  useEffect(() => {
    if (!initialized) dispatch(Initialing());
    setTimeout(() => {
      dispatch(SetError("Errrrrrrrrorr!"));
    }, 3000);
  }, [initialized]);

  if (!initialized) return <Preloader height={100} />;
  if (redirect) {
    setTimeout(() => dispatch(SetRedirect("")), 0);
    return <Redirect to={redirect} />; //тут происходит редирект
  }
  window.onbeforeunload = () => {
    navigator.sendBeacon(
      "http://localhost:3010/disconnect",
      JSON.stringify({ id: my_id })
    );
  };

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );
  console.log(mobile);

  return (
    <div className="app-wrapper">
      <Header mobile={mobile} />
      <div className="container  app_wraper_content">
        <Switch>
          <Route path="/login" render={WithSuspence(Login)} />
          <Route path="/profile" component={ProfileContainer} />
          <Route path="/messenger" component={Messenger} />
          <Route path="/test" component={Test} />
          <Route path="/registration" render={WithSuspence(Registration)} />
          <Route path="/users" component={Users} />
          <Route path="/video" render={WithSuspence(Video)} />
          <Route path="/page_not_found" component={PageNotFound} />
          <Route render={() => <Redirect to={"/profile/" + my_id} />} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Error />
    </div>
  );
};

export default App;
