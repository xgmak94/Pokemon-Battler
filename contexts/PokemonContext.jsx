import { useState, useEffect, useContext, createContext, useMemo } from 'react';

import axios from 'axios';

const pokemonURL = 'https://pokeapi.co/api/v2/';

const SERVER_URL = 'http://localhost:3002'; // local server

const NUM_POKEMON = 151; //151 || 898

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [allAbilities, setAllAbilities] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  const pokemonInfo = useMemo(
    () => ({
      allPokemon,
      setAllPokemon,
      allAbilities,
      setAllAbilities,
      allTypes,
      setAllTypes,
    }),
    [allPokemon, allAbilities, allTypes]
  );

  useEffect(() => {
    async function getAllPokemon() {
      let results = await axios.get(`${SERVER_URL}/pokemon`, {
        params: { limit: NUM_POKEMON },
      });
      setAllPokemon(results.data);
    }

    async function getAllAbilities() {
      let results = await axios.get(`${SERVER_URL}/abilities`);
      setAllAbilities(results.data);
    }

    async function getAllTypes() {
      let results = await axios.get(`${SERVER_URL}/types`);
      setAllTypes(results.data);
    }

    getAllPokemon();
    getAllAbilities();
    getAllTypes();
  }, []);

  return (
    <>
      <PokemonContext.Provider value={pokemonInfo}>{children}</PokemonContext.Provider>
    </>
  );
}
