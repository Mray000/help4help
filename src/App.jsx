import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header.jsx";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getRedirect } from "./Redux/Selectors/AppSelectors";
const Login = React.lazy(() => import("./Components/Login/Login.jsx"));
const Registration = React.lazy(() =>
  import("./Components/Login/Registration/Registration.jsx")
);
// useEffect(() => {
//   Initialing();
// }, [Initialing]);
// if (!initialized) return <Preloader />;
// const dispatch = useDispatch();
// if (redirect) {
//   // let to = redirect;
//   // dispatch(SetRedirect(""));
//   // console.log(to);
//   return <Redirect to="/dialogs" />;
// }

const Video = React.lazy(() => import("./Components/Video/Video.jsx"));

const App = () => {
  const redirect = useSelector(getRedirect);
  if (redirect) return <Redirect to={redirect} />; // тут происходит редирект

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
    ? true
    : false;

  return (
    <div className="app-wrapper">
      <Header mobile={mobile} />
      <div className="container  app_wraper_content">
        <Switch>
          <Route path="/login" render={WithSuspence(Login)} />
          <Route path="/profile" render={() => <Profile mobile={mobile} />} />
          <Route
            path="/dialogs"
            render={() => <Messanger mobile={mobile} />} // сюда должно редиректитть
          />
          <Route path="/registration" render={WithSuspence(Registration)} />
          <Route path="/video" render={WithSuspence(Video)} />
          <Route path="/test" render={Test} />
        </Switch>
      </div>
      <Error />
    </div>
  );
};

const Test = () => {
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return await response.json();
  }
  const TestServer = () => {
    // postData("http://localhost:3010", { username: "Aynur" }).then((p) =>
    //   alert(p.username)
    // );
    // UsersAPI.getUsers().then((d) => console.log(d));
    fetch("https://afternoon-scrubland-20123.herokuapp.com/api/users", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: `Token 2e0042a0b7d2dbfb3058f14124cba7da84d9f643`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      // body: JSON.stringify(data),
    })
      .then((p) => p.json())
      .then((d) => console.log(d));
  };
  return <Button onClick={TestServer}>Test</Button>;
};

export default App;
