import React, { useState } from 'react';

const Select = ({ id, label, onInput, errorText }) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const changeHandler = event => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    const valid = !!selectedValue;  // Converts the string to a boolean
    setIsValid(valid);
    onInput(id, selectedValue, valid);
  };
  

  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={changeHandler}>
        <option value="">Sélectionner le type de stage</option>
        <option value="reseau_et_securite">Réseaux et sécurité</option>
        <option value="developpement_applications">Développement d'applications</option>
      </select>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Select;
