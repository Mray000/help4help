import React from "react";
import { useSelector } from "react-redux";
import AudioMessage from "./AudioMessage";
import FilesGroupMessage from "./FilesGroupMessage";
import PhotosGroupMessage from "./PhotosGroupsMessage";

const ReplysGroupMessage = ({
  reply_messages,
  MessageToFind,
  my_name,
  him_name,
  setImgIndex,
  index_for_photos,
  setShow,
}) => {
  if (reply_messages) {
    return (
      <div className="messages_reply_container">
        {reply_messages.map((m) => {
          return (
            <div
              className="message_reply"
              onClick={(e) => {
                e.stopPropagation();
                MessageToFind(m.id);
              }}
            >
              <div className="message_reply_name">
                {m.whom === "my" ? my_name : him_name}
              </div>
              <div className="message_reply_content">
                {m.photos && (
                  <PhotosGroupMessage
                    photos={m.photos}
                    setImgIndex={setImgIndex}
                    index_for_photos={index_for_photos}
                    setShow={setShow}
                  />
                )}
                {m.files && <FilesGroupMessage files={m.files} />}
                {m.audio && <AudioMessage src={m.audio} />}
                {m.text && <div className="message_reply_text">{m.text}</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else return null;
};

export default ReplysGroupMessage;
