import React, { useState } from "react";
import "./Login.scss";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import registration_ava from "./../../images/registration_ava2.png";
import { email } from "../../utils/Validaters";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "./../../Redux/Reducer/AuthReducer";
import { getAuthId } from "../../Redux/Selectors/AuthSelectors";
import Preloader from "../../mini-components/Preloader";
const Login = ({ mobile }) => {
  const dispatch = useDispatch();
  const [is_submit, setIsSubmit] = useState(false);
  const my_id = useSelector(getAuthId);
  if (localStorage.getItem("token"))
    return <Redirect to={`profile/${my_id}`} />;
  return (
    <Formik
      initialValues={Object}
      onSubmit={(values) => {
        setIsSubmit(true);
        dispatch(SignIn(values.email, values.password));
      }}
    >
      {({ handleSubmit, handleChange, touched, errors, values }) => (
        <Form onSubmit={handleSubmit}>
          <div id={`global_login_${mobile ? "mobile_" : ""}container`}>
            <div className="row">
              <div
                className={`col-md-6 registration_ava_${
                  mobile ? "mobile_" : ""
                }container`}
              >
                <img
                  src={registration_ava}
                  alt="internet"
                  id="registration_ava"
                />
              </div>
              <Form.Group className="col-md-6 mt-5">
                <div className={`login_${mobile ? "mobile_" : ""}form`}>
                  <div className="login_form__title">
                    <h1 className="title_content">Войти</h1>
                  </div>
                  <div>
                    <Form.Group className="form_group">
                      <Form.Label className="in__label">Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="login_form_in"
                        isValid={touched.email && values.email}
                        isInvalid={touched.email && email(values.email)}
                      />
                    </Form.Group>
                    <Form.Group className="form_group">
                      <Form.Label className="in__label">Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="login_form_in"
                        isValid={touched.password && values.password}
                        isInvalid={touched.password && !values.password}
                      />
                    </Form.Group>
                  </div>
                  {!is_submit ? (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className={`login_form_${
                        mobile ? "mobile_" : ""
                      }button_submit`}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Preloader width="100px" height="40px" />
                  )}
                  <div
                    className={`registration_${
                      mobile ? "mobile_" : ""
                    }penitration`}
                  >
                    <div className="forgot_password_form">
                      <NavLink to="/restore" className="nav-link">
                        Forgot Password
                      </NavLink>
                    </div>
                    <div className="dont_have_account">
                      <span>
                        Dont have an account?
                        <br />
                        <NavLink to="/registration" className="nav-link">
                          Sign Up
                        </NavLink>
                      </span>
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
