import React from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import "./Registration.scss";
import DnD from "./DnD";

const Registration = () => {
  const mobile = false;

  if (mobile) return <Redirect to="/profile" />;
  return (
    <Formik onSubmit={console.log} initialValues={Object}>
      {({ handleSubmit, handleChange, touched, errors, values }) => (
        <Form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <div className="col-4"></div>
          <Form.Group
            id={`global_registration_${mobile ? "mobile_" : ""}container`}
            className="col-4"
          >
            <div className={`login_${mobile ? "mobile_" : ""}form`}>
              <div className="login_form__title">
                <h1 className="title_content">Registration</h1>
              </div>
              <div>
                <Form.Group className="form_group">
                  <Form.Label className="in__label">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="registration_form_in"
                    isValid={touched.email && values.email}
                    // isInvalid={touched.email && email(values.email)}
                  />
                </Form.Group>

                <Form.Group className="form_group">
                  <Form.Label className="in__label">Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="registration_form_in"
                    isValid={touched.password && values.password}
                  />
                </Form.Group>
                <Form.Group className="form_group">
                  <Form.Label className="in__label">Name</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    onChange={handleChange}
                    className="registration_form_in"
                    isValid={touched.name && values.name}
                  />
                </Form.Group>
                <Form.Group className="form_group">
                  <Form.Label className="in__label">Surname</Form.Label>
                  <Form.Control
                    required
                    name="surname"
                    onChange={handleChange}
                    className="registration_form_in"
                    isValid={touched.surname && values.surname}
                  />
                </Form.Group>
                <Form.Group className="form_group">
                  <Form.Label className="in__label">Birthday</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="data"
                    className="form-control"
                    onChange={handleChange}
                    // className="registration_form_in"
                  />
                </Form.Group>
                <DnD />
              </div>
              <div>
                <Button
                  type="submit"
                  className={`registration_form_${
                    mobile ? "mobile_" : ""
                  }button_submit`}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form.Group>
          <div className="col-4"></div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
