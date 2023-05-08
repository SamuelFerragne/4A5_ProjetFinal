import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const responseData = await response.json();
        console.log(responseData)
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };


  return {error, sendRequest, clearError};
};
