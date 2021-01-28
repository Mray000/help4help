import { faEdit, faReply, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AudioMessage from "./M_Types/AudioMessage";
import FilesGroupMessage from "./M_Types/FilesGroupMessage";
import PhotosGroupMessage from "./M_Types/PhotosGroupsMessage";
import ReplysGroupMessage from "./M_Types/ReplyGroupMessage";
import classNames from "classnames";

const Message = ({
  m,
  NextDay = null,
  last = null,
  search_message_id = null,
  select_messages_id = null,
  message_to_find = null,
  SelectMessage = null,
  setImgIndex = null,
  setShow = null,
  index_for_photos = null,
  FindReplyM = null,
  MessageToFind = null,
  my_name = null,
  him_name = null,
  setEditMessage = null,
  setReplyMessage = null,
  previous_message_date = null,
}) => {
  let MessageClass = classNames({
    my_m: m.whom === "my",
    him_m: m.whom === "him",
    last: last && !m.audio,
    search: search_message_id === m.id,
    select: select_messages_id.includes(m.id),
  });
  console.log("render");
  return (
    <div>
      {NextDay(m, null, previous_message_date)}

      <div
        className={MessageClass}
        ref={search_message_id === m.id ? message_to_find : null}
        onClick={() => {
          SelectMessage(m.id);
        }}
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
              {m.message && (
                <div className="message_text">
                  <div>{m.message}</div>
                </div>
              )}

              {m.reply && (
                <ReplysGroupMessage
                  m={m}
                  FindReplyM={FindReplyM}
                  MessageToFind={MessageToFind}
                  my_name={my_name}
                  him_name={him_name}
                  setImgIndex={setImgIndex}
                  index_for_photos={index_for_photos}
                  setShow={setShow}
                />
              )}
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
              className="icon_edit"
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
              className="icon_reply"
            />
          )}
          <FontAwesomeIcon
            icon={faStar}
            color="white"
            size="sm"
            className="icon_star"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Message);
