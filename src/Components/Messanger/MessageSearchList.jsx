import React from "react";
import "./Messanger.scss";

const MessageSearchList = ({
  message_for_search,
  MessageToFind,
  display_none,
  setMessageForSearch,
}) => {
  return (
    <div
      className={`message_search_list_global_container ${
        display_none ? "display_none" : ""
      }`}
    >
      {message_for_search.map((m) => {
        return (
          <div
            onClick={() => {
              setMessageForSearch([0]);
              MessageToFind(m.id);
            }}
            className={m.whom === "my" ? `my_m` : `him_m`}
          >
            <img
              src={
                m.whom === "my"
                  ? "https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg"
                  : "https://spark.ru/public/img/user_ava_big.png"
              }
              alt="arrr"
              className="message_ava"
            />
            <div className="message_content">
              <div className="messege_text">{m.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSearchList;
