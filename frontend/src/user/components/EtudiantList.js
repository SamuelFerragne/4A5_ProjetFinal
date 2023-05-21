import React, { useState, useEffect } from 'react';

import EtudiantItem from './EtudiantItem';
import Card from '../../shared/components/UIElements/Card';
import './EtudiantList.css';

const EtudiantsList = props => {
  const [etudiants, setEtudiants] = useState([]);

  
  useEffect(() => {
    fetch('https://projetstages.onrender.com/api/Etudiant')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Pour vérifier ce que vous obtenez de l'API
        setEtudiants(data.etudiants); // Récupérer les étudiants du tableau 'etudiants'
      })
      .catch(error => console.error(error));
  }, []);

  if (!etudiants || etudiants.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Aucun etudiant trouvé</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="etudiant-list">
      {etudiants.map(etudiant => (
        <EtudiantItem
          key={etudiant.id}
          DA={etudiant.DA}
          nom={etudiant.nom}
          courriel={etudiant.courriel}
          profil={etudiant.profil}
        />
      ))}
    </ul>
  );
};

export default EtudiantsList;
