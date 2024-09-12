import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Card.css';
import SearchButton from './SearchButton';
import ResetButton from './ResetButton';
import PokeNameList from "./PokeNameList.js";
import BattleButton from './battleButton.js';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [currentPokemon1, setCurrentPokemon1] = useState({
    name: '',
    type: '',
    image: '',
    hp: '',
    moves: []
  });
  const [currentPokemon2, setCurrentPokemon2] = useState({
    name: '',
    type: '',
    image: '',
    hp: '',
    moves: []
  });
  const [fetchPokemonOnSubmit1, setFetchPokemonOnSubmit1] = useState(false);
  const [fetchPokemonOnSubmit2, setFetchPokemonOnSubmit2] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (fetchPokemonOnSubmit1 && searchInput.trim() !== '') {
          let fetchURL1 = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;
          const response1 = await fetch(fetchURL1);

          if (!response1.ok) {
            throw new Error('Network response was not ok');
          }

          const data1 = await response1.json();

          const pokemon1 = {
            name: capL(data1.name),
            type: capL(data1.types[0].type.name),
            image: data1.sprites.front_default,
            hp: data1.stats.find(stat => stat.stat.name === 'hp').base_stat,
            moves: [
              { name: data1.moves[0].move.name },
              { name: data1.moves[1].move.name }
            ]
          };

          setCurrentPokemon1(pokemon1);
          setFetchPokemonOnSubmit1(false);
        }

        if (fetchPokemonOnSubmit2 && searchInput.trim() !== '') {
          let fetchURL2 = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;
          const response2 = await fetch(fetchURL2);

          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }

          const data2 = await response2.json();

          const pokemon2 = {
            name: capL(data2.name),
            type: capL(data2.types[0].type.name),
            image: data2.sprites.front_default,
            hp: data2.stats.find(stat => stat.stat.name === 'hp').base_stat,
            moves: [
              { name: data2.moves[0].move.name },
              { name: data2.moves[1].move.name }
            ]
          };

          setCurrentPokemon2(pokemon2);
          setFetchPokemonOnSubmit2(false);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchPokemon();
  }, [fetchPokemonOnSubmit1, fetchPokemonOnSubmit2, searchInput]);

  const capL = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (searchInput.trim() !== '') {
      try {
        let fetchURL = `https://pokeapi.co/api/v2/pokemon?limit=1118`;
        const response = await fetch(fetchURL);
        const data = await response.json();
        const names = data.results.map(result => result.name);

        // Filter names that start with the searchInput
        const filteredNames = names.filter(name => name.startsWith(searchInput.toLowerCase()));

        // Trigger fetching based on the filtered names
        if (!currentPokemon1.name && filteredNames.length > 0) {
          setFetchPokemonOnSubmit1(true);
        } else if (!currentPokemon2.name && filteredNames.length > 1) {
          setFetchPokemonOnSubmit2(true);
        } else {
          alert('No more slots available for fetching Pokémon.');
        }
      } catch (error) {
        console.error('Error fetching Pokémon names:', error);
      }
    }
  };

  const handleClick = () => {
    setSearchInput('');
    setCurrentPokemon1({
      name: '',
      type: '',
      image: '',
      hp: '',
      moves: []
    });
    setCurrentPokemon2({
      name: '',
      type: '',
      image: '',
      hp: '',
      moves: []
    });
    setFetchPokemonOnSubmit1(false);
    setFetchPokemonOnSubmit2(false);
  };

  const battleSim = () => {
    if (currentPokemon1.hp > currentPokemon2.hp) {
      alert("Pokemon 1: " + currentPokemon1.name + " Wins!");
    } else if (currentPokemon1.hp === currentPokemon2.hp) {
      alert("Wow! A tie... " + currentPokemon2.name + " wins because it's cooler!");
    } else {
      alert("Pokemon 2: " + currentPokemon2.name + " Wins!");
    }
  };

  return (
    <div className="App">
      <div className="flex-container">
        <div>
          <PokeNameList />
        </div>
        <div className="extender"></div>
        <div>
          <div className="formArea">
            <h1>Pokémon Cards</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="inputBox"
                type="text"
                placeholder="Enter Pokémon Name"
                value={searchInput}
                onChange={handleInputChange}
              />
              <div>
                <SearchButton onClick={handleSubmit} />
                <ResetButton onClick={handleClick} />
                <BattleButton onClick={battleSim} />
              </div>
            </form>
          </div>
          <div className="pokemonCardsDisplay1">
            {currentPokemon1.name && (
              <Card
                name={currentPokemon1.name}
                type={currentPokemon1.type}
                image={currentPokemon1.image}
                hp={currentPokemon1.hp}
                moves={currentPokemon1.moves}
              />
            )}
          </div>
          <div className="pokemonCardsDisplay2">
            {currentPokemon2.name && (
              <Card
                name={currentPokemon2.name}
                type={currentPokemon2.type}
                image={currentPokemon2.image}
                hp={currentPokemon2.hp}
                moves={currentPokemon2.moves}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
