import {
  faClock,
  faEdit,
  faReply,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AudioMessage from "./M_Types/AudioMessage";
import FilesGroupMessage from "./M_Types/FilesGroupMessage";
import PhotosGroupMessage from "./M_Types/PhotosGroupsMessage";
import ReplysGroupMessage from "./M_Types/ReplyGroupMessage";
import classNames from "classnames";
import moment from "moment";

const Message = ({
  m,
  NextDay = null,
  last = null,
  search = null,
  select = null,
  message_to_find = null,
  SelectMessage = null,
  setImgIndex = null,
  setShow = null,
  index_for_photos = null,
  reply_messages = null,
  MessageToFind = null,
  my_name = null,
  him_name = null,
  setEditMessage = null,
  setReplyMessage = null,
  previous_message_date = null,
  error = null,
  my = null,
  ReplyMessagesGroup = null,
  unread = null,
}) => {
  let MessageClass = classNames({
    my_m: my,
    him_m: !my,
    last: last && !m.audio,
    search: search,
    select: select,
    unread: unread,
  });
  return (
    <div>
      {NextDay(m, false, previous_message_date)}
      <div
        className={MessageClass}
        ref={message_to_find}
        onClick={() => SelectMessage(m.id)}
      >
        <div className="message_content_contaiener">
          {last && (
            <img
              src={
                my
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
              borderBottomLeftRadius: last ? "0px" : m.audio ? "4px" : "10px",
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
                  photos={m.photos}
                  setImgIndex={setImgIndex}
                  index_for_photos={index_for_photos}
                  setShow={setShow}
                />
              )}
              {m.files && <FilesGroupMessage files={m.files} />}
              {m.audio && (
                <AudioMessage src={m.audio} date={m.date} last={last} />
              )}
              {m.text && <div className="message_text">{m.text}</div>}

              {m.reply && (
                <ReplysGroupMessage
                  reply_messages={reply_messages}
                  MessageToFind={MessageToFind}
                  my_name={my_name}
                  him_name={him_name}
                  setImgIndex={setImgIndex}
                  setShow={setShow}
                  my={my}
                  ReplyMessagesGroup={ReplyMessagesGroup}
                />
              )}
            </div>
            <br />
            {!m.audio && (
              <div
                className="message_date"
                style={{
                  marginLeft: m.photos ? "-28px" : null,
                  marginRight: m.photos ? "8px" : null,
                }}
              >
                {moment(m.date).format("HH:mm")}
              </div>
            )}
          </div>
          {error && <FontAwesomeIcon icon={faClock} />}
        </div>
        <div className="message_pre_icons">
          {my ? (
            <FontAwesomeIcon
              icon={faEdit}
              size="sm"
              color="white"
              onClick={(e) => {
                e.stopPropagation();
                setEditMessage(m);
              }}
              className="icon_opacity"
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
              className="icon_opacity"
            />
          )}
          <FontAwesomeIcon
            icon={faStar}
            color="white"
            size="sm"
            className="icon_opacity"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Message);
