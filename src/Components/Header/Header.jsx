import React from "react";
import "./Header.scss";
import help4help from "./../../images/logo.png";
import ava from "./../../images/ava.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthId, getIsAuth } from "../../Redux/Selectors/AuthSelectors";
import { ResetData, SetRedirect } from "../../Redux/Reducer/AppReducer";
import { getDialogsList } from "../../Redux/Selectors/MessengerSelector";

const Header = ({ mobile }) => {
  const my_id = useSelector(getAuthId);
  const dialogs = useSelector(getDialogsList);
  const message_link = dialogs ? (dialogs.length ? dialogs[0].self.id : 0) : 0;
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();
  const Logout = () => {
    localStorage.setItem("token", "");
    dispatch(ResetData());
    dispatch(SetRedirect("/login"));
  };
  if (isAuth)
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        id={`global_header_${mobile ? "mobile_" : ""}container`}
      >
        <img src={help4help} alt="Наша ава!" id="help4help_header_img" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <Search mobile={mobile} /> */}
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/video" className="nav-link">
                Lesson
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/messenger?self=" + message_link}
                className="nav-link"
              >
                Messenger
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={ava} alt="" id="user_avatar_img" />
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink to={`/profile/${my_id}`} className="dropdown-item">
                  Profile
                </NavLink>
                <div className="dropdown-item" onClick={Logout}>
                  Logout
                </div>
                <span className="dropdown-item">Another action</span>
                <span className="dropdown-item">Something else here</span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  else
    return (
      <nav
        style={{
          textAlign: "center",
          height: "10vh",
          backgroundColor: "black",
          color: "white",
          lineHeight: "10vh",
          fontWeight: "700",
        }}
      >
        HelpForHelp
      </nav>
    );
};

// const Search = ({ mobile }) => {
//   return (
//     <Formik onSubmit={console.log} initialValues={Object}>
//       {({ handleSubmit, handleChange, touched, errors }) => (
//         <Form
//           onChange={handleSubmit}
//           className={`search_in_${mobile ? "mobile_" : ""}group`}
//         >
//           <InputGroup>
//             <InputGroup.Prepend>
//               <InputGroup.Text className="search_prepend_in">
//                 <FontAwesomeIcon
//                   icon={faSearch}
//                   color="blue"
//                   size={mobile ? `3x` : null}
//                 />
//               </InputGroup.Text>
//             </InputGroup.Prepend>
//             <Form.Control
//               required
//               name="user"
//               onChange={handleChange}
//               placeholder="Search"
//               className="search_in"
//               type="search"
//             />
//           </InputGroup>
//         </Form>
//       )}
//     </Formik>
//   );
// };

export default Header;
