import React, { useEffect, useState, ReactDOM, useRef } from "react";
import { useSelector } from "react-redux";
import { getMessages } from "../../Redux/Selectors/DialogsSelector.js";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "./Messanger.scss";
import message_ava from "./../../images/ava.png";
import MessageForm from "./MessageForm.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";

const MessageList = () => {
  const messages = useSelector(getMessages);
  const [messages_for_show, setMessagesForShow] = useState(messages);
  const [photos, setPhotos] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [message_for_search, setMessageForSearch] = useState([]);
  const [display_none, setDisplayNone] = useState(false);

  const scrollMessegeList = React.createRef();
  const [show, setShow] = useState(false);
  useEffect(() => {
    messages.map((m) =>
      m.photo && !photos.includes(m.photo)
        ? setPhotos((lastData) => {
            lastData.push(m.photo);
            return lastData;
          })
        : null
    );
  }, [messages]);
  let first = true;
  let last_message = "you_first_message";
  let message_to_find = React.createRef(null);
  useEffect(() => {
    scrollMessegeList.current.scrollTop =
      scrollMessegeList.current.scrollHeight;
    if (message_to_find.current) {
      scrollMessegeList.current.scrollTop =
        scrollMessegeList.current.scrollHeight -
        (scrollMessegeList.current.getBoundingClientRect().bottom -
          message_to_find.current.getBoundingClientRect().top);
      setTimeout(() => {
        message_to_find.current.classList.remove("AUE");
      }, 3000);
    }
  }, [messages_for_show]);
  const MessageToFind = (id) => {
    setMessagesForShow((lastData) => {
      let newData = [];
      lastData.map((m) => {
        if (m.fromSearch) {
          m.fromSearch = false;
        }
        if (m.id === id) {
          m.fromSearch = true;
        }
        newData.push(m);
        return null;
      });
      return newData;
    });
    setDisplayNone(false);
  };
  const FilterMessage = (s) => {
    if (s === "") {
      setDisplayNone(false);
    } else {
      setDisplayNone(true);
      setMessageForSearch(() => {
        return messages.filter(
          (m) => m.message.toLowerCase().indexOf(s) !== -1
        );
      });
    }
  };
  return (
    <div className="col-8 h-75  message_list_global_container">
      <MessageListHeader FilterMessage={FilterMessage} />

      <div
        className={`message_list_container ${
          display_none ? "display_none" : ""
        }`}
        ref={scrollMessegeList}
      >
        <div className={`message_list`}>
          {messages_for_show.map((m) => {
            if (last_message === m.whom) first = false;
            if (last_message !== m.whom) {
              first = true;
              last_message = m.whom;
            }
            if (last_message === "you_first_message") last_message = m.whom;

            return (
              <div
                className={
                  m.whom === "my"
                    ? `my_m ${first ? "first" : ""} ${
                        m.fromSearch ? "AUE" : ""
                      }`
                    : `him_m ${first ? "first" : ""} ${
                        m.fromSearch ? "AUE" : ""
                      }`
                }
                ref={m.fromSearch ? message_to_find : null}
              >
                {first && (
                  <img
                    src={
                      m.whom === "my"
                        ? "https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
                        : "https://spark.ru/public/img/user_ava_big.png"
                    }
                    alt="arrr"
                    className="message_ava"
                  />
                )}
                <div className="message_content">
                  <div className="w-50">
                    {m.photo && (
                      <img
                        alt=""
                        src={m.photo}
                        style={{ width: "300px" }}
                        onClick={() => {
                          setImgIndex(() => {
                            return photos.indexOf(m.photo);
                          });
                          setShow(true);
                        }}
                      />
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
                  {m.message && <div className="messege_text">{m.message}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MessageSearchList
        message_for_search={message_for_search}
        MessageToFind={MessageToFind}
        display_none={!display_none}
      />
      <MessageForm display_global_none={display_none} />
      <LargePhotosPreview
        show={show}
        setShow={setShow}
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        photos={photos}
      />
    </div>
  );
};

export default MessageList;
