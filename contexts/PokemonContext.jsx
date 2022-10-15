import { useState, useEffect, useContext, createContext, useMemo } from 'react';

import axios from 'axios';

const pokemonURL = 'https://pokeapi.co/api/v2/';

const SERVER_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SERVER; // same next server
const NUM_POKEMON = 151; // 151 || 898

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
      let results = await axios.get(`${SERVER_URL}/api/pokemon`, {
        params: { limit: NUM_POKEMON },
      });
      setAllPokemon(results.data);
    }

    async function getAllAbilities() {
      let results = await axios.get(`${SERVER_URL}/api/abilities`);
      setAllAbilities(results.data);
    }

    async function getAllTypes() {
      let results = await axios.get(`${SERVER_URL}/api/types`);
      setAllTypes(results.data);
    }

    getAllPokemon();
    getAllAbilities();
    getAllTypes();
  }, []);

  // console.log(allPokemon, allAbilities, allTypes);

  return (
    <>
      <PokemonContext.Provider value={pokemonInfo}>{children}</PokemonContext.Provider>
    </>
  );
}
