import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const UpdateStage = () => {
  const auth = useContext(AuthContext);
  const {error, sendRequest, clearError } = useHttpClient();
  const [loadedStage, setLoadedStage] = useState();
  const stageId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchStage = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/stages/${stageId}`
        );
        setLoadedStage(responseData.stage);
        console.log(responseData.stage)
        setFormData(
          {
            title: {
              value: responseData.stage.titre,
              isValid: true
            },
            description: {
              value: responseData.stage.description,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchStage();
  }, [sendRequest, stageId, setFormData]);

  const stageUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/stages/${stageId}`,
        'PATCH',
        JSON.stringify({
          titre: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/' + auth.userId + '/stages');
    } catch (err) {}
  };



  if (!loadedStage && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedStage && (
        <form className="stage-form" onSubmit={stageUpdateSubmitHandler}>
          <Input
            id="contact"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedStage.titre}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedStage.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Mettre la stage à jour
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateStage;
