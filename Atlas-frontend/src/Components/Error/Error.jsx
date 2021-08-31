import React from 'react';
import { useHistory } from 'react-router-dom';
import './Error.css';

function Error({ message }) {
  const history = useHistory();

  return (
    <div className="error-conatiner">
      <h1 className="text-error">Unexpected Error</h1>
      <code>{message}</code>
      <button className="btn" onClick={() => history.replace('/home')}>
        GO TO HOME
      </button>
    </div>
  );
}

export default Error;
