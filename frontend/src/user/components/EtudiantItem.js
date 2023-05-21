import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import './EtudiantItem.css';

const EtudiantItem = props => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    fetch('https://projetstages.onrender.com/api/Stage')
      .then(response => response.json())
      .then(data => {
        setStages(data.stages); // Store the stages in state
      })
      .catch(error => console.error(error));
  }, []);

  const openModalHandler = () => {
    setShowModal(true);
    setSelectedEtudiant(props.nom);  // Set selected student
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedEtudiant(null);  // Reset selected student
    setSelectedStage(null);  // Reset selected stage
  };

  const confirmHandler = () => {
    fetch(`https://projetstages.onrender.com/api/Etudiant/${props.DA}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stages: selectedStage
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
    closeModalHandler();
  };

  const handleStageChange = (event) => {
    setSelectedStage(event.target.value);
  };

  return (
    <li className="etudiant-item">
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={selectedEtudiant}
        footerClass="etudiant-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="form-control">
              <label htmlFor="stage">Stage</label>
              <select id="stage" onChange={handleStageChange}>
                {stages.map(stage => (
                  <option key={stage.id} value={stage.id}>
                    {stage.entreprise} - {stage.type}
                  </option>
                ))}
              </select>
            </div>
            <button className="button" onClick={confirmHandler}>Confirmer</button>
          </React.Fragment>
        }
      >
        {/* Put the content of the modal here if needed */}
      </Modal>
      <Card className="etudiant-item__content">
        <div className="etudiant-item__info" onClick={openModalHandler}>
          <h2>{props.DA}</h2>
          <h2>{props.nom}</h2>
          <h2>{props.courriel}</h2>
          <h2>{props.profil}</h2>
          <h3>{props.stages}</h3>
        </div>
      </Card>
    </li>
  );
};

export default EtudiantItem;
