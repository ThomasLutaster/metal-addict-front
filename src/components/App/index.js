// == Import npm
import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, useLocation } from 'react-router-dom';

// == Import
import Page from 'src/components/Page';
import Login from 'src/containers/Login';
import RegisterUser from 'src/containers/RegisterUser';

import background from 'src/assets/images/background.jpg';

import './styles.scss';

// == Composant
const App = () => {
  axios.defaults.baseURL = 'https://www.metaladdict.fr/api/v1';

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="app-container">
        <Switch>
          <Route exact path="/connexion">
            <Login />
          </Route>
          <Route exact path="/inscription">
            <RegisterUser />
          </Route>
          <Route>
            <Page />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

// == Export
export default App;
