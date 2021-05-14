import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import Base from 'templates/Base';
import Login from 'views/Login';
import Register from 'views/Register';
import Inbox from 'views/Inbox';
import Planner from 'views/Planner';
import Projects from 'views/Projects';
import Protect from 'elements/Protect';

const Root = () => {
  const [user, setUser] = useState(false);

  const login = () => {
    setUser(true);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Base>
            <Switch>
              <Route exact path={routes.home}
                render={() => <Redirect to={routes.inbox} />}
              />
              <Route exact path={routes.login}>
                <Login login={login} />
              </Route>
              <Route exact path={routes.register}>
                <Register login={login} />
              </Route>
              <Protect user={user} exact path={routes.inbox}>
                <Inbox />
              </Protect>
              <Protect user={user} path={routes.inboxForm}>
                <Inbox type='form' />
              </Protect>
              <Protect user={user} path={routes.inboxDetails}>
                <Inbox type='details' />
              </Protect>
              <Protect user={user} exact path={routes.planner}>
                <Planner />
              </Protect>
              <Protect user={user} path={routes.plannerForm}>
                <Planner type='form' />
              </Protect>
              <Protect user={user} path={routes.plannerDetails}>
                <Planner type='details' />
              </Protect>
              <Protect user={user} exact path={routes.projects}>
                <Projects />
              </Protect>
              <Protect user={user} path={routes.projectsForm}>
                <Projects type='form' />
              </Protect>
              <Protect user={user} path={routes.projectsDetails}>
                <Projects type='details' />
              </Protect>
            </Switch>
          </Base>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default Root;
