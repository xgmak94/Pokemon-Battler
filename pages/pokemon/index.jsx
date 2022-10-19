import { useState, useEffect, useContext, useId } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Select from 'react-select/';
import axios from 'axios';

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

  const types = await prisma.types.findMany({
    orderBy: {
      id_: 'asc',
    },
    take: 18,
  });

  return {
    props: {
      pokemon,
      types,
    },
  };
}

export default function Pokemon({ pokemon, types }) {
  const [allPokemon, setAllPokemon] = useState(pokemon);

  const [search, setSearch] = useState();
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilters, setTypeFilters] = useState([]);

  const filteredPokemon = allPokemon.filter((poke) => {
    if (poke.name.includes(nameFilter)) {
      let pokemonTypes = poke.types.map((type) => {
        return type.type.name;
      });

      return (
        typeFilters.length === 0 ||
        pokemonTypes.every((type) => {
          return typeFilters.includes(type);
        })
      );
    }
    return false;
  });

  const options = types
    .map((type) => {
      return {
        value: type.name,
        label: type.name[0].toUpperCase() + type.name.slice(1),
      };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

  function handleNameFilter(e) {
    if (e.target.value.length >= 2) {
      setNameFilter(e.target.value);
    } else {
      setNameFilter('');
    }
  }

  function handleFilter(inputValue, actionMeta) {
    let typeNames = inputValue.map((type) => {
      return type.value;
    });
    setTypeFilters(typeNames);
  }

  async function loadMorePokemon() {
    let more = await axios.get('/api/pokemon', {
      params: { offset: allPokemon.length, limit: numPokemon[allPokemon.length] },
    });

    setAllPokemon((prev) => {
      return [...prev, ...more.data];
    });
  }

  return (
    <>
      <div className="flex justify-center m-3">
        <Select
          className="h-1/6 w-3/5 rounded-full text-center text-4xl"
          id="long-value-select"
          instanceId="long-value-select"
          isMulti
          isOptionDisabled={() => typeFilters.length >= 2}
          onChange={handleFilter}
          options={options}
          styles={colorStyles}
          placeholder={'Filter by type'}
        />
      </div>
      <div className="flex justify-center m-3">
        <input
          className="h-1/6 rounded-full text-center text-4xl"
          type="text"
          placeholder="Search for a pokemon..."
          onChange={(e) => handleNameFilter(e)}
        />
      </div>
      <DisplayPokemon displayPokemon={filteredPokemon} />
      {allPokemon.length < 905 ? (
        <div className="flex justify-center">
          <button
            className="flex justify-center btn m-3 w-[90%] rounded-full"
            onClick={(e) => loadMorePokemon()}
          >
            Load more
          </button>
        </div>
      ) : null}
    </>
  );
}

const numPokemon = {
  151: 100, // gen2
  251: 135, // gen3
  386: 107, // gen4
  493: 156,
  649: 72,
  721: 88,
  809: 96,
};

const colorStyles = {
  option: (styles, { data }) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValue: (styles, { data }) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValueLabel: (styles, { data }) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      color: data.color,
    };
  },
};

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  fighting: '#C03028',
  water: '#6890F0',
  flying: '#A890F0',
  grass: '#78C850',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  psychic: '#F85888',
  rock: '#B8A038',
  ice: '#98D8D8',
  bug: '#A8B820',
  dragon: '#7038F8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  '???': '#68A090',
};
