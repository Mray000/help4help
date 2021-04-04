import { faReply, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ReplyMessagePreview = ({
  reply_messages_id,
  setReplyMessage,
  FindReplyM,
  my_name,
  him_name,
}) => {
  if (reply_messages_id.length > 0) {
    let message_0 = FindReplyM(0);
    let message_1 = FindReplyM(1);
    return (
      <div className="reply_message_pre_input_container">
        <div className="reply_icon">
          <FontAwesomeIcon icon={faReply} size="2x" />
        </div>
        {reply_messages_id.length < 2 && message_1.photos ? (
          <div className="reply_img">
            <img src={message_1.photos[0]} alt="" />
          </div>
        ) : null}
        <div className="reply_name_message">
          <div className="reply_name">
            {reply_messages_id.length < 2
              ? message_1.whom === "my"
                ? my_name
                : him_name
              : "Messages reply"}
          </div>
          <div className="reply_message">
            {reply_messages_id.length < 2
              ? message_0.text
                ? message_0.text.length > 16
                  ? message_0.text.substring(0, 16) + "..."
                  : message_0.text
                : message_0.photos
                ? "Photo"
                : message_0.audio
                ? "Audio"
                : message_0.files
                ? "Files"
                : message_0.reply
                ? message_0.reply.length + " replying message"
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
    );
  } else return null;
};

export default ReplyMessagePreview;
