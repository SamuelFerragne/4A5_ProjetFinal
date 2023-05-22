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

const App = () => {
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

};

export default App;
