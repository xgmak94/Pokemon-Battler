import { useState, useEffect, useContext, useId } from 'react';

import { numPokemon, typeColors } from '../../constants';

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

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    let more = await axios.get('/api/pokemon', {
      params: { offset: allPokemon.length, limit: numPokemon[allPokemon.length] },
    });

    setAllPokemon((prev) => {
      return [...prev, ...more.data];
    });
    setLoading(false);
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
          className="h-1/6 w-screen rounded-full text-center text-4xl"
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
            {!loading ? 'Load more' : 'Loading...'}
          </button>
        </div>
      ) : null}
    </>
  );
}

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
