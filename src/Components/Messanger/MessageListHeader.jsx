import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import message_ava from "./../../images/ava.png";
import "./Messanger.scss";

const MessageListHeader = ({ FilterMessage }) => {
  return (
    <div className="message_list_header_global_container">
      <div>
        <div>{"Name, Surname"}</div>
        <div>last seen...</div>
      </div>
      <MessageListSearchForm FilterMessage={FilterMessage} />
      <img src={message_ava} alt=":B" />
      <div>:</div>
    </div>
  );
};

const MessageListSearchForm = ({ FilterMessage }) => {
  let mobile = false;
  return (
    <Formik
      onSubmit={(e) => {
        FilterMessage(e.dialogs_filter_s.toLowerCase());
      }}
      initialValues={Object}
    >
      {({ handleSubmit, handleChange, touched, errors }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={handleSubmit}
          className={`search_message_in_${mobile ? "mobile_" : ""}group`}
        >
          <Form.Group>
            <InputGroup.Prepend>
              <InputGroup.Text className="search_prepend_in">
                <FontAwesomeIcon
                  icon="search"
                  color="white"
                  size={mobile ? "3x" : ""}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="dialogs_filter_s"
              onChange={handleChange}
              placeholder="Search"
              type="text"
              autocomplete="off"
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default MessageListHeader;
