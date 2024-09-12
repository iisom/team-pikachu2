import React, { useState } from 'react';

function Card({ name, type, image, hp, moves }) { //take in props from app
  const [showHP, setShowHP] = useState(false); // set state to not automatically show HP


  const toggleHP = () => { // Function to toggle the display of HP
    setShowHP(prevShowHP => !prevShowHP); // React Updater Function-Toggles showHP state between false (showHP) and true (!showHP)
  };

  return (
    <div className='container'>
      <div className="pokemon-card">
        <div className="section">
          <div className="pokemon-header">
            <h1 className="pokemon-name">{name}</h1>
            <h2 className="pokemon-type">{type}</h2>
            <h2 style={{ cursor: 'pointer' }} onClick={toggleHP}>  {/* cursor changes to pointer  on the HP display and either shows or hides data */}
              {showHP ? 'Hide HP' : 'Show HP'} {/*ternary operator- when showHP is true, 'Hide HP' is rendered, and when showHP is false, 'Show HP' is rendered*/}
            </h2>
            {showHP && <h2 className="pokemon-type">HP: {hp}</h2>} {/* Display HP if showHP is true */}
          </div>
          <div className="pokemon-image">
            <img src={image} alt={name} />
          </div>
          <div className="pokemon-moves">
          <h3>Moves:</h3>
            <ul>
                {moves.map((move, index) => (
                  <li key={index}>{move.name}</li> 
                ))}{/* Display each move */}
              </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
