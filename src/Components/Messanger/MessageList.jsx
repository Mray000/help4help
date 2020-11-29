import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMessages } from "../../Redux/Selectors/DialogsSelector.js";
import { Button, Modal } from "react-bootstrap";
import "./Messanger.scss";
import message_ava from "./../../images/ava.png";
import MessageForm from "./MessageForm.jsx";

const MessageList = () => {
  const messages = useSelector(getMessages);
  const scrollMessegeList = React.createRef();
  const [show, setShow] = useState(false);
  useEffect(() => {
    scrollMessegeList.current.scrollTop =
      scrollMessegeList.current.scrollHeight;
  }, [messages]);
  let first = true;
  let last_message = "you_first_message";
  let img_src = null;
  return (
    <div className="col-8 h-75  message_list_global_container">
      <div className="h-75 message_list_container" ref={scrollMessegeList}>
        <div className="message_list">
          {messages.map((m) => {
            if (last_message === m.whom) first = false;
            if (last_message !== m.whom) {
              first = true;
              last_message = m.whom;
            }
            if (last_message === "you_first_message") last_message = m.whom;
            img_src = m.photo;
            return (
              <div
                className={
                  m.whom === "my"
                    ? `my_m${first ? " first" : ""}`
                    : `him_m${first ? " first" : ""}`
                }
              >
                {first && (
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
                <div className="message_content">
                  <div className="w-50">
                    {m.photo && (
                      <img
                        alt=""
                        src={m.photo}
                        style={{ width: "300px" }}
                        onClick={() => setShow(true)}
                      />
                    )}
                  </div>
                  <div className="w-50">
                    {m.audio && (
                      <audio
                        controls
                        preload="none"
                        className="audio_message"
                        style={{ width: "300px" }}
                      >
                        <source src={m.audio} type="audio/mpeg" />
                      </audio>
                    )}
                  </div>
                  {m.message && <pre>{m.message}</pre>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MessageForm />
      <LargePhotoPreview show={show} setShow={setShow} photo={img_src} />
    </div>
  );
};

const LargePhotoPreview = ({ show, setShow, photo }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Body className="row">
        <img src={photo} className="col-12" />
      </Modal.Body>
    </Modal>
  );
};

export default MessageList;
