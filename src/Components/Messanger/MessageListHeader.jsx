import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { Button, Form, InputGroup } from "react-bootstrap";
import React from "react";
import message_ava from "./../../images/ava.png";
import "./Messanger.scss";

const MessageListHeader = ({
  FilterMessage,
  select_messages_id,
  DeleteMessage,
  setSelectMessage,
  setReplyMessage,
}) => {
  const SelectDelete = () => {
    DeleteMessage(select_messages_id);
    setSelectMessage([]);
  };
  const SelectReply = () => {
    setReplyMessage([...select_messages_id]);
    setSelectMessage([]);
  };
  if (select_messages_id.length === 0) {
    return (
      <div className="message_list_header_global_container">
        <div>
          <div>{"Name, Surname"}</div>
          {/* <div>last seen...</div> */}
        </div>
        <MessageListSearchForm FilterMessage={FilterMessage} />
        <img src={message_ava} alt=":B" />
        <div>:</div>
      </div>
    );
  } else {
    return (
      <div className="select_message_header_container">
        <Button onClick={SelectDelete} variant="danger">
          Delete
        </Button>
        <Button onClick={SelectReply} variant="success">
          Reply
        </Button>
      </div>
    );
  }
};

const MessageListSearchForm = ({ FilterMessage }) => {
  let mobile = false;
  return (
    <Formik
      onSubmit={(e) => {
        FilterMessage(e.messages_filter_s.toLowerCase());
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
            <Form.Control
              name="messages_filter_s"
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
