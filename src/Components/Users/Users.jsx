import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../mini-components/Preloader";
import { GetUsers } from "../../Redux/Reducer/UserReducer";
import { getUsers } from "../../Redux/Selectors/UsersSelector";
import "./Users.scss";
import ava from "./../../images/ava.png";
import { SetRedirect } from "../../Redux/Reducer/AppReducer";
import moment from "moment";

const Users = () => {
  let users = useSelector(getUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  if (!users) return <Preloader />;
  return (
    <div className="users_container">
      {users.map((u) => (
        <UserItem u={u} dispatch={dispatch} key={u.id} />
      ))}
    </div>
  );
};

const UserItem = ({ u, dispatch }) => {
  function getEmail() {
    let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let string = "";
    for (let ii = 0; ii < 8; ii++) {
      string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + "@gmail.com";
  }
  return (
    <div className="user">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            className="center_img"
            style={{ width: "40px", height: "40px" }}
            onClick={() => dispatch(SetRedirect("profile/" + u.id))}
          >
            <img src={u.ava || ava} alt="" />
          </div>
          <div>
            <div>{u.name + " " + u.surname}</div>
            <div style={{ fontWeight: "200", lineHeight: 1 }}>{u.country}</div>
          </div>
        </div>
        <div>
          <div>{moment().diff(moment(u.birthday), "years")} years old</div>
          <div>{getEmail()}</div>
        </div>
      </div>
      <div>
        <div className="subjects">
          <div>
            <div>
              Teach:&nbsp;
              {u.subjects.to_teach.map((s, i) => (
                <span>
                  {s + (i === u.subjects.to_teach.length - 1 ? "." : ",")}
                </span>
              ))}
            </div>
            <div>
              Learn:&nbsp;
              {u.subjects.to_learn.map((s, i) => (
                <span>
                  {s + (i === u.subjects.to_learn.length - 1 ? "." : ",")}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => dispatch(SetRedirect("messenger?self=" + u.id))}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
