import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './EtudiantItem.css';

const EtudiantItem = props => {
  return (
    <li className="etudiant-item">
      <Card className="etudiant-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="etudiant-item__info">
            <h2>{props.DA}</h2>
            <h2>{props.nom}</h2>
            <h2>{props.courriel}</h2>
            <h2>{props.profil}</h2>
            <h3>
            {props.stages}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default EtudiantItem;
