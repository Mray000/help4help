import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../Redux/Selectors/DialogsSelector.js";
import "./Messanger.scss";
import message_ava from "./../../images/ava.png";
import MessageForm from "./MessageForm.jsx";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";
import { DeleteMessage } from "../../Redux/Reducer/DialogsReducer.js";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faReply,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const MessageList = () => {
  const my_name = "Aynur Habibullin";
  const him_name = "Stas KakayProsto";
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();
  const [search_message_id, setMessageSearchId] = useState(0);
  const [select_messages_id, setSelectMessage] = useState([]);
  const [reply_messages_id, setReplyMessage] = useState([]);
  const [edit_message, setEditMessage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [message_for_search, setMessageForSearch] = useState([]);
  const [display_none, setDisplayNone] = useState(false);
  const [date, setDate] = useState(
    moment(messages[messages.length - 1].date, "MMMM D YYYY h:mm").format(
      "MMMM"
    ) +
      " " +
      moment(messages[messages.length - 1].date, "MMMM D YYYY h:mm").format("D")
  );
  const [date_ref_index, setDateRefIndex] = useState(0);
  const [show, setShow] = useState(false);
  let indexOfRef = useRef(-1);
  const scrollMessegeList = React.createRef();
  let message_to_find = React.createRef(null);
  let top_date = useRef(null);
  let date_refs = useRef([]);
  let timer;

  useEffect(() => {
    scrollMessegeList.current.scrollTop =
      scrollMessegeList.current.scrollHeight;
    messages.map((m) => {
      if (m.photos && m.photos.length) {
        let mass = [];
        m.photos.map((p) => {
          if (!photos.includes(p)) mass.push(p);
        });
        setPhotos([...photos, ...mass]);
      }
    });
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
    setDateRefIndex(date_refs.current.length - 1);
    top_date.current.style.animation = "opacity0 4s 1";
    setTimeout(() => {
      top_date.current.style.opacity = "0";
    }, 4000);
  }, []);
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
  const NextDay = (m, noi) => {
    let date1 = moment(m.date, "MMMM D YYYY h:mm");
    let month1 = date1.format("MMMM");
    let day1 = date1.format("D");
    if (messages.indexOf(m) === 0) {
      if (
        !date_refs.current.find((ref) => {
          if (ref.current) {
            if (ref.current.innerText === month1 + " " + day1) {
              return true;
            } else return false;
          } else return false;
        })
      ) {
        date_refs.current.push(React.createRef());
        indexOfRef.current = indexOfRef.current + 1;
        return (
          <div
            className="next_day_date"
            ref={date_refs.current[indexOfRef.current]}
          >
            {month1 + " " + day1}
          </div>
        );
      } else
        return (
          <div
            className="next_day_date"
            ref={
              date_refs.current[
                date_refs.current.findIndex(
                  (ref) => ref.current.innerText === month1 + " " + day1
                )
              ]
            }
          >
            {month1 + " " + day1}
          </div>
        );
    }

    let date2 = moment(
      messages[messages.indexOf(m) - 1].date,
      "MMMM D YYYY h:mm"
    );
    let month2 = date2.format("MMMM");
    let day2 = date2.format("D");
    if (month1 + day1 !== month2 + day2) {
      if (noi) {
        return true;
      }
      if (
        !date_refs.current.find((ref) => {
          if (ref.current) {
            if (ref.current.innerText === month1 + " " + day1) {
              return true;
            } else return false;
          } else return false;
        })
      ) {
        date_refs.current.push(React.createRef());
        indexOfRef.current = indexOfRef.current + 1;
        return (
          <div
            className="next_day_date"
            ref={date_refs.current[indexOfRef.current]}
          >
            {month1 + " " + day1}
          </div>
        );
      } else
        return (
          <div
            className="next_day_date"
            ref={
              date_refs.current[
                date_refs.current.findIndex(
                  (ref) => ref.current.innerText === month1 + " " + day1
                )
              ]
            }
          >
            {month1 + " " + day1}
          </div>
        );
    } else return null;
  };
  return (
    <div className="col-8 h-75  message_list_global_container">
      <MessageListHeader
        select_messages_id={select_messages_id}
        FilterMessage={FilterMessage}
        DeleteMessage={(id) => dispatch(DeleteMessage(id))}
        setSelectMessage={setSelectMessage}
        setReplyMessage={setReplyMessage}
        message_for_search={message_for_search}
      />

      <div
        className={`message_list_container ${
          display_none ? "display_none" : ""
        } ${reply_messages_id.length > 0 ? "height_76" : ""}`}
        ref={scrollMessegeList}
        onScroll={() => {
          if (date_refs.current[date_ref_index]) {
            if (
              date_refs.current[date_ref_index].current.getBoundingClientRect()
                .top -
                scrollMessegeList.current.getBoundingClientRect().top >
              0
            ) {
              if (date_refs.current[date_ref_index - 1]) {
                setDateRefIndex(date_ref_index - 1);
                setDate(
                  date_refs.current[date_ref_index - 1].current.innerText
                );
              }
            }
            if (date_refs.current[date_ref_index + 1]) {
              if (
                date_refs.current[
                  date_ref_index + 1
                ].current.getBoundingClientRect().top -
                  scrollMessegeList.current.getBoundingClientRect().top <
                0
              ) {
                setDateRefIndex(date_ref_index + 1);
                setDate(
                  date_refs.current[date_ref_index + 1].current.innerText
                );
              }
            }
          }
        }}
        onMouseMove={() => {
          top_date.current.style.animation = "opacity1 2s 1";
          top_date.current.style.opacity = "1";
          clearTimeout(timer);
          timer = setTimeout(() => {
            top_date.current.style.animation = "opacity0 2s 1";
            top_date.current.style.opacity = "0";
          }, 3000);
        }}
      >
        <div className={`message_list`}>
          <div className="top_date_container" ref={top_date}>
            <div className="top_date">
              {moment(date, "MMMM D").fromNow().indexOf("hour") !== -1
                ? "today"
                : moment(date, "MMMM D").fromNow().indexOf("2 days ago") !== -1
                ? "yesterday"
                : date}
            </div>
          </div>
          {messages.map((m) => {
            if (!messages[messages.indexOf(m) + 1]) {
              last = true;
            } else if (
              messages[messages.indexOf(m) + 1].whom === m.whom &&
              !NextDay(messages[messages.indexOf(m) + 1], "noi")
            )
              last = false;
            else {
              last = true;
            }
            return (
              <>
                {NextDay(m)}
                <div
                  className={
                    m.whom === "my"
                      ? `my_m ${last ? "last" : ""} ${
                          search_message_id === m.id ? "search" : ""
                        } ${select_messages_id.includes(m.id) ? "select" : ""}`
                      : `him_m ${last ? "last" : ""} ${
                          search_message_id === m.id ? "search" : ""
                        } ${select_messages_id.includes(m.id) ? "select" : ""}`
                  }
                  ref={search_message_id === m.id ? message_to_find : null}
                  onClick={() => {
                    SelectMessage(m.id);
                  }}
                  key={m.id}
                >
                  <div className="message_content_contaiener">
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
                      <div>
                        {m.photos
                          ? m.photos.map((p) => {
                              return (
                                <div className="w-50">
                                  <img
                                    alt="фштав фото"
                                    src={p}
                                    style={{ width: "300px" }}
                                    onClick={() => {
                                      setImgIndex(() => {
                                        return photos.indexOf(p);
                                      });
                                      setShow(true);
                                    }}
                                  />
                                </div>
                              );
                            })
                          : null}
                        {m.audio && (
                          <div className="w-50">
                            <audio
                              controls
                              preload="none"
                              className="audio_message"
                              style={{ width: "300px" }}
                            >
                              <source src={m.audio} type="audio/mpeg" />
                            </audio>
                          </div>
                        )}
                        {m.message && (
                          <div className="message_text">
                            <div>{m.message}</div>
                          </div>
                        )}

                        {m.reply ? (
                          <div className="messages_reply_container">
                            {m.reply.map((id) => (
                              <div
                                className="message_reply"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  MessageToFind(id);
                                }}
                              >
                                <div className="message_reply_name">
                                  {FindReplyM(null, id).whom === "my"
                                    ? my_name
                                    : him_name}
                                </div>
                                <div className="message_reply_content">
                                  {FindReplyM(null, id).photos && (
                                    <div className="message_reply_img w-50">
                                      <img
                                        src={FindReplyM(null, id).photos[0]}
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
                        ) : null}
                      </div>
                      <span className="message_date">
                        {m.date[m.date.length - 5] +
                          m.date[m.date.length - 4] +
                          m.date[m.date.length - 3] +
                          m.date[m.date.length - 2] +
                          m.date[m.date.length - 1]}
                      </span>
                    </div>
                  </div>
                  <div className="message_pre_icons">
                    {m.whom === "my" ? (
                      <FontAwesomeIcon
                        icon={faEdit}
                        color="white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditMessage(m);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faReply}
                        color="white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplyMessage([m.id]);
                        }}
                      />
                    )}
                    <FontAwesomeIcon icon={faStar} color="white" />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <MessageSearchList
        setMessageForSearch={setMessageForSearch}
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
        edit_message={edit_message}
        setEditMessage={setEditMessage}
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
