import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';

const Protect = ({ children, user, ...rest }) => {
  return (
    <Route {...rest}
      render={() => {
        return user ? children : <Redirect to={routes.login} />
      }}
    />
  )
}

export default Protect;
