import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../Redux/Selectors/DialogsSelector.js";
// import { useStore } from "react-redux";
import { useStore } from "react-redux";
import "./Messanger.scss";
import { Field, Formik } from "formik";
import Form from "react-bootstrap/Form";
import { Button, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import message_ava from "./../../images/ava.png";
import { AddMessage } from "./../../Redux/Reducer/DialogsReducer.js";
import { ReactMic } from "react-mic";
import MessageForm from "./MessageForm.jsx";
// import { Field, reduxForm } from "redux-form";

const MessageList = () => {
  const messages = useSelector(getMessages);
  const scrollMessegeList = React.createRef();
  useEffect(() => {
    scrollMessegeList.current.scrollTop =
      scrollMessegeList.current.scrollHeight;
  }, [messages]);
  let first = true;
  let last_message = "you_first_message";
  return (
    <div className="col-8 h-75  message_list_global_container">
      <div className="h-75 message_list_container" ref={scrollMessegeList}>
        <div className="message_list">
          {messages.map((m) => {
            if (last_message === "my" && m.whom === "my") first = false;
            if (last_message === "him" && m.whom === "him") first = false;
            if (last_message === "my" && m.whom === "him") {
              first = true;
              last_message = "him";
            }
            if (last_message === "him" && m.whom === "my") {
              first = true;
              last_message = "my";
            }
            if (last_message === "you_first_message") last_message = m.whom;
            return (
              <div
                className={
                  m.whom === "my"
                    ? `my_m${first ? " first" : ""}`
                    : `him_m${first ? " first" : ""}`
                }
              >
                {first && (
                  <img
                    src={
                      m.whom === "my"
                        ? "https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
                        : message_ava
                    }
                    alt="arrr"
                    className="message_ava"
                  />
                )}
                <div className="message_content">
                  <div className="w-50">
                    {m.photo && (
                      <img alt="" src={m.photo} style={{ width: "300px" }} />
                    )}
                  </div>
                  <div className="w-50">
                    {m.audio && (
                      <audio
                        controls
                        preload="none"
                        className="audio_message"
                        style={{ width: "300px" }}
                      >
                        <source src={m.audio} type="audio/mpeg" />
                      </audio>
                    )}
                  </div>
                  {m.message && <pre>{m.message}</pre>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MessageForm />
    </div>
  );
};

export default MessageList;
