import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !props.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
)

export default PrivateRoute;