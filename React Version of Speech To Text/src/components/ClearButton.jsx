import React from 'react';
import "../App.css"

const ClearButton = ({ disabled, onClick }) => (
  <button className="btn clear" disabled={disabled} onClick={onClick}>
    Clear
  </button>
);

export default ClearButton;