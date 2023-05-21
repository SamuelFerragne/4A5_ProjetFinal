import React, { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './StageItem.css';

const StageItem = props => {


  console.log(props);
  return (
    <React.Fragment>
      <div className='stage-item__actions'>
      <h2>{props.nomContact}</h2>
      <h2>{props.courrielContact}</h2>
      <h2>{props.entreprise}</h2>
      <h2>{props.adresse}</h2>
      <h2>{props.type}</h2>
      <h2>{props.nbPostesDisponible}</h2>
      <h2>{props.description}</h2>
      </div>
    </React.Fragment>
  );
};

export default StageItem;
