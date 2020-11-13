import React from "react";
import DialogsList from "./DialogsList";
import MessegeList from "./MessageList";
import "./Messanger.scss";

const Messanger2 = () => {
  return (
    <div className="row h-100 global_messanger_container">
      <DialogsList />
      <div className="col-1"></div>
      <MessegeList />
    </div>
  );
};

export default Messanger2;
