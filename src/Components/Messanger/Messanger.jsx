import React from "react";
import DialogsList from "./DialogsList/DialogsList";
import MessegeList from "./MessageList/MessageList";
import "./Messanger.scss";

const Messanger = () => {
  // let aue = useRef(null);
  // useEffect(() => {
  //   aue.current.style.height = window.innerWidth;
  // }, []);
  return (
    <div className="row global_messanger_container">
      <DialogsList />
      <div className="col-1"></div>
      <MessegeList />
    </div>
  );
};

export default Messanger;
