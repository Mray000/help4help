import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDialogsList } from "../../Redux/Selectors/DialogsSelector";
import ava from "./../../images/ava.png";
import "./Messanger.scss";

const DialogsList = () => {
  const people_list = useSelector(getDialogsList);
  return (
    <div className="col-3 h-75 dialogs_list_global_container">
      {people_list.map((p) => {
        return (
          <NavLink
            to={"/dialogs/" + p.id}
            className="dialog_list_humon_container"
          >
            <div className="dialog_list_humon">
              <img className="avatar" src={p.ava ? p.ava : ava} alt="" />
              <div className="dialog_list_name_last_m">
                <div>{p.name}</div>
                <div className="last_message">Last message...</div>
              </div>
            </div>
            <div className="hrrr"></div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default DialogsList;
