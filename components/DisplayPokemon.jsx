import Image from 'next/image';
import Link from 'next/link';

import TypeContainer from '../components/PokemonInformation/types/TypeContainer';

export default function DisplayPokemon({ displayPokemon }) {
  return (
    <>
      <div className="grid grid-cols-3">
        {displayPokemon.map((pokemon) => {
          return (
            <div key={pokemon.name} className="card m-3 bg-base-100 shadow-xl">
              <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                <div>
                  <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    className="cursor-pointer"
                    alt="Pokemon"
                    width="250"
                    height="250"
                    layout="responsive"
                  />
                </div>
              </Link>
              <div className="card-body p-1">
                <h2 className="card-title capitalize">
                  <div>#{pokemon.id}</div>
                  <div>{pokemon.name.split('-').join(' ')}</div>
                </h2>
                <TypeContainer types={pokemon.types} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
