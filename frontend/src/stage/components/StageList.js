import React, { useEffect, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import StageItem from './StageItem';
import Button from '../../shared/components/FormElements/Button';
import './StageList.css';

const StageList = props => {
  const [stages, setStages] = useState([]);

  const URL = "https://projetstages.onrender.com/api/stage/"
  console.log(URL);
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch(URL);
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setStages(responseData.stages);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchStages();
  }, []);

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
      {stages.map(stage => (
        <StageItem
          key={stage.id}
          id={stage.id}
          image={stage.image}
          title={stage.titre}
          description={stage.description}
          address={stage.address}
          creatorId={stage.createur}
          coordinates={stage.location}
        />
      ))}
    </ul>
  );
};

export default StageList;
