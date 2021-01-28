/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../../Redux/Selectors/DialogsSelector.js";
import MessageForm from "./M_Form/MessageForm.jsx";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";

import { DeleteMessage } from "../../../Redux/Reducer/DialogsReducer.js";
import moment from "moment";

import "./../Messanger.scss";
import ReplyMessagePreview from "./ReplyMessagePreview.jsx";
import Message from "./Message.jsx";
import classnames from "classnames";

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
  const [messages_for_search, setMessagesForSearch] = useState([]);
  const [display_none, setDisplayNone] = useState(false);
  const date_ref_index = useRef(0);
  const [show, setShow] = useState(false);
  let indexOfRef = useRef(-1);
  let scrollMessegeList = useRef(null);
  let message_to_find = useRef(null);
  let top_date = useRef(null);
  let date_refs = useRef([]);
  var timer;
  let last = false;
  let local_minimum = 10000;

  useEffect(() => {
    scrollMessegeList.current.scrollTop =
      scrollMessegeList.current.scrollHeight;
    date_ref_index.current = date_refs.current.length - 1;
    top_date.current.innerText =
      date_refs.current[date_refs.current.length - 1].current.innerText;
    messages.forEach((m) => {
      if (m.photos) {
        let mass = m.photos.filter((p) => !photos.includes(p));
        setPhotos([...photos, ...mass]);
      }
    });
  }, [messages]);
  useEffect(() => {
    if (message_to_find.current) {
      // scrollMessegeList.current.removeEventListener("scroll", onScroll); // удаление
      scrollMessegeList.current.scrollTop =
        scrollMessegeList.current.scrollHeight;
      scrollMessegeList.current.scrollTop =
        scrollMessegeList.current.scrollHeight -
        (scrollMessegeList.current.getBoundingClientRect().bottom -
          message_to_find.current.getBoundingClientRect().top);
      date_refs.current.forEach((e) => {
        if (
          scrollMessegeList.current.getBoundingClientRect().top -
            e.current.getBoundingClientRect().top >
            0 &&
          e.current.getBoundingClientRect().top < local_minimum
        ) {
          date_ref_index.current = date_refs.current.indexOf(e);
          local_minimum = e.current.getBoundingClientRect().top;
        }
      });
      top_date.current.innerText =
        date_refs.current[date_ref_index.current].current.innerText;
      // scrollMessegeList.current.addEventListener("scroll", onScroll);
      setTimeout(() => {
        setMessageSearchId(0);
      }, 3000);
    }
  }, [search_message_id]);
  useEffect(() => {
    scrollMessegeList.current.addEventListener("scroll", onScroll);
    date_ref_index.current = date_refs.current.length - 1;
    top_date.current.style.animation = "opacity0 2s 1";
    setTimeout(() => {
      top_date.current.style.opacity = "0";
    }, 4000);
    let basic = moment(messages[messages.length - 1].date, "MMMM D YYYY h:mm");
    top_date.current.innerText = basic.format("MMMM") + " " + basic.format("D");
  }, []);

  const onScroll = useCallback(() => {
    if (date_refs.current[date_ref_index.current - 1]) {
      if (
        scrollMessegeList.current.getBoundingClientRect().top -
          date_refs.current[
            date_ref_index.current
          ].current.getBoundingClientRect().top <
        0
      ) {
        top_date.current.innerText = InnerTextCreator(
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
        top_date.current.innerText = InnerTextCreator(
          date_refs.current[date_ref_index.current + 1].current.innerText
        );
        date_ref_index.current = date_ref_index.current + 1;
      }
    }
  }, []);
  const MessageToFind = useCallback((id) => {
    setDisplayNone(false);
    setMessageSearchId(id);
  }, []);
  let s_length_when_empty = useRef(messages.length);
  let m_search_length = useRef(0);
  const FilterMessage = (s) => {
    if (s === "") {
      setDisplayNone(false);
      s_length_when_empty.current = messages.length;
    } else {
      if (display_none === false) setDisplayNone(true);
      if (!(s_length_when_empty.current < s.length)) {
        setMessagesForSearch(() => {
          let arr = messages.filter(
            (m) => m.message && m.message.toLowerCase().indexOf(s) !== -1
          );
          m_search_length.current = arr.length;
          return arr;
        });
        if (!m_search_length.current) s_length_when_empty.current = s.length;
      }
    }
  };
  const SelectMessage = useCallback((id) => {
    setSelectMessage((l) => {
      if (l.includes(id)) return l.filter((i) => i !== id);
      else return [...l, id];
    });
  }, []);

  const FindReplyM = useCallback((fl, id = null) => {
    if (fl != null) {
      return messages.find(
        (m) => m.id === reply_messages_id[fl ? 0 : reply_messages_id.length - 1]
      );
    } else return messages.find((m) => m.id === id);
  }, []);
  const NextDayReturn = (noi, month1, day1) => {
    if (noi === "noi") return true;

    if (noi === "search")
      return <div className="next_day_date">{month1 + " " + day1}</div>;
    if (
      !date_refs.current.find((ref) => {
        if (ref.current?.innerText === month1 + " " + day1) return true;
        else return false;
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
                (r) => r.current.innerText === month1 + " " + day1
              )
            ]
          }
        >
          {month1 + " " + day1}
        </div>
      );
  };
  const NextDay = useCallback((m, noi, last_date = null) => {
    let date1 = moment(m.date, "MMMM D YYYY h:mm");
    let month1 = date1.format("MMMM");
    let day1 = date1.format("D");
    if (m.id === 1) return NextDayReturn(noi, month1, day1); //тут используются message из store
    let date2 = moment(last_date, "MMMM D YYYY h:mm");
    let month2 = date2.format("MMMM");
    let day2 = date2.format("D");
    if (month1 + day1 !== month2 + day2)
      return NextDayReturn(noi, month1, day1);
    else return null;
  }, []);
  const InnerTextCreator = (NewDate) =>
    moment(NewDate, "MMMM D").fromNow().indexOf("hour") !== -1
      ? "today"
      : moment(NewDate, "MMMM D").fromNow().indexOf("a day ago") !== -1 ||
        moment(NewDate, "MMMM D").fromNow().indexOf("2 days ago") !== -1
      ? "yesterday"
      : NewDate;

  const MessageListContainerClass = classnames({
    message_list_container: true,
    display_none: display_none,
    height_76: reply_messages_id.length,
  });
  return (
    <div className="col-8 h-75  message_list_global_container">
      <MessageListHeader
        select_messages_id={select_messages_id}
        FilterMessage={FilterMessage}
        DeleteMessage={(id) => dispatch(DeleteMessage(id))}
        setSelectMessage={setSelectMessage}
        setReplyMessage={setReplyMessage}
        messages_for_search={messages_for_search}
      />
      <div
        className={MessageListContainerClass}
        ref={scrollMessegeList}
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
          <div className="top_date" ref={top_date}></div>
          {messages.map((m) => {
            if (!messages[messages.indexOf(m) + 1]) last = true;
            else if (
              messages[messages.indexOf(m) + 1].whom === m.whom &&
              !NextDay(
                messages[messages.indexOf(m) + 1],
                "noi",
                messages[messages.indexOf(m) - 1]?.date
              )
            )
              last = false;
            else last = true;
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
                index_for_photos={m.photos ? photos.indexOf(m.photos[0]) : null}
                FindReplyM={FindReplyM}
                MessageToFind={MessageToFind}
                my_name={my_name}
                him_name={him_name}
                setEditMessage={setEditMessage}
                setReplyMessage={setReplyMessage}
                previous_message_date={messages[messages.indexOf(m) - 1]?.date}
              />
            );
          })}
        </div>
      </div>

      <MessageSearchList
        NextDay={NextDay}
        setMessagesForSearch={setMessagesForSearch}
        messages_for_search={messages_for_search}
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

export default React.memo(MessageList);
