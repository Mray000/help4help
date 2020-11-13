import React from "react";
import "./InputElementCreator.css";
import pointer from "./../images/strelka.png";
import cn from "classnames";

export const InputElementCreator = (El) => ({ input, meta, ...props }) => {
  // console.log('render');
  return (
    <div
      className={cn(
        { [`form`]: props.id !== "status-input" },
        { [`error`]: meta.touched && meta.error },
        { [`form-mini`]: props.id === "status-input" }
      )}
    >
      {props.label && (
        <label style={{ fontSize: "1.5vw", fontWeight: "700" }}>
          {props.label}:
        </label>
      )}
      <El {...input} {...props} className="ElementOfInput" />
      {meta.touched && meta.error && (
        <div className="warning">
          <div>
            <img src={pointer} alt="стрелка" className="warningPointer" />
          </div>
          <span className="errorSpan"> {meta.error}</span>
        </div>
      )}
    </div>
  );
};
