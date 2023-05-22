import React, { useState, useContext } from 'react';
import './StageItem.css';

const StageItem = props => {

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
