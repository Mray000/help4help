import React from "react";
import "../Messenger.scss";
import AudioMessage from "./M_Types/AudioMessage";
import FilesGroupMessage from "./M_Types/FilesGroupMessage";
import PhotosGroupMessage from "./M_Types/PhotosGroupsMessage";
// import ReplysGroupMessage from "./M_Types/ReplyGroupMessage";
import classNames from "classnames";

const MessageSearchList = ({
  messages_for_search,
  MessageToFind,
  display_none,
  setMessagesForSearch,
  NextDay,
}) => {
  return (
    <div
      className={`message_search_list_global_container ${
        display_none ? "display_none" : ""
      }`}
    >
      {!messages_for_search.includes(0) &&
        messages_for_search.map((m) => {
          return (
            <Message
              key={m.id}
              m={m}
              MessageToFind={MessageToFind}
              setMessagesForSearch={setMessagesForSearch}
              NextDay={NextDay}
              previous_message_date={
                messages_for_search[messages_for_search.indexOf(m) - 1]?.date
              }
            />
          );
        })}
    </div>
  );
};

const Message = ({
  m,
  MessageToFind,
  setMessagesForSearch,
  NextDay,
  previous_message_date,
}) => {
  var MessageClass = classNames({
    my_m: m.whom === "my",
    him_m: m.whom === "him",
  });
  return (
    <div>
      {NextDay(m, "search", previous_message_date)}
      <div
        className={MessageClass}
        onClick={() => {
          MessageToFind(m.id);
          setMessagesForSearch([0]);
        }}
      >
        <div className="message_content_contaiener">
          <img
            src={
              m.whom === "my"
                ? "https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
                : "https://spark.ru/public/img/user_ava_big.png"
            }
            alt="arrr"
            className="message_ava"
          />
          <div
            className="message_content"
            style={{
              padding: m.audio ? "0px" : "6px 8px",
              borderRadius: m.audio ? "4px" : "10px",
              // borderBottomLeftRadius: last ? "0px" : m.audio ? "4px" : "10px",
              marginLeft: "7px",
            }}
          >
            <div className="message_photos_container">
              {m.photos && (
                <PhotosGroupMessage photos={m.photos} previw={true} />
              )}
              {m.files && <FilesGroupMessage files={m.files} />}
              {m.audio && (
                <AudioMessage src={m.audio} date={m.date} last={true} />
              )}
              {m.text && (
                <div className="message_text">
                  <div>{m.text}</div>
                </div>
              )}
              {/* {m.reply && (
                <ReplysGroupMessage
                  m={m}
                  FindReplyM={FindReplyM}
                  MessageToFind={MessageToFind}
                  my_name={my_name}
                  him_name={him_name}
                  setImgIndex={setImgIndex}
                  photos={photos}
                  setShow={setShow}
                />
              )} */}
            </div>
            <br />
            {!m.audio && (
              <div
                className="message_date"
                style={{
                  marginLeft: m.photos ? "-29px" : null,
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
      </div>
    </div>
  );
};

export default MessageSearchList;
