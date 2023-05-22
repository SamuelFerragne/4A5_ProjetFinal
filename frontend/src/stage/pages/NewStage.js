import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StageList from "../components/StageList";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Select from "../../shared/components/FormElements/Select";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_NUMBER,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./StageForm.css";

const NewStage = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [isFormVisible, setFormVisible] = useState(false);
  const [stages, setStages] = useState([]);
  const [selectedStageType, setSelectedStageType] = useState("Tous");

  const handleStageTypeChange = (id, value, isValid) => {
    if (isValid) {
      setSelectedStageType(value);
    } else {
      setSelectedStageType("Tous");
    }
  };

  useEffect(() => {
    fetch('https://projetstages.onrender.com/api/Stage')
      .then(response => response.json())
      .then(data => {
        setStages(data.stages);
      })
      .catch(error => console.error(error));
  }, []);

  const filteredStages = selectedStageType === "Tous"
  ? stages
  : stages.filter(stage => stage.type === selectedStageType);

  const toggleFormVisibility = () => {
    setFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };
  const [formState, inputHandler] = useForm(
    {
      nomcontact: {
        value: "",
        isValid: false,
      },
      courrielContact: {
        value: "",
        isValid: false,
      },
      telephoneContact: {
        value: "",
        isValid: false,
      },
      entreprise: {
        value: "",
        isValid: false,
      },
      adresse: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      nombrePostes: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const stageSubmitHandler = async (event) => {
    event.preventDefault();
    setFormVisible(false);

    const dataToSend = JSON.stringify({
      nomContact: formState.inputs.nomContact.value,
      courrielContact: formState.inputs.courrielContact.value,
      telephoneContact: formState.inputs.telephoneContact.value,
      entreprise: formState.inputs.entreprise.value,
      adresse: formState.inputs.adresse.value,
      type: formState.inputs.type.value,
      nbPostesDisponible: formState.inputs.nombrePostes.value,
      description: formState.inputs.description.value,
      remuneration: formState.inputs.remuneration.value
    });

    console.log(dataToSend);


    try {
      const reponseData = await sendRequest(
        'https://projetstages.onrender.com/api/Stage',
        "POST",
        dataToSend,
        {
          "Content-Type": "application/json",
        }
      );

      console.log(reponseData);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Button onClick={toggleFormVisibility}>
        {isFormVisible ? "Masquer le formulaire" : "Afficher le formulaire"}
      </Button>

      <Select
        id="stageType"
        label="Type de stage à afficher"
        onInput={handleStageTypeChange}
        value={selectedStageType}
      />

      {isFormVisible && (
            <form className="stage-form" onSubmit={stageSubmitHandler}>
              <Input
                id="nomContact"
                element="input"
                type="text"
                label="Nom personne contact"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom valide."
                onInput={inputHandler}
              />
              <Input
                id="courrielContact"
                element="input"
                type="email"
                label="Courriel personne contact"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide."
                onInput={inputHandler}
              />
              <Input
                id="telephoneContact"
                element="input"
                type="tel"
                label="Numéro de téléphone de la personne contact"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
                errorText="Entrez un numéro de téléphone valide."
                onInput={inputHandler}
              />
              <Input
                id="entreprise"
                element="input"
                type="text"
                label="Nom de l'entreprise"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom valide."
                onInput={inputHandler}
              />
              <Input
                id="adresse"
                element="input"
                type="text"
                label="Adresse de l’entreprise"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez une adresse valide."
                onInput={inputHandler}
              />
              <Select
                id="type"
                label="Type de stage"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Veuillez sélectionner le type de stage."
                onInput={inputHandler}
              />
              <Input
                id="nombrePostes"
                element="input"
                type="number"
                label="Nombre de postes disponibles"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
                errorText="Entrez un nombre valide."
                onInput={inputHandler}
              />
              <Input
                id="description"
                element="textarea"
                label="Description du stage"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Entrez une description valide (au moins 5 caractères)."
                onInput={inputHandler}
              />
              <Input
                id="remuneration"
                element="input"
                type="text"
                label="Rémunération"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez une rémunération valide."
                onInput={inputHandler}
              />
              <Button type="submit">Ajouter stage</Button>
            </form>
      )}
            <StageList selectedStageType={selectedStageType}/>
    </React.Fragment>
  );
};

export default NewStage;
