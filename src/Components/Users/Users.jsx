import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../mini-components/Preloader";
import { GetUsers, SetUsers } from "../../Redux/Reducer/UserReducer";
import { getUsers } from "../../Redux/Selectors/UsersSelector";
import "./Users.scss";
import ava from "./../../images/ava.png";
import { SetRedirect } from "../../Redux/Reducer/AppReducer";
import moment from "moment";
import { Form, Field, Formik } from "formik";

const Users = () => {
  let users = useSelector(getUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  if (!users) return <Preloader />;
  return (
    <div>
      <FilterForm dispatch={dispatch} />
      <div className="users_container">
        {users.length ? (
          users.map((u) => <UserItem u={u} dispatch={dispatch} key={u.id} />)
        ) : (
          <h1 style={{ marginTop: "20px" }}>No results found😞</h1>
        )}
      </div>
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
            style={{ width: "40px", height: "40px", marginRight: "5px" }}
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
                  {s + (i === u.subjects.to_teach.length - 1 ? "." : ", ")}
                </span>
              ))}
            </div>
            <div>
              Learn:&nbsp;
              {u.subjects.to_learn.map((s, i) => (
                <span>
                  {s + (i === u.subjects.to_learn.length - 1 ? "." : ", ")}
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

const FilterForm = ({ dispatch }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "20px",
    }}
  >
    <div style={{ width: "50%" }}>
      <h2>Search</h2>
    </div>
    <Formik
      initialValues={{ fullname: "", country: "", age: 15, smart: true }}
      onSubmit={(values) => dispatch(GetUsers(values))}
    >
      {({ handleChange }) => (
        <Form
          className="form-group"
          onChange={handleChange}
          style={{ width: "50%", justifyContent: "center", min_age: "" }}
        >
          <div style={{ display: "flex" }}>
            <Field
              className="form-control"
              name="fullname"
              placeholder="Fullname"
              onChange={handleChange}
            />
            <Field
              className="form-control"
              name="country"
              placeholder="Country"
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Field
              type="number"
              className="form-control"
              name="age"
              placeholder="Min age"
              onChange={handleChange}
              style={{ width: "33.3%", border: "1px solid #ced4da" }}
            />
            <div
              style={{
                width: "33.3%",
                backgroundColor: "white",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ced4da",
              }}
            >
              <label htmlFor="flexCheckDefault">Smart</label>
              <Field
                type="checkbox"
                name="smart"
                id="flexCheckDefault"
                onChange={handleChange}
                style={{ marginLeft: "5px", marginTop: "4px" }}
              />
            </div>
            <button
              style={{ width: "33.3%", border: "1px solid #ced4da" }}
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default Users;
