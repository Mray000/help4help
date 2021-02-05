import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDialogsList } from "../../../Redux/Selectors/DialogsSelector";
import ava from "./../../../images/ava.png";
import "./../Messanger.scss";

const DialogsList = () => {
  let people_list_global = useSelector(getDialogsList);
  const [people_list, setPeople_list] = useState(people_list_global);
  const FilterDialogs = (s) => {
    setPeople_list(() =>
      people_list_global.filter((e) => e.name.toLowerCase().includes(s))
    );
  };
  return (
    <div className="col-3 dialogs_list_global_container">
      <DialogsListSearch FilterDialogs={FilterDialogs} />
      {people_list.map((p) => {
        return (
          <NavLink
            to={"/dialogs/" + p.id}
            className="dialog_list_humon_container"
            key={p.id}
          >
            <div className="dialog_list_humon">
              <img className="avatar" src={p.ava ? p.ava : ava} alt="" />
              <div className="dialog_list_name_last_m">
                <div>{p.name}</div>
                <div className="last_message">Last message...</div>
              </div>
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
      onSubmit={(e) => {
        FilterDialogs(e.dialogs_filter_s.toLowerCase());
      }}
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
