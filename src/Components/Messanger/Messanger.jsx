import React from "react";
import DialogsList from "./DialogsList/DialogsList";
import MessegeList from "./MessageList/MessageList";
import "./Messanger.scss";

const Messanger = () => {
  return (
    <div className="row h-100 global_messanger_container">
      <DialogsList />
      <div className="col-1"></div>
      <MessegeList />
    </div>
  );
};

export default Messanger;
