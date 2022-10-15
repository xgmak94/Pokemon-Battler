import { useState, useEffect, useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import DisplayPokemon from '../../components/DisplayPokemon';

import { PokemonContext } from '../../contexts/PokemonContext';
import prisma from './../../utils/ConnectPrisma.js';

export async function getServerSideProps({ req }) {
  const pokemon = await prisma.pokemons.findMany({
    orderBy: {
      id_: 'asc',
    },
    take: 151,
    select: {
      id_: true,
      abilities: true,
      name: true,
      types: true,
      sprites: true,
    },
  });

  return {
    props: {
      pokemon,
    },
  };
}

export default function Pokemon({ pokemon }) {
  const [search, setSearch] = useState();

  const filteredPokemon = pokemon.filter((poke) => {
    return true;
  });

  return (
    <>
      <DisplayPokemon displayPokemon={filteredPokemon} />
    </>
  );
}
