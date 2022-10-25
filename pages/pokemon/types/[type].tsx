import { GetServerSideProps } from 'next';

import TypeLabel from '../../../components/PokemonInformation/types/TypeLabel';
import PokemonCollapse from '../../../components/PokemonCollapse';

import prisma from '../../../utils/ConnectPrisma.js';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = await prisma.types.findFirst({
    orderBy: {
      id_: 'asc',
    },
    where: {
      name: context.query.type as string,
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
};

export default function Type({ type, pokemonWithType, movesArr }) {
  return (
    <>
      <div className="flex flex-col justify-center m-3">
        <div className="flex justify-center my-3">
          <TypeLabel type={type.name} />
        </div>
        <PokemonCollapse text="See Pokemon" displayPokemon={pokemonWithType} />
      </div>
    </>
  );
}
