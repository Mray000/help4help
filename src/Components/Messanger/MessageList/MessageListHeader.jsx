import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import message_ava from "./../../../images/ava.png";
import "./../Messanger.scss";

const MessageListHeader = ({
  FilterMessage,
  select_messages_id,
  message_for_search,
  DeleteMessage,
  setSelectMessage,
  setReplyMessage,
}) => {
  const SelectDelete = () => {
    DeleteMessage(select_messages_id);
    setSelectMessage([]);
  };
  const SelectReply = () => {
    setReplyMessage(select_messages_id);
    setSelectMessage([]);
  };
  if (select_messages_id.length === 0) {
    return (
      <div className="message_list_header_global_container">
        <div>
          <div>{"Name Surname"}</div>
        </div>
        <MessageListSearchForm
          FilterMessage={FilterMessage}
          message_for_search={message_for_search}
        />
        <img src={message_ava} alt=":B" />
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

const MessageListSearchForm = ({ FilterMessage, message_for_search }) => {
  let mobile = false;
  let formik = useRef(null);
  useEffect(() => {
    if (message_for_search.find((e) => e === 0) === 0) {
      formik.current.value = "";
    }
  }, [message_for_search]);
  return (
    <Formik
      onSubmit={(values) => {
        FilterMessage(values.messages_filter_s.toLowerCase());
      }}
      initialValues={{ messages_filter_s: " " }}
    >
      {({ handleSubmit, handleChange }) => (
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
              autoСomplete="off"
              ref={formik}
              autocomplete="off"
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(MessageListHeader);
// export default MessageListHeader;
