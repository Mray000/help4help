import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import ava from "./../../../images/ava.png";
import "../Messenger.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetRedirect } from "../../../Redux/Reducer/AppReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPhone,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getIsTyping } from "../../../Redux/Selectors/MessengerSelector";
import moment from "moment";

const MessageListHeader = ({
  FilterMessage,
  select_messages_id,
  messages_for_search,
  setSelectMessage,
  setReplyMessage,
  current_self,
  setMessagesForSearch,
  online,
  RemoveDates,
}) => {
  const dispatch = useDispatch();

  const [find, SetFind] = useState(false);

  const SelectDelete = () => {
    RemoveDates(select_messages_id);
    setSelectMessage([]);
  };
  const SelectReply = () => {
    setReplyMessage(select_messages_id);
    setSelectMessage([]);
  };
  const is_typing = useSelector(getIsTyping).find(
    (t) => t.from === current_self.id
  );

  useEffect(() => {
    if (messages_for_search[0] === 0) SetFind(false);
  }, [messages_for_search]);

  const online_date = useRef();
  useEffect(() => {
    let online_timer;
    if (online === "online") clearInterval(online_timer);
    else {
      online_timer = setInterval(() => {
        if (online_date.current)
          online_date.current.innerText = moment(online).fromNow();
      }, 6000);
    }
    return () => clearInterval(online_timer);
  }, [online]);
  return (
    <>
      {!select_messages_id.length && !find && (
        <div className="message_list_header_global_container">
          <div style={{ display: "flex", width: "85%", alignItems: "center" }}>
            <div
              className="center_img"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "100%",
                marginRight: "5px",
                cursor: "pointer",
              }}
            >
              <img
                src={current_self.ava || ava}
                alt=":B"
                onClick={() =>
                  dispatch(SetRedirect("profile/" + current_self.id))
                }
              />
            </div>
            <div>
              <div>{current_self.name_surname}</div>
              {is_typing ? (
                <div>
                  {is_typing.type === 1
                    ? "typing message..."
                    : "record audio..."}
                </div>
              ) : (
                <div ref={online_date}>
                  {online === "online" ? "online" : moment(online).fromNow()}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "15%",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="icon_opacity"
              onClick={() => SetFind(true)}
            />
            <FontAwesomeIcon
              icon={faPhone}
              flip="horizontal"
              className="icon_opacity"
            />
            <FontAwesomeIcon icon={faEllipsisV} className="icon_opacity" />
          </div>
        </div>
      )}
      {!!select_messages_id.length && (
        <div className="select_message_header_container">
          <Button onClick={SelectDelete} variant="danger">
            Delete
          </Button>
          <Button onClick={SelectReply} variant="success">
            Reply
          </Button>
        </div>
      )}
      {find && (
        <MessageListSearchForm
          SetFind={SetFind}
          FilterMessage={FilterMessage}
          setMessagesForSearch={setMessagesForSearch}
        />
      )}
    </>
  );
};

const MessageListSearchForm = ({
  FilterMessage,
  SetFind,
  setMessagesForSearch,
}) => {
  return (
    <Formik
      onSubmit={(values) =>
        FilterMessage(values.messages_filter_s.toLowerCase())
      }
      initialValues={{ messages_filter_s: "" }}
    >
      {({ handleSubmit, handleChange }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={handleSubmit}
          className="search_message_in_group"
        >
          <FontAwesomeIcon icon={faSearch} />
          <Form.Control
            name="messages_filter_s"
            onChange={handleChange}
            placeholder="Search"
            type="text"
            autoComplete="off"
            autoFocus={true}
          />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              SetFind(false);
              setMessagesForSearch([0]);
              FilterMessage("");
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(MessageListHeader);
