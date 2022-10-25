import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';

import { numPokemon, typeColors } from '../../constants';

import Select from 'react-select/';
import axios from 'axios';

import DisplayPokemon from '../../components/DisplayPokemon';

import prisma from '../../utils/ConnectPrisma.js';

export const getServerSideProps: GetServerSideProps = async () => {
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
    select: {
      id_: true,
      name: true,
    },
  });

  return {
    props: {
      pokemon,
      types,
    },
  };
};

interface Pokemon {
  id_: Number;
  name: String;
  sprites: {
    other: {
      official_artwork: {
        front_default: String;
      };
    };
  };
  types: Array<Type>;
}

interface Type {
  slot: Number;
  type: {
    name: String;
    url: String;
  };
}

interface Types {
  name: String;
}

interface Props {
  pokemon: Array<Pokemon>;
  types: Array<Types>;
}

export default function Pokemon({ pokemon, types }: Props) {
  const [allPokemon, setAllPokemon] = useState(pokemon);

  const [loading, setLoading] = useState(false);

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

  const options = types.map((type) => {
    return {
      value: type.name,
      label: type.name[0].toUpperCase() + type.name.slice(1),
    };
  });
  // options.sort((a, b) => a.value.localeCompare(b.value));

  function handleNameFilter(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length >= 2) {
      setNameFilter(e.target.value);
    } else {
      setNameFilter('');
    }
  }

  function handleFilter(inputValue: any[], _actionMeta: any) {
    let typeNames = inputValue.map((type: { value: any }) => {
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
          {!loading ? (
            <button
              className="flex justify-center btn m-3 w-[90%] rounded-full"
              onClick={(_e) => loadMorePokemon()}
            >
              Load More
            </button>
          ) : (
            <button className="flex justify-center btn m-3 w-[90%] rounded-full">Loading...</button>
          )}
        </div>
      ) : null}
    </>
  );
}

const colorStyles = {
  option: (styles: any, { data }: any) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValueLabel: (styles: any, { data }: any) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      color: data.color,
    };
  },
};
