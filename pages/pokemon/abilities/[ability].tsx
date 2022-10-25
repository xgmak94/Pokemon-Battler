import { useContext } from 'react';
import { useRouter } from 'next/router';

import PokemonCollapse from '../../../components/PokemonCollapse';
import prisma from '../../../utils/ConnectPrisma.js';
import { AccessibilityModifier } from 'typescript';

export async function getServerSideProps(context) {
  const ability = await prisma.abilities.findFirst({
    where: {
      name: context.query.ability,
    },
    select: {
      id_: true,
      name: true,
      effect_entries: true,
      pokemon: true,
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

interface Props {
  ability: Ability;
  pokemonWithAbility: Array<Pokemon>;
}

interface Ability {
  id_: number;
  name: string;
  pokemon: Array<Pokemon>;
  effect_entries: Array<Effect_Entry>;
}

interface Effect_Entry {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

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

export default function Ability({ ability, pokemonWithAbility }: Props) {
  let flavorText: Effect_Entry = ability.effect_entries.find(
    (entry) => entry.language.name === 'en'
  );

  return (
    <>
      <div className="flex flex-col justify-center m-3">
        <div className="flex justify-center capitalize">{ability.name.split('-').join(' ')}</div>
        <div className="flex justify-center">
          {flavorText ? flavorText.effect : `Could not find data on ${ability.name}`}
        </div>
        <PokemonCollapse text="Pokemon with ability" displayPokemon={pokemonWithAbility} />
      </div>
    </>
  );
}
