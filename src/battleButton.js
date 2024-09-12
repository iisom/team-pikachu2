import React from 'react';

const BattleButton = ({ onClick }) => {
    console.log('please render my button!');
  const battleSim = () => {
    onClick(); // Call the onClick function passed from props
  };

  return (
    <button onClick={battleSim}>Battle!</button>
  );
};

export default BattleButton;
