import React, { useEffect, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import StageItem from './StageItem';
import Button from '../../shared/components/FormElements/Button';
import './StageList.css';

const StageList = props => {
  const [stages, setStages] = useState([]);
  let filteredStages = props.stages;

  useEffect(() => {
    fetch('https://projetstages.onrender.com/api/Stage')
      .then(response => response.json())
      .then(data => {
        //console.log(data); // Pour vérifier ce que vous obtenez de l'API
        setStages(data.stages); // Récupérer les étudiants du tableau 'etudiants'
      })
      .catch(error => console.error(error));
  }, []);

  filteredStages = props.selectedStageType === "Tous"
  ? stages
  : stages.filter(stage => stage.type === props.selectedStageType);

  if (stages.length === 0) {
    return (
      <div className="stage-list center">
        <Card>
          <h2>No stage found. Maybe create one?</h2>
          <Button to="/stages/new">Share stage</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="stage-list">
      {filteredStages.map(stage => (
        <StageItem
          key={stage.id}
          id={stage.id}
          nomContact={stage.nomContact}
          courrielContact={stage.courrielContact}
          entreprise={stage.entreprise}
          type={stage.type}
          nbPostesDisponible={stage.nbPostesDisponible}
          description={stage.description}
        />
      ))}
    </ul>
  );
};

export default StageList;
