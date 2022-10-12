import { useState, useEffect, useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import DisplayPokemon from '../../components/DisplayPokemon';

import { PokemonContext } from '../../contexts/PokemonContext';

export default function Pokemon() {
  let pokemon = useContext(PokemonContext);

  const [search, setSearch] = useState();

  const filteredPokemon = pokemon.allPokemon.filter((pokemon) => {
    return true;
  });

  return (
    <>
      <DisplayPokemon displayPokemon={filteredPokemon} />
    </>
  );
}
