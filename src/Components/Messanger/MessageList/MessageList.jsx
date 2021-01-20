import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../Redux/Selectors/DialogsSelector.js";
import MessageForm from "./M_Form/MessageForm.jsx";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";

import {
  DeleteMessage,
  // MessagesListenner,
} from "../../../Redux/Reducer/DialogsReducer.js";
import moment from "moment";

import "./../Messanger.scss";
import ReplyMessagePreview from "./ReplyMessagePreview.jsx";
import Message from "./Message.jsx";

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
  const date_ref_index = useRef(0);
  const [show, setShow] = useState(false);
  let indexOfRef = useRef(-1);
  const scrollMessegeList = React.createRef();
  let message_to_find = React.createRef(null);
  let top_date = useRef(null);
  let date_refs = useRef([]);
  var timer;

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
    top_date.current.children[0].innerText =
      moment(messages[messages.length - 1].date, "MMMM D YYYY h:mm").format(
        "MMMM"
      ) +
      " " +
      moment(messages[messages.length - 1].date, "MMMM D YYYY h:mm").format(
        "D"
      );
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
        return messages.filter((m) =>
          m.message ? m.message.toLowerCase().indexOf(s) !== -1 : false
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
        let NewDate =
          date_refs.current[date_ref_index.current - 1].current.innerText;
        console.log(moment(NewDate, "MMMM D").fromNow());
        top_date.current.children[0].innerText =
          moment(NewDate, "MMMM D").fromNow().indexOf("hour") !== -1
            ? "today"
            : moment(NewDate, "MMMM D").fromNow().indexOf("a day ago") !== -1 ||
              moment(NewDate, "MMMM D").fromNow().indexOf("2 days ago") !== -1
            ? "yesterday"
            : NewDate;
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
        let NewDate =
          date_refs.current[date_ref_index.current + 1].current.innerText;
        top_date.current.children[0].innerText =
          moment(NewDate, "MMMM D").fromNow().indexOf("hour") !== -1
            ? "today"
            : moment(NewDate, "MMMM D").fromNow().indexOf("a day ago") !== -1 ||
              moment(NewDate, "MMMM D").fromNow().indexOf("2 days ago") !== -1
            ? "yesterday"
            : NewDate;
        date_ref_index.current = date_ref_index.current + 1;
      }
    }
    // clearTimeout(timer);
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
            <div className="top_date"></div>
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
              <Message
                m={m}
                NextDay={NextDay}
                last={last}
                key={m.id}
                search_message_id={search_message_id}
                select_messages_id={select_messages_id}
                message_to_find={message_to_find}
                SelectMessage={SelectMessage}
                setImgIndex={setImgIndex}
                setShow={setShow}
                photos={photos}
                FindReplyM={FindReplyM}
                MessageToFind={MessageToFind}
                my_name={my_name}
                him_name={him_name}
                setEditMessage={setEditMessage}
                setReplyMessage={setReplyMessage}
              />
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
      <ReplyMessagePreview
        reply_messages_id={reply_messages_id}
        setReplyMessage={setReplyMessage}
        FindReplyM={FindReplyM}
        my_name={my_name}
        him_name={him_name}
      />
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
