
import React from 'react';

const ResetButton = ({ onClick }) => {
  const handleClick = () => {
    onClick(); // Call the onClick function passed from props
  };

  return (
    <button onClick={handleClick}>Reset</button>
  );
};

export default ResetButton;
