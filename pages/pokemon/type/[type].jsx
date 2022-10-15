import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { PokemonContext } from '../../../contexts/PokemonContext';

import TypeLabel from '../../../components/PokemonInformation/types/TypeLabel';
import MoveCollapse from '../../../components/PokemonInformation/moves/MoveCollapse';
import DisplayPokemon from '../../../components/DisplayPokemon';
import PokemonCollapse from '../../../components/PokemonCollapse';

import axios from 'axios';
import prisma from './../../../utils/ConnectPrisma.js';

export async function getServerSideProps(context) {
  const type = await prisma.types.findFirst({
    orderBy: {
      id_: 'asc',
    },
    where: {
      name: context.query.type,
    },
  });

  const pokemonWithType = await prisma.pokemons.findMany({
    orderBy: {
      id_: 'asc',
    },
    where: {
      name: {
        in: type.pokemon.map((poke) => poke.pokemon.name),
      },
    },
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

  return {
    props: {
      type,
      pokemonWithType,
    },
  };
}

export default function Type({ type, pokemonWithType, movesArr }) {

  return (
    <>
      <div className="flex flex-col justify-center m-3">
        <div className="flex justify-center my-3">
          <TypeLabel type={type.name} />
        </div>
        {/* <MoveCollapse text="See moves" moveData={moveData} setMoveData={setMoveData} /> */}
        <PokemonCollapse text="See Pokemon" displayPokemon={pokemonWithType} />
      </div>
    </>
  );
}
