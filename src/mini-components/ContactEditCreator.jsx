import React from "react";
import { Field } from "redux-form";
import { InputElementCreator } from "./InputElementCreator";
// import { required } from "../utils/Validaters";

const ContactEdit = (place_name_label) => {
  return (
    <div key={place_name_label} style={{margin:"5%"}}>
      <Field
        placeholder={place_name_label}
        name={place_name_label}
        component={Input}
        label={place_name_label}
        id="contact-edit"
      />
    </div>
  );
};

const Input = InputElementCreator("input");

export default ContactEdit;
