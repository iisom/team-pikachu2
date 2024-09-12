import React from 'react';

function SearchButton({ onClick }) {
  return (
    <button id='searchSubmit' type="submit" onClick={onClick}>
      Fetch Pokémon
    </button>
  );
}

export default SearchButton;
