import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, InputGroup, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import ava from "./../../../images/ava.png";
import "../Messenger.scss";
import { SetMessages } from "../../../Redux/Reducer/MessengerReducer";

const DialogsList = ({ dialogs_list_global }) => {
  const [people_list, setPeople_list] = useState(dialogs_list_global);
  const dispatch = useDispatch();
  const FilterDialogs = (s) => {
    setPeople_list(() =>
      dialogs_list_global.filter((e) =>
        e.self.name_surname.toLowerCase().includes(s)
      )
    );
  };
  useEffect(() => {
    setPeople_list(dialogs_list_global);
  }, [dialogs_list_global]);
  let history = useHistory();
  // let pathname = ;
  return (
    <div className="col-3 dialogs_list_global_container">
      <DialogsListSearch FilterDialogs={FilterDialogs} />
      {people_list.map((p) => {
        return (
          <NavLink
            exact
            to={"/messenger?self=" + p.self.id}
            className={
              history.location.pathname + history.location.search ===
              "/messenger?self=" + p.self.id
                ? "dialog_list_humon_active"
                : "dialog_list_humon"
            }
            key={p.self.id}
            onClick={() => dispatch(SetMessages(p.id))}
          >
            <img
              className="avatar"
              src={p.self.ava ? p.self.ava : ava}
              alt="ava"
            />
            <div className="name_surname_last_message">
              <div>{p.self.name_surname}</div>
              <div className="last_message">Last message...</div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

const DialogsListSearch = ({ FilterDialogs }) => {
  let mobile = false;
  return (
    <Formik
      onSubmit={(e) => FilterDialogs(e.dialogs_filter_s.toLowerCase())}
      initialValues={Object}
    >
      {({ handleSubmit, handleChange, touched, errors }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={handleSubmit}
          className={`search_dialogs_in_${mobile ? "mobile_" : ""}group`}
        >
          <Form.Group>
            <InputGroup.Prepend>
              <InputGroup.Text className="search_prepend_in">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="white"
                  size={mobile ? `3x` : null}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="dialogs_filter_s"
              onChange={handleChange}
              placeholder="Search"
              type="text"
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default DialogsList;
