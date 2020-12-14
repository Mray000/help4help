import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../Redux/Selectors/DialogsSelector.js";
import "./Messanger.scss";
import message_ava from "./../../images/ava.png";
import MessageForm from "./MessageForm.jsx";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";
import { DeleteMessage } from "../../Redux/Reducer/DialogsReducer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "bootstrap";

const MessageList = () => {
  const my_name = "Aynur Habibullin";
  const him_name = "Stas KakayProsto";
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();
  const [search_message_id, setMessageSearchId] = useState(0);
  const [select_messages_id, setSelectMessage] = useState([]);
  const [select_messages, setSelectMessages] = useState([]);
  const [reply_messages_id, setReplyMessage] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [message_for_search, setMessageForSearch] = useState([]);
  const [display_none, setDisplayNone] = useState(false);
  const [mouseOnChild, setMouseOnChild] = useState(false);

  const [show, setShow] = useState(false);

  const scrollMessegeList = React.createRef();

  let message_to_find = React.createRef(null);
  useEffect(() => {
    scrollMessegeList.current.scrollTop =
      scrollMessegeList.current.scrollHeight;
    messages.map((m) =>
      m.photo && !photos.includes(m.photo)
        ? setPhotos((lastData) => {
            lastData.push(m.photo);
            return lastData;
          })
        : null
    );
  }, [messages]);

  useEffect(() => {
    if (message_to_find.current) {
      scrollMessegeList.current.scrollTop =
        scrollMessegeList.current.scrollHeight;
      scrollMessegeList.current.scrollTop =
        scrollMessegeList.current.scrollHeight -
        (scrollMessegeList.current.getBoundingClientRect().bottom -
          message_to_find.current.getBoundingClientRect().top);
      setTimeout(() => {
        setMessageSearchId(0);
      }, 3000);
    }
  }, [search_message_id]);
  useEffect(() => {
    setSelectMessages(() => {
      let newMass = [];
      select_messages_id.map((id) => {
        messages.map((m) => {
          if (m.id === id) newMass.push(m);
        });
      });
      return newMass;
    });
  }, [select_messages_id]);
  const MessageToFind = (id) => {
    setMessageSearchId(id);
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
  const SelectMessage = (id) => {
    if (!select_messages_id.includes(id)) {
      setSelectMessage((l) => {
        l.push(id);
        return l.slice();
      });
    } else {
      setSelectMessage((l) => {
        return l.filter((n) => n !== id);
      });
    }
  };
  const FindReplyM = (fl, id = null) => {
    if (fl != null) {
      return messages.find(
        (m) => m.id === reply_messages_id[fl ? 0 : reply_messages_id.length - 1]
      );
    } else return messages.find((m) => m.id === id);
  };
  let last = false;
  return (
    <div className="col-8 h-75  message_list_global_container">
      <MessageListHeader
        select_messages_id={select_messages_id}
        FilterMessage={FilterMessage}
        DeleteMessage={(id) => dispatch(DeleteMessage(id))}
        setSelectMessage={setSelectMessage}
        setReplyMessage={setReplyMessage}
      />
      <div
        className={`message_list_container ${
          display_none ? "display_none" : ""
        } ${reply_messages_id.length > 0 ? "height_76" : ""}`}
        ref={scrollMessegeList}
      >
        <div className={`message_list`}>
          {messages.map((m) => {
            if (!messages[messages.indexOf(m) + 1]) {
              last = true;
            } else if (messages[messages.indexOf(m) + 1].whom === m.whom)
              last = false;
            else {
              last = true;
            }
            return (
              <div
                className={
                  m.whom === "my"
                    ? `my_m ${last ? "last" : ""} ${
                        search_message_id === m.id ? "AUE" : ""
                      } ${select_messages_id.includes(m.id) ? "select" : ""}`
                    : `him_m ${last ? "last" : ""} ${
                        search_message_id === m.id ? "AUE" : ""
                      } ${select_messages_id.includes(m.id) ? "select" : ""}`
                }
                ref={search_message_id === m.id ? message_to_find : null}
                onClick={() => {
                  if (!mouseOnChild) {
                    SelectMessage(m.id);
                  }
                }}
              >
                {last && (
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
                        alt="штав фото"
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
                  {m.message && <div className="message_text">{m.message}</div>}

                  {m.reply ? (
                    <div
                      className="messages_reply_container"
                      onMouseEnter={() => setMouseOnChild(true)}
                      onMouseLeave={() => setMouseOnChild(false)}
                    >
                      {m.reply.map((id) => (
                        <div
                          className="message_reply"
                          onClick={() => MessageToFind(id)}
                        >
                          <div className="message_reply_name">
                            {FindReplyM(null, id).whom === "my"
                              ? my_name
                              : him_name}
                          </div>
                          <div className="message_reply_content">
                            {FindReplyM(null, id).photo && (
                              <div className="message_reply_img w-50">
                                <img
                                  src={FindReplyM(null, id).photo}
                                  alt=""
                                  style={{ width: "300px" }}
                                />
                              </div>
                            )}
                            {FindReplyM(null, id).audio && (
                              <div className="message_reply_audio w-50">
                                <audio
                                  controls
                                  preload="none"
                                  className="audio_message"
                                  style={{ width: "300px" }}
                                >
                                  <source
                                    src={FindReplyM(null, id).audio}
                                    type="audio/mpeg"
                                  />
                                </audio>
                              </div>
                            )}
                            {FindReplyM(null, id).message && (
                              <div className="message_reply_text">
                                {FindReplyM(null, id).message}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
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
      {reply_messages_id.length > 0 ? (
        <div className="reply_message_pre_input_container">
          <div className="reply_icon">
            <FontAwesomeIcon icon={faReply} size={"2x"} />
          </div>
          {reply_messages_id.length < 2 && FindReplyM(1).photo ? (
            <div className="reply_img">
              <img src={FindReplyM(1).photo} alt="" />
            </div>
          ) : null}
          <div className="reply_name_message">
            <div className="reply_name">
              {reply_messages_id.length < 2
                ? FindReplyM(1).whom === "my"
                  ? my_name
                  : him_name
                : "Messages reply"}
            </div>
            <div className="reply_message">
              {reply_messages_id.length < 2
                ? FindReplyM(0).message
                  ? FindReplyM(0).message.substring(0, 16) + "..."
                  : FindReplyM(0).photo
                  ? "Photo"
                  : FindReplyM(0).audio
                  ? "Audio"
                  : null
                : `${reply_messages_id.length} messages reply`}
            </div>
          </div>
          <div className="reply_cross">
            <FontAwesomeIcon
              icon={faTimes}
              size="1x"
              onClick={() => setReplyMessage([])}
            />
          </div>
        </div>
      ) : null}

      <MessageForm
        reply_messages_id={reply_messages_id}
        display_global_none={display_none}
        setReplyMessage={setReplyMessage}
      />
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
