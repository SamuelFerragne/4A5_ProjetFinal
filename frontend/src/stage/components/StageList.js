import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import StageItem from './StageItem';
import Button from '../../shared/components/FormElements/Button';
import './StageList.css';

const StageList = props => {
  if (props.items.length === 0) {
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
      {props.items.map(stage => (
        <StageItem
          key={stage.id}
          id={stage.id}
          image={stage.image}
          title={stage.titre}
          description={stage.description}
          address={stage.address}
          creatorId={stage.createur}
          coordinates={stage.location}
          onDelete={props.onDeleteStage}
        />
      ))}
    </ul>
  );
};

export default StageList;
