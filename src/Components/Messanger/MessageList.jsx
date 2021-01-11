import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../Redux/Selectors/DialogsSelector.js";
import "./Messanger.scss";
import wave from "./../../images/wave.svg";
import MessageForm from "./MessageForm.jsx";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";
import { DeleteMessage } from "../../Redux/Reducer/DialogsReducer.js";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPause,
  faPlay,
  faReply,
  faStar,
  faStop,
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
  const date_ref_index = useRef(0);
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
    date_ref_index.current = date_refs.current.length - 1;
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
  const onScroll = () => {
    if (date_refs.current[date_ref_index.current - 1]) {
      if (
        scrollMessegeList.current.getBoundingClientRect().top -
          date_refs.current[
            date_ref_index.current
          ].current.getBoundingClientRect().top <
        0
      ) {
        setDate(
          date_refs.current[date_ref_index.current - 1].current.innerText
        );
        date_ref_index.current = date_ref_index.current - 1;
      }
    }

    if (date_refs.current[date_ref_index.current + 1]) {
      if (
        scrollMessegeList.current.getBoundingClientRect().top -
          date_refs.current[
            date_ref_index.current + 1
          ].current.getBoundingClientRect().top >
        0
      ) {
        setDate(
          date_refs.current[date_ref_index.current + 1].current.innerText
        );
        date_ref_index.current = date_ref_index.current + 1;
      }
    }
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
        } ${reply_messages_id.length ? "height_76" : ""}`}
        ref={scrollMessegeList}
        onScroll={onScroll}
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
        <div className="message_list">
          <div className="top_date_container" ref={top_date}>
            <div className="top_date">
              {/* {(function (params) {
                console.log(moment(date, "MMMM D").fromNow());
              })()} */}
              {moment(date, "MMMM D").fromNow().indexOf("hour") !== -1
                ? "today"
                : moment(date, "MMMM D").fromNow().indexOf("a day ago") !==
                    -1 ||
                  moment(date, "MMMM D").fromNow().indexOf("2 days ago") !== -1
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
            let my_him = m.whom === "my" ? "my_m" : "him_m";
            return (
              <>
                {NextDay(m)}
                <div
                  className={`${my_him} ${last && !m.audio ? "last" : ""} ${
                    search_message_id === m.id ? "search" : ""
                  } ${select_messages_id.includes(m.id) ? "select" : ""}`}
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
                    <div
                      className="message_content"
                      style={{
                        padding: m.audio ? "0px" : "6px 8px",
                        borderRadius: m.audio ? "4px" : "10px",
                        borderBottomLeftRadius: last
                          ? "0px"
                          : m.audio
                          ? "4px"
                          : "10px",
                        marginLeft: m.audio
                          ? last
                            ? "7px"
                            : "37px"
                          : last
                          ? "7px"
                          : "37px",
                      }}
                    >
                      <div className="message_photos_container">
                        {m.photos && (
                          <PhotosGroupMessage
                            m={m}
                            setImgIndex={setImgIndex}
                            photos={photos}
                            setShow={setShow}
                          />
                        )}
                        {m.audio && (
                          <AudioMessage
                            src={m.audio}
                            date={m.date}
                            last={last}
                          />
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
                                    <AudioMessage
                                      src={FindReplyM(null, id).audio}
                                    />
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
                      <br />
                      {!m.audio && (
                        <div
                          className="message_date"
                          style={{
                            marginLeft: m.photos ? "-29px" : null,
                            backgroundColor: m.photos ? "black" : null,
                            borderRadius: m.photos ? "2px" : null,
                            // padding: m.photos ? "1px" : null,
                          }}
                        >
                          {m.date[m.date.length - 5] +
                            m.date[m.date.length - 4] +
                            m.date[m.date.length - 3] +
                            m.date[m.date.length - 2] +
                            m.date[m.date.length - 1]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="message_pre_icons">
                    {m.whom === "my" ? (
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="sm"
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
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplyMessage([m.id]);
                        }}
                      />
                    )}
                    <FontAwesomeIcon icon={faStar} color="white" size="sm" />
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

const AudioMessage = ({ src, date = null, last = false }) => {
  const [playing, setPlaying] = useState(false);
  let audio_message = useRef();
  let progress_bar = useRef();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (progress_bar.current.style.width === "100%") {
      progress_bar.current.style.width = "0%";
      setTimeout(() => {
        audio_message.current.play();
        setPlaying(!playing);
      }, 800);
    } else {
      audio_message.current.play();
      setPlaying(!playing);
    }
  };
  const handlePause = (e) => {
    e.stopPropagation();
    audio_message.current.pause();
    setPlaying(!playing);
  };
  const handleProgress = () => {
    let currentTime = audio_message.current.currentTime;
    let duration = audio_message.current.duration;
    let percent = (10 / duration) * currentTime * 10;
    // console.log(duration);
    progress_bar.current.style.width = percent + "%";
  };
  return (
    <div className="message_audio_container">
      <div className="message_audio">
        <audio
          className="display_none"
          ref={audio_message}
          onEnded={handlePause}
          onTimeUpdate={handleProgress}
          // onDurationChange={handleProgress}
        >
          <source src={src} type="audio/mpeg" />
        </audio>
        <div
          onClick={playing ? handlePause : handlePlay}
          style={{ zIndex: 2, marginRight: "4px", marginLeft: "4px" }}
        >
          {playing ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </div>
        <div>
          <img src={wave} alt="" />
        </div>
        {date && (
          <span className="message_date" style={{ marginRight: "2px" }}>
            {date[date.length - 5] +
              date[date.length - 4] +
              date[date.length - 3] +
              date[date.length - 2] +
              date[date.length - 1]}
          </span>
        )}
      </div>
      <div
        className="message_audio_progress_bar"
        ref={progress_bar}
        style={{ borderRadius: last ? "4px 4px 4px 0px" : "4px" }}
      ></div>
    </div>
  );
};

const PhotosGroupMessage = ({ m, setImgIndex, photos, setShow }) => {
  const PhotoMessage = ({ src, width }) => {
    return (
      <img
        alt="📷"
        src={src}
        style={{
          width: `${width}%`,
          objectFit: "contain",
          display: "block",
          borderRadius: "5px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setImgIndex(() => {
            return photos.indexOf(src);
          });
          setShow(true);
        }}
      />
    );
  };
  return (
    <div
      className="photos_container"
      style={{ width: "400px", display: "flex" }}
    >
      {(function () {
        if (m.photos.length === 1) {
          return <PhotoMessage src={m.photos[0]} width={"100"} />;
        }
        if (m.photos.length === 2) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <PhotoMessage src={m.photos[0]} width={"49"} />
              <PhotoMessage src={m.photos[1]} width={"49"} />
            </div>
          );
        }
        if (m.photos.length === 3) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "59%",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhotoMessage src={m.photos[0]} width={"100"} />
              </div>
              <div
                style={{
                  width: "39%",
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <PhotoMessage src={m.photos[1]} width={"100"} />
                <div style={{ height: "5px" }}></div>
                <PhotoMessage src={m.photos[2]} width={"100"} />
              </div>
            </div>
          );
        }
        if (m.photos.length > 3) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "59%",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhotoMessage src={m.photos[0]} width={"100"} />
              </div>
              <div
                style={{
                  width: "39%",
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <PhotoMessage src={m.photos[1]} width={"100"} />
                <div style={{ height: "5px" }}></div>
                <div className="photo_with_plus_photos">
                  <PhotoMessage src={m.photos[2]} width={"100"} />
                  <div>
                    <span>+{m.photos.length - 3}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default MessageList;
