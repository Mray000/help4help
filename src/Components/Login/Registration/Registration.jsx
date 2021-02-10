import React, { useRef, useState } from "react";
import "./Registration.scss";
import DnD from "./DnD";
import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .test("DOB", "you are 🤡", (value) => !["admin", "god"].includes(value))
    .required("Required"),

  surname: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  bd: Yup.string()
    .test(
      "DOB",
      "very young :)",
      (value) => !(moment().diff(moment(value), "years") <= 7)
    )
    .test(
      "DOB",
      "very old :)",
      (value) => moment().diff(moment(value), "years") <= 100
    )
    .required("Required"),
});

const Registration = () => {
  const mobile = false;
  let match = useRouteMatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [fade, setFade] = useState(false);
  let pre_submit_values = useRef({});
  return (
    <Switch>
      <Route path={`${match.path}/confirm`}>
        <div
          style={{
            textAlign: "center",
            fontWeight: "800",
            color: "#0075FF",
            height: "90vh",
            fontSize: "50px",
            paddingTop: "25%",
          }}
        >
          Check your email for confirm!👍
        </div>
      </Route>
      <Route path={match.path}>
        <Formik
          onSubmit={(values) => {
            pre_submit_values.current = values;
            setFade(true);
            setTimeout(() => setPageNumber(2), 1000);
          }}
          validationSchema={SignupSchema}
          initialValues={pre_submit_values}
        >
          {({ handleSubmit, handleChange, touched, errors }) => (
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
                  >
                    <div className="registration_form__title">
                      <h1 className="title_content">Registration</h1>
                    </div>
                    <div className="registration_form_in_container">
                      <div className="field_label">Email</div>
                      <Field
                        name="email"
                        onChange={handleChange}
                        className="registration_form_in"
                      />

                      {errors.email && touched.email && (
                        <div className="registration_valid_error">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="registration_form_in_container">
                      <div className="field_label">Password</div>
                      <Field
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="registration_form_in"
                      />
                      {errors.password && touched.password && (
                        <div className="registration_valid_error">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="registration_form_in_container">
                      <div className="field_label">Name</div>
                      <Field
                        name="name"
                        onChange={handleChange}
                        className="registration_form_in"
                      />
                      {errors.name && touched.name && (
                        <div className="registration_valid_error">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="registration_form_in_container">
                      <div className="field_label">Surname</div>
                      <Field
                        name="surname"
                        onChange={handleChange}
                        className="registration_form_in"
                      />
                      {errors.surname && touched.surname && (
                        <div className="registration_valid_error">
                          {errors.surname}
                        </div>
                      )}
                    </div>
                    <div className="registration_form_in_container">
                      <div className="field_label">Birthday</div>
                      <Field
                        type="date"
                        name="bd"
                        className="form-control"
                        onChange={handleChange}
                      />
                      {errors.bd && touched.bd && (
                        <div className="registration_valid_error">
                          {errors.bd}
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className={`registration_form_${
                        mobile ? "mobile_" : ""
                      }button_submit`}
                      onClick={handleSubmit}
                    >
                      Next
                    </Button>
                  </div>
                ) : (
                  <DnD
                    data={pre_submit_values.current}
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
      </Route>
    </Switch>
  );
};

export default Registration;
