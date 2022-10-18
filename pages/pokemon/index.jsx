import { useState, useEffect, useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Select from 'react-select/';

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
      sprites: {
        select: {
          other: {
            select: {
              official_artwork: {
                select: {
                  front_default: true,
                },
              },
            },
          },
        },
      },
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
  const [nameFilter, setNameFilter] = useState('');

  const filteredPokemon = pokemon.filter((poke) => {
    if (poke.name.includes(nameFilter)) {
      return true;
    }
    return false;
  });

  function handleChange(e) {
    if (e.target.value.length >= 2) {
      setNameFilter(e.target.value);
    } else {
      setNameFilter('');
    }
  }

  return (
    <>
      <div className="flex justify-center m-3">
        <input
          className="h-1/6 rounded-full text-center text-4xl"
          type="text"
          placeholder="Search for a pokemon..."
          onChange={(e) => handleChange(e)}
        />
      </div>
      <DisplayPokemon displayPokemon={filteredPokemon} />
    </>
  );
}
