/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorMessages,
  getMessages,
} from "../../../Redux/Selectors/MessengerSelector.js";
import MessageForm from "./M_Form/MessageForm.jsx";
import LargePhotosPreview from "./LargePhotosPreview.jsx";
import MessageListHeader from "./MessageListHeader.jsx";
import MessageSearchList from "./MessageSearchList.jsx";

import {
  DeleteMessage,
  SetMessages,
  SetMessagesRead,
} from "../../../Redux/Reducer/MessengerReducer.js";
import moment from "moment";

import "../Messenger.scss";
import ReplyMessagePreview from "./ReplyMessagePreview.jsx";
import Message from "./Message.jsx";
import classnames from "classnames";
import { GetPosition } from "../../../utils/GetPosition.js";
import { getAuthId } from "../../../Redux/Selectors/AuthSelectors.js";
import { getCurrentSelf } from "../../../utils/GetCurrentSelf.js";

const MessageList = ({ current_self, dialogs, unread_messages, dialog_id }) => {
  const my_name = "Aynur Habibullin";
  const him_name = "Stas KakayProsto";
  const messages = useSelector(getMessages);
  const error_messages = useSelector(getErrorMessages);
  const my_id = useSelector(getAuthId);
  const dispatch = useDispatch();
  const [search_message_id, setMessageSearchId] = useState(0);
  const [select_messages_id, setSelectMessage] = useState([]);
  const [reply_messages_id, setReplyMessage] = useState([]);
  const [edit_message, setEditMessage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [messages_for_search, setMessagesForSearch] = useState([]);
  const [display_none, setDisplayNone] = useState(false);
  const [show, setShow] = useState(false);
  const date_ref_index = useRef(0);
  let indexOfRef = useRef(-1);
  let scroll_list = useRef(null);
  let message_to_find = useRef(null);
  let top_date = useRef(null);
  let date_refs = useRef([]);
  let last = false;
  let timer;
  useEffect(() => {
    if (messages.length) {
      scroll_list.current.addEventListener("scroll", onScroll);
      date_ref_index.current = date_refs.current.length - 1;
      setTimeout(
        () => top_date.current && top_date.current.classList.add("opacity0"),
        3000
      );
      let basic = moment(
        messages[messages.length - 1].date,
        "MMMM D YYYY h:mm"
      );
      top_date.current.innerText =
        basic.format("MMMM") + " " + basic.format("D");
      dispatch(SetMessagesRead(my_id, getCurrentSelf(), dialog_id));
    }
    return () => {
      scroll_list.current.removeEventListener("scroll", onScroll);
      date_refs.current = [];
      setImgIndex(0);
      setEditMessage(0);
      setMessageSearchId(0);
      setShow(false);
      setSelectMessage([]);
      setReplyMessage([]);
      setMessagesForSearch([]);
      setPhotos([]);
      message_to_find.current = null;
      indexOfRef.current = -1;
      date_ref_index.current = 0;
      last = false;
      if (getCurrentSelf()) {
        dispatch(
          SetMessages(dialogs.find((d) => d.self.id === getCurrentSelf()).id)
        );
      }
    };
  }, [getCurrentSelf()]);

  useEffect(() => {
    document.addEventListener(
      "DOMContentLoaded",
      () => (scroll_list.current.scrollTop = scroll_list.current.scrollHeight)
    );
    if (messages.length) {
      if (
        GetPosition(scroll_list, "top") <
        GetPosition(date_refs.current[date_refs.current.length - 1], "top")
      ) {
        date_ref_index.current = date_refs.current.length - 1;
        InnerTextToDate();
      }
      scroll_list.current.scrollTop = scroll_list.current.scrollHeight;
      let mass_photos = [];
      messages.forEach((m) =>
        m.photos?.forEach((p) => !photos.includes(p) && mass_photos.push(p))
      );
      setPhotos([...photos, ...mass_photos]);
    }
  }, [messages]);

  useEffect(() => {
    if (message_to_find.current) {
      let local_minimum = Infinity;
      scroll_list.current.scrollTop = scroll_list.current.scrollHeight;
      scroll_list.current.scrollTop =
        scroll_list.current.scrollHeight -
        (GetPosition(scroll_list, "bottom") -
          GetPosition(message_to_find, "top"));

      date_refs.current.forEach((e) => {
        if (
          GetPosition(scroll_list, "top") - GetPosition(e, "top") > 0 &&
          GetPosition(e, "top") < local_minimum
        ) {
          local_minimum =
            GetPosition(scroll_list, "top") - GetPosition(e, "top");
          date_ref_index.current = date_refs.current.indexOf(e);
        }
      });
      InnerTextToDate();
      if (top_date.current) {
        top_date.current.classList.remove("opacity0");
        top_date.current.classList.add("opacity1");
      }
      setTimeout(() => {
        if (top_date.current) {
          top_date.current.classList.remove("opacity1");
          top_date.current.classList.add("opacity0");
        }
        setMessageSearchId(0);
      }, 3000);
    }
  }, [search_message_id]);
  const onScroll = useCallback(() => {
    if (date_refs.current[date_ref_index.current - 1]) {
      if (
        GetPosition(scroll_list, "top") -
          GetPosition(date_refs.current[date_ref_index.current], "top") <
        0
      ) {
        date_ref_index.current--;
        InnerTextToDate();
      }
    }
    if (date_refs.current[date_ref_index.current + 1]) {
      if (
        GetPosition(scroll_list, "top") -
          GetPosition(date_refs.current[date_ref_index.current + 1], "top") >
        0
      ) {
        date_ref_index.current++;
        InnerTextToDate();
      }
    }
  }, []);
  const MessageToFind = useCallback((id) => {
    setDisplayNone(false);
    setMessageSearchId(id);
  }, []);
  let s_length_when_empty = useRef(messages?.length);
  let m_search_length = useRef(0);

  const FilterMessage = (s) => {
    if (s === "") {
      setDisplayNone(false);
      s_length_when_empty.current = messages.length;
    } else {
      if (display_none === false) setDisplayNone(true);
      if (!(s_length_when_empty.current < s.length)) {
        setMessagesForSearch(() => {
          let arr = messages.filter((m) => m.text?.toLowerCase().includes(s));
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

  const FindReplyM = (fl, id = null) => {
    if (fl != null) {
      return messages.find(
        (m) => m.id === reply_messages_id[fl ? 0 : reply_messages_id.length - 1]
      );
    } else return messages.find((m) => m.id === id);
  };

  const NextDayReturn = (noi, date) => {
    const find_ref_index = date_refs.current.findIndex(
      (r) => r.current?.innerText === date
    );
    if (noi === "last") return true;

    if (noi === "search") return <div className="next_day_date">{date}</div>;

    if (!~find_ref_index) {
      date_refs.current.push(React.createRef());
      indexOfRef.current++;
    }
    return (
      <div
        className="next_day_date"
        ref={
          date_refs.current[
            !~find_ref_index ? indexOfRef.current : find_ref_index
          ]
        }
      >
        {date}
      </div>
    );
  };

  const NextDay = useCallback((m, noi, last_date = null) => {
    let date1 = moment(m.date, "MMMM D YYYY h:mm");
    let month1 = date1.format("MMMM");
    let day1 = date1.format("D");
    let date2 = moment(last_date, "MMMM D YYYY h:mm");
    let month2 = date2.format("MMMM");
    let day2 = date2.format("D");
    if (month1 + day1 !== month2 + day2) {
      return NextDayReturn(noi, month1 + " " + day1);
    } else return null;
  }, []);

  const InnerTextToDate = () => {
    let NewDate = moment(
      date_refs.current[date_ref_index.current].current.innerText,
      "MMMM DD"
    );
    top_date.current.innerText = NewDate.fromNow().includes("hour")
      ? "today"
      : NewDate.fromNow().includes("a day ago")
      ? "yesterday"
      : NewDate.format("MMMM D");
  };

  const MessageListContainerClass = classnames({
    message_list_container: true,
    display_none: display_none,
    height_76: reply_messages_id.length,
  });

  let ReplyMessagesGroupsState = useRef([]);
  const ReplyMessagesGroup = useCallback((reply_messages, id) => {
    let reply_group = ReplyMessagesGroupsState.current.find((e) => e.id === id);
    if (reply_group) return reply_group.reply_messages;
    let arr = reply_messages.map((m_id) => FindReplyM(null, m_id));
    ReplyMessagesGroupsState.current.push({ id: id, reply_messages: arr });
    return arr;
  }, []);

  return (
    <div className="col-8 message_list_global_container">
      <MessageListHeader
        select_messages_id={select_messages_id}
        FilterMessage={FilterMessage}
        DeleteMessage={(m_ids) =>
          dispatch(DeleteMessage(my_id, dialog_id, m_ids))
        }
        setSelectMessage={setSelectMessage}
        setReplyMessage={setReplyMessage}
        messages_for_search={messages_for_search}
        current_self={current_self}
        online={current_self.online}
        setMessagesForSearch={setMessagesForSearch}
      />
      <div
        className={MessageListContainerClass}
        ref={scroll_list}
        onMouseMove={() => {
          clearTimeout(timer);
          if (top_date.current) {
            top_date.current.classList.remove("opacity0");
            top_date.current.classList.add("opacity1");
          }
          timer = setTimeout(() => {
            if (top_date.current) {
              top_date.current.classList.remove("opacity1");
              top_date.current.classList.add("opacity0");
            }
          }, 1500);
        }}
      >
        <div className="message_list">
          <div className="top_date" ref={top_date}></div>
          {messages.map((m, index) => {
            if (!messages[messages.indexOf(m) + 1]) last = true;
            else if (
              messages[messages.indexOf(m) + 1].whom === m.whom &&
              !NextDay(
                messages[messages.indexOf(m) + 1],
                "last",
                messages[messages.indexOf(m)]?.date
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
                search={search_message_id === m.id}
                select={select_messages_id.includes(m.id)}
                message_to_find={
                  search_message_id === m.id ? message_to_find : null
                }
                SelectMessage={SelectMessage}
                setImgIndex={setImgIndex}
                setShow={setShow}
                index_for_photos={m.photos ? photos.indexOf(m.photos[0]) : null}
                MessageToFind={MessageToFind}
                my_name={my_name}
                him_name={him_name}
                setEditMessage={setEditMessage}
                setReplyMessage={setReplyMessage}
                reply_messages={
                  m.reply ? ReplyMessagesGroup(m.reply, m.id) : null
                }
                previous_message_date={messages[messages.indexOf(m) - 1]?.date}
                error={error_messages.includes(m.id)}
                my={my_id === m.whom}
                unread={messages.length - index <= unread_messages}
                ReplyMessagesGroup={ReplyMessagesGroup}
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
        my_id={my_id}
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
