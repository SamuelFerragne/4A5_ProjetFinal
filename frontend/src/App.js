import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Accueil from './accueil/pages/Accueil';
import DeroulementEnseignant from './deroulement-enseignant/pages/DeroulementEnseignant';
import DeroulementStagiaire from './deroulement-stagiaire/pages/DeroulementStagiaire';
import Faq from './faq/pages/Faq';
import Profil from './profil/pages/Profil';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewStage from './stage/pages/NewStage'
import NewEtudiant from './user/pages/NewEtudiant';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  /*if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Accueil />
        </Route>
        <Route path="/:userId/places" exact>
          <DeroulementEnseignant />
        </Route>
        <Route path="/places/new" exact>
          <DeroulementStagiaire />
        </Route>
        <Route path="/places/:placeId">
          <Faq />
        </Route>
        <Route path="/places/:placeId">
          <Faq />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
   else {*/
   return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Accueil />
          </Route>
          <Route path="/deroulement-enseignant" exact>
            <DeroulementEnseignant/>
          </Route>
          <Route path="/deroulement-stagiaire" exact>
            <DeroulementStagiaire/>
          </Route>
          <Route path="/faq" exact>
            <Faq/>
          </Route>
          <Route path="/profil" exact>
            <Profil/>
          </Route>
          <Route path="/stage" exact>
            <NewStage/>
          </Route>
          <Route path="/etudiant" exact>
            <NewEtudiant/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );

  /*return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId:userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );*/
};

export default App;
