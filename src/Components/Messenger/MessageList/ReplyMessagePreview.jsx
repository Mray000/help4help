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
    return (
      <div className="reply_message_pre_input_container">
        <div className="reply_icon">
          <FontAwesomeIcon icon={faReply} size="2x" />
        </div>
        {reply_messages_id.length < 2 && FindReplyM(1).photos ? (
          <div className="reply_img">
            <img src={FindReplyM(1).photos[0]} alt="" />
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
              ? FindReplyM(0).text
                ? FindReplyM(0).text.substring(0, 16) + "..."
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
    );
  } else return null;
};

export default ReplyMessagePreview;
