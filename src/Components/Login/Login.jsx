import React from "react";
import "./Login.scss";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import registration_ava from "./../../images/registration_ava2.png";
import { InputGroup } from "react-bootstrap";
import { email } from "../../utils/Validaters";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { LoginAuth } from "./../../Redux/Reducer/AuthReducer";
// import { Redirect } from "react-router-dom";

//   const onSubmit = (formData) => {
//     let { email, password, rememberMe, captcha = null } = formData;
//     props.LoginAuth(email, password, rememberMe, captcha);
//   };

//   if (props.isAuth) return <Redirect to="/profile" />;

const Login = ({ mobile }) => {
  return (
    <Formik onSubmit={console.log} initialValues={Object}>
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
                    <Form.Group className="form_group">
                      <Form.Check
                        name="rememberMe"
                        label="Remember me!"
                        onChange={handleChange}
                        feedback={errors.terms}
                        className="remember_check_in"
                      />
                    </Form.Group>
                  </div>
                  <Button
                    type="submit"
                    onClick={() => {
                      return <Redirect to="/dialogs" />;
                    }}
                    className={`login_form_${
                      mobile ? "mobile_" : ""
                    }button_submit`}
                  >
                    Submit
                  </Button>
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

// const mapStateToProps = (state) => {
//   return {
//     isAuth: state.Auth.isAuth,
//     captcha: state.Auth.captcha,
//   };
// };

// export default connect(mapStateToProps, {
//   LoginAuth,
// })(Login);

export default Login;
