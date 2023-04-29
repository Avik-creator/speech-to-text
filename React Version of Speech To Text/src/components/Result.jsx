import React from 'react';
import "../App.css"

const Result = ({ text }) => (
  <div className='result'>
    {text.split('\n').map((line, index) => (
      <p  key={index}>{line}</p>
    ))}
  </div>
);

export default Result;