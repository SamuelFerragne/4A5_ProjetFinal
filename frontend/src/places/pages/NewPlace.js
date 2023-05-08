import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler  = async event =>  {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!

    try {
      const reponseData = await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          titre: formState.inputs.title.value,
          description: formState.inputs.description.value,
          adresse: formState.inputs.address.value,
          createur: auth.userId
        }),
        {
          "Content-Type": "application/json",
        }
      );

      console.log(reponseData);
     // history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Titre"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Entrez un nom valide."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Entrez une description valide (au moins 5 caractères)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Adresse"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Entrez une adresse valide."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Ajouter place
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlace;
