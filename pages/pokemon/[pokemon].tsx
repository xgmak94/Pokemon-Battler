import Image from 'next/image';

import TypeContainer from '../../components/PokemonInformation/types/TypeContainer';
import AbilityContainer from '../../components/PokemonInformation/abilities/AbilityContainer';

import prisma from '../../utils/ConnectPrisma.js';

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
      moves: true,
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

interface Props {
  pokemon: Pokemon;
}

interface Pokemon {
  abilities: any;
  id_: Number;
  name: String;
  sprites: {
    other: {
      official_artwork: {
        front_default: string;
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

export default function Pokemon({ pokemon }: Props) {
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
            <div>{`#${pokemon.id_}`}</div>
            <div>{pokemon.name.split('-').join(' ')}</div>
          </h2>
          <TypeContainer types={pokemon.types} />
          <AbilityContainer abilities={pokemon.abilities} />
        </div>
      </div>
    </>
  );
}
