import React from 'react';
import "../App.css"

const RecordButton = ({ recording, onClick }) => (
  <button className="btn record" onClick={onClick}>
    <p>{recording ? 'Listening...' : 'Start Listening'}</p>
  </button>
);

export default RecordButton;