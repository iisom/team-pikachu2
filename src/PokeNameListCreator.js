import React, { useState } from 'react';
import PokeNameList from "./PokeNameList.js";

function PokeNameListCreator() {
    const [nameList, setNameList] = useState(PokeNameList);

    function selectPokemonFromList() {

    }

    const arrayPokeNames = nameList.map(pokemonName => 
        <button id={pokemonName.text} onClick={selectPokemonFromList}>{pokemonName.text}</button>
    )

    console.log(JSON.stringify(nameList));

    return (
        <div>
            <h3>Select a Pokemon from the list below</h3>
            <div>
                {arrayPokeNames}
            </div>
        </div>
    );
}

export default PokeNameListCreator;