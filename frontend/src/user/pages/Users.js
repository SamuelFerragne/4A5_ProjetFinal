import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import UsersList from "../components/UsersList";

const Users = () => {
  const {error, sendRequest, clearError } = useHttpClient();
  const [utilisateurs, setUtilisateurs] = useState();

  useEffect(() => {
    const recupererUtilisateurs = async () => {
      try {
        const reponseData = await sendRequest("http://localhost:5000/api/utilisateurs");

        setUtilisateurs(reponseData.utilisateurs);
      } catch (err) {
        
      }
    };
    recupererUtilisateurs();
  }, [sendRequest]);



  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
     {utilisateurs && <UsersList items={utilisateurs} />};
    </React.Fragment>
  );
};

export default Users;
