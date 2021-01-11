import React, { useEffect, useRef, useState } from "react";
import "./Registration.scss";
import DnD from "./DnD";
import { Button } from "@material-ui/core";
import { email } from "../../../utils/Validaters";
// import { setPreSubmitValues } from "../../../Redux/Reducer/AuthReducer";
import { Field, Form, Formik } from "formik";

const Registration = () => {
  const mobile = false;
  const [pageNumber, setPageNumber] = useState(1);
  const [preSubmitValues, setPreSubmitValues] = useState({});
  const [fade, setFade] = useState(false);
  return (
    <Formik
      onSubmit={(values) => {
        setFade(true);
        setTimeout(() => {
          setPageNumber(2);
        }, 1000);
        setPreSubmitValues(values);
      }}
      initialValues={preSubmitValues}
    >
      {({
        handleSubmit,
        handleChange,
        touched,
        values,
        initialValues,
        ...props
      }) => (
        <Form
          onSubmit={handleSubmit}
          className={`g_global_registration_${
            mobile ? "mobile_" : ""
          }container `}
        >
          <div className="col-4"></div>
          <div
            className={`global_registration_${
              mobile ? "mobile_" : ""
            }container  col-4`}
          >
            {pageNumber === 1 ? (
              <div
                className={`registration_${mobile ? "mobile_" : ""}form ${
                  fade ? "fade" : ""
                }`}
                onClick={() => {
                  window.pr = props;
                }}
              >
                <div className="registration_form__title">
                  <h1 className="title_content">Registration</h1>
                </div>
                <div className="field_label">Email</div>
                <Field
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="registration_form_in"
                  isValid={touched.email && values.email}
                  isInvalid={touched.email && !values.email}
                />
                <div className="field_label">Password</div>
                <Field
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="registration_form_in"
                  isValid={touched.password && values.password}
                  isInvalid={touched.password && !values.password}
                />
                <div className="field_label">Name</div>

                <Field
                  required
                  name="name"
                  onChange={handleChange}
                  className="registration_form_in"
                  isValid={touched.name && values.name}
                />
                <div className="field_label">Surname</div>

                <Field
                  required
                  name="surname"
                  onChange={handleChange}
                  className="registration_form_in"
                  isValid={touched.surname && values.surname}
                />
                <div className="field_label">Birthday</div>
                <Field
                  required
                  type="date"
                  name="bd"
                  className="form-control"
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  className={`registration_form_${
                    mobile ? "mobile_" : ""
                  }button_submit`}
                  onClick={() => {
                    if (
                      values.email &&
                      values.password &&
                      values.name &&
                      values.surname &&
                      values.bd
                    ) {
                      handleSubmit();
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <DnD
                fade={fade}
                setFade={setFade}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
          <div className="col-4"></div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
