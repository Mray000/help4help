import React from "react";
import AudioMessage from "./AudioMessage";
import FilesGroupMessage from "./FilesGroupMessage";
import PhotosGroupMessage from "./PhotosGroupsMessage";

const ReplysGroupMessage = ({
  m,
  FindReplyM,
  MessageToFind,
  my_name,
  him_name,
  setImgIndex,
  index_for_photos,
  setShow,
}) => {
  let reply_message;
  return (
    <div className="messages_reply_container">
      {m.reply.map((id) => {
        reply_message = FindReplyM(null, id);
        return (
          <div
            className="message_reply"
            onClick={(e) => {
              e.stopPropagation();
              MessageToFind(id);
            }}
          >
            <div className="message_reply_name">
              {m.whom === "my" ? my_name : him_name}
            </div>
            <div className="message_reply_content">
              {reply_message.photos && (
                <PhotosGroupMessage
                  photos={reply_message.photos}
                  setImgIndex={setImgIndex}
                  index_for_photos={index_for_photos}
                  setShow={setShow}
                />
              )}
              {reply_message.files && (
                <FilesGroupMessage files={reply_message.files} />
              )}
              {reply_message.audio && (
                <AudioMessage src={reply_message.audio} />
              )}
              {reply_message.message && (
                <div className="message_reply_text">
                  {reply_message.message}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplysGroupMessage;
