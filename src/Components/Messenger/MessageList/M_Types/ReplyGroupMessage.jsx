import React from "react";
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
  my,
  ReplyMessagesGroup,
}) => {
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
            <div className="message_reply_name">{my ? my_name : him_name}</div>
            <div className="message_reply_content">
              {m.text && <div className="message_reply_text">{m.text}</div>}
              {m.photos && (
                <PhotosGroupMessage
                  photos={m.photos}
                  setImgIndex={setImgIndex}
                  index_for_photos={index_for_photos}
                  setShow={setShow}
                />
              )}
              {m.reply && (
                <ReplysGroupMessage
                  reply_messages={ReplyMessagesGroup(m.reply, m.id)}
                  MessageToFind={MessageToFind}
                  my_name={my_name}
                  him_name={him_name}
                  setImgIndex={setImgIndex}
                  index_for_photos={index_for_photos}
                  setShow={setShow}
                  my={my}
                  ReplyMessagesGroup={ReplyMessagesGroup}
                />
              )}
              {m.files && <FilesGroupMessage files={m.files} />}
              {m.audio && <AudioMessage src={m.audio} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplysGroupMessage;
