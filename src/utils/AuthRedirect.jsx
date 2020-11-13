// import React from "react";
// import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// const mapStateToProps = (state) => ({
//   isAuth: state.Auth.isAuth,
// });

// export const withAuthRedirect = (Component) => {
//   class RedirectComponent extends React.Component {
//     render() {
//       if (!this.props.isAuth) return <Redirect to={"/login"} />;
//       return <Component {...this.props} />;
//     }
//   }
//   return connect(mapStateToProps)(RedirectComponent);
// };
