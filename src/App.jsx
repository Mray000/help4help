import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header.jsx";
import { BrowserRouter, Route } from "react-router-dom";
// import Users from "./Compinents/Users/Users.jsx";
// import ProfileContainer from "./Compinents/Profile/Profile-Container";
// import BarContainer from "./Compinents/Bar/BarContainer";
// import { compose } from "redux";
// import { Initialing } from "./Redux/Reducer/AppReducer";
// import Preloader from "./mini-components/Preloader";
// import WithSuspence from "./utils/WithSuspence";
// import Dialogs from "./Compinents/Dialogs/Dialogs";
// import ProfileEdit from "./Compinents/Profile/Edit/ProfileEdit";
import WithSuspence from "./utils/WithSuspence";
import Profile from "./Components/Profile/Profile";
import Messanger from "./Components/Messanger/Messanger";
import Error from "./mini-components/Error";
const Login = React.lazy(() => import("./Components/Login/Login.jsx"));
const Registration = React.lazy(() =>
  import("./Components/Login/Registration/Registration.jsx")
);
const Video = React.lazy(() => import("./Components/Video/Video.jsx"));

const App = () => {
  // useEffect(() => {
  //   Initialing();
  // }, [Initialing]);
  // if (!initialized) return <Preloader />;
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
    ? true
    : false;

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header mobile={mobile} />
        <div className="container  app_wraper_content">
          <Route path="/login" render={WithSuspence(Login)} />
          <Route path="/profile" render={() => <Profile mobile={mobile} />} />
          <Route path="/dialogs" render={() => <Messanger mobile={mobile} />} />
          <Route path="/registration" render={WithSuspence(Registration)} />
          <Route path="/video" render={WithSuspence(Video)} />
          {/* <Route path="*" render={() => <div>{"Page not found :("}</div>} /> */}
        </div>
        <Error />
      </div>
    </BrowserRouter>
  );
};

export default App;
