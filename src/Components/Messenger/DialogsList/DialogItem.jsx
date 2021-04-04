import React from "react";
import { NavLink } from "react-router-dom";
import ava from "./../../../images/ava.png";
import moment from "moment";
const DialogItem = ({
  self,
  id,
  last_message,
  is_typing,
  active,
  unread_messages,
  new_messages,
  online,
}) => {
  return (
    <NavLink
      to={"/messenger?self=" + id}
      className={active ? "dialog_list_humon_active" : "dialog_list_humon"}
      key={id}
    >
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <div className={online === "online" ? "online" : null}>
          <div
            className={"center_img"}
            style={{ width: "40px", height: "40px", margin: "4px" }}
          >
            <img src={self.ava || ava} alt="ava" />
          </div>
        </div>
        <div>
          <div className="name_surname">{self.name_surname}</div>
          {is_typing ? (
            <div>
              {is_typing.type === 1 ? "Typing message..." : "Record audio..."}
            </div>
          ) : (
            <div>
              {last_message && (
                <span
                  style={{
                    fontWeight: "100",
                    borderRadius: "6px",
                    padding: "1px",
                  }}
                >
                  {last_message.text
                    ? last_message.text.length > 16
                      ? last_message.text.substring(0, 16) + "..."
                      : last_message.text
                    : last_message.photos
                    ? "Photo"
                    : last_message.audio
                    ? "Audio"
                    : last_message.files
                    ? "Files"
                    : last_message.reply
                    ? last_message.reply.length + " replying message"
                    : null}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginRight: "5px", textAlign: "center", width: "40px" }}>
        {last_message && <div>{moment(last_message.date).format("HH:mm")}</div>}
        {new_messages !== 0 && (
          <div
            style={{
              backgroundColor: "skyblue",
              borderRadius: "100%",
              textAlign: "center",
              width: "20px",
              height: "20px",
              lineHeight: "20px",
              marginLeft: "25%",
              color: "white",
            }}
          >
            {new_messages}
          </div>
        )}
        {unread_messages !== 0 && (
          <div
            style={{
              backgroundColor: "skyblue",
              borderRadius: "100%",
              textAlign: "center",
              width: "10px",
              height: "10px",
              marginTop: "5px",
              marginLeft: "50%",
            }}
          ></div>
        )}
      </div>
    </NavLink>
  );
};

export default React.memo(DialogItem);
