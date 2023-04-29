import React from 'react';
import "../App.css"

const DownloadButton = ({ disabled, onClick }) => (
  <button className="btn download" disabled={disabled} onClick={onClick}>
    Download
  </button>
);

export default DownloadButton;