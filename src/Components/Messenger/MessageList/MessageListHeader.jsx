import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef } from "react";
import message_ava from "./../../../images/ava.png";
import "../Messenger.scss";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetRedirect } from "../../../Redux/Reducer/AppReducer";

const MessageListHeader = ({
  FilterMessage,
  select_messages_id,
  messages_for_search,
  DeleteMessage,
  setSelectMessage,
  setReplyMessage,
  current_self,
}) => {
  const dispatch = useDispatch();
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
        <MessageListSearchForm
          FilterMessage={FilterMessage}
          messages_for_search={messages_for_search}
        />
        <div>
          <div>{current_self.name_surname}</div>
        </div>
        <img
          style={{ width: "40px" }}
          src={current_self.ava ? current_self.ava : message_ava}
          alt=":B"
          onClick={() => dispatch(SetRedirect("profile/" + current_self.id))}
        />
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

const MessageListSearchForm = ({ FilterMessage, messages_for_search }) => {
  let mobile = false;
  let formik = useRef(null);
  useEffect(() => {
    if (messages_for_search.find((e) => e === 0) === 0) {
      formik.current.value = "";
    }
  }, [messages_for_search]);
  return (
    <Formik
      onSubmit={(values) => {
        FilterMessage(values.messages_filter_s.toLowerCase());
      }}
      initialValues={{ messages_filter_s: "" }}
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
              ref={formik}
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(MessageListHeader);
