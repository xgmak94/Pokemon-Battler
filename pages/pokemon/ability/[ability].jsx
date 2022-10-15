import { useContext } from 'react';
import { useRouter } from 'next/router';
import { PokemonContext } from '../../../contexts/PokemonContext';

import PokemonCollapse from '../../../components/PokemonCollapse';
import prisma from './../../../utils/ConnectPrisma.js';

export async function getServerSideProps(context) {
  const ability = await prisma.abilities.findFirst({
    where: {
      name: context.query.ability,
    },
  });

  const pokemonWithAbility = await prisma.pokemons.findMany({
    orderBy: {
      id_: 'asc',
    },
    where: {
      name: {
        in: ability.pokemon.map((poke) => poke.pokemon.name),
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
      ability,
      pokemonWithAbility,
    },
  };
}

export default function Ability({ ability, pokemonWithAbility }) {
  let flavorText = ability.effect_entries.find((entry) => entry.language.name === 'en');

  return (
    <>
      <div className="flex flex-col justify-center m-3">
        <div className="flex justify-center capitalize">{ability.name}</div>
        <div className="flex justify-center">{flavorText.effect}</div>
        <PokemonCollapse text="Pokemon with ability" displayPokemon={pokemonWithAbility} />
      </div>
    </>
  );
}
