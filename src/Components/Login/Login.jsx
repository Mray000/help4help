import React, { useRef, useState } from "react";
import "./Login.scss";
import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { NavLink, Redirect } from "react-router-dom";
import { getAuthId } from "../../Redux/Selectors/AuthSelectors";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../Redux/Reducer/AuthReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { SetError } from "../../Redux/Reducer/AppReducer";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [is_submit, setIsSubmit] = useState(false);
  const my_id = useSelector(getAuthId);
  if (my_id) return <Redirect to={`profile/${my_id}`} />;
  return (
    <Formik
      onSubmit={(values) => {
        setIsSubmit(true);
        dispatch(SignIn(values.email, values.password));
      }}
      validationSchema={SignupSchema}
      initialValues={Object}
    >
      {({ handleSubmit, handleChange, errors }) => (
        <Form onSubmit={handleSubmit} className="login_container">
          {(() => {
            // if (errors.email) dispatch(SetError(errors.email));
            // if (errors.password) dispatch(SetError(errors.password));
          })()}
          <div className="col-4"></div>
          <div className="login col-4">
            <div style={{ fontWeight: "700", fontSize: "26px" }}>Login</div>
            <div className="login_form_in_container">
              <span className="login_form_in_icon">@</span>
              <Field
                name="email"
                onChange={handleChange}
                className="login_form_in"
                placeholder="Email"
              />
            </div>
            <div className="login_form_in_container">
              <span className="login_form_in_icon">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <Field
                type="password"
                name="password"
                onChange={handleChange}
                className="login_form_in"
                placeholder="Password"
              />
            </div>
            <span style={{ width: "80%", textAlign: "left" }}>
              Don't have an account? &nbsp;
              <NavLink
                to="/registration"
                style={{ color: "rgb(146 238 187)", cursor: "pointer" }}
              >
                Sign Up
              </NavLink>
            </span>
            <Button
              type="submit"
              className="login_form_submit"
              onClick={handleSubmit}
            >
              Sing In
            </Button>
          </div>
          <div className="col-4"></div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
