import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { PokemonContext } from '../../contexts/PokemonContext';

import TypeContainer from '../../components/PokemonInformation/types/TypeContainer';
import AbilityContainer from '../../components/PokemonInformation/abilities/AbilityContainer';
import MoveCollapse from '../../components/PokemonInformation/moves/MoveCollapse';

import axios from 'axios';
import prisma from './../../utils/ConnectPrisma.js';

export async function getServerSideProps(context) {
  const pokemon = await prisma.pokemons.findFirst({
    orderBy: {
      id_: 'asc',
    },
    where: {
      name: context.query.pokemon,
    },
    select: {
      id_: true,
      abilities: true,
      forms: true,
      name: true,
      types: true,
      sprites: true,
      moves: true,
    },
  });

  return {
    props: {
      pokemon,
    },
  };
}

export default function Pokemon({ pokemon }) {

  return (
    <>
      <div className="card flex flex-col justify-center">
        <div className="flex justify-center">
          <Image
            src={pokemon.sprites.other['official_artwork'].front_default}
            alt="Pokemon"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h2 className="card-title capitalize justify-center">
            <div>#{pokemon.id_}</div>
            <div>{pokemon.name.split('-').join(' ')}</div>
          </h2>
          <TypeContainer types={pokemon.types} />
          <AbilityContainer abilities={pokemon.abilities} />
        </div>
      </div>
    </>
  );
}
